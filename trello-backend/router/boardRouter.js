const express = require("express");
const { ObjectId } = require("mongodb");
const boardRouter = express.Router();
const { cloneDeep } = require("lodash");
const { db } = require("../db");

boardRouter.get("/", async (req, res) => {
  try {
    let boards;
    // const { name: boardName, order, id } = req.headers;
    // const query = {};

    // if (boardName) {
    //   query["boardName"] = boardName;
    // }
    // if (order) {
    //   query["order"] = order;
    // }
    // if (id) {
    //   query["_id"] = ObjectId(id);
    // }
    boards = await db.boards.find().toArray();
    res.status(200).json(boards);
  } catch (error) {
    res.status(500);
    res.json("some thing went wrong " + error);
  }
});

boardRouter.get("/fullBoard/:id", async (req, res) => {
  const id = req.params.id;

  try {
    let boards = await db.boards
      .aggregate([
        {
          $match: {
            _id: new ObjectId(id),
            _destroy: false,
          },
        },

        {
          $lookup: {
            from: "columns",
            localField: "_id",
            foreignField: "boardId",
            as: "columns",
          },
        },
        {
          $lookup: {
            from: "cards",
            localField: "_id",
            foreignField: "boardId",
            as: "cards",
          },
        },
      ])
      .toArray();

    const board = boards[0];
    if (!board || !board.columns) {
      return "Board not found!!";
    }

    const transformBoard = cloneDeep(board);
    //filter
    transformBoard.columns = transformBoard.columns.filter(
      (column) => !column._destroy
    );
    // Add card to each column
    transformBoard.columns.forEach((column) => {
      column.cards = transformBoard.cards.filter(
        (card) => card.columnId.toString() === column._id.toString()
      );
    });

    // delete cards from boards
    delete transformBoard.cards;

    res.status(200).json(transformBoard);
  } catch (error) {
    res.status(500);
    res.json("some thing went wrong " + error);
  }
});

boardRouter.post("/", async (req, res) => {
  try {
    const board = {
      boardName: req.body.boardName,
      columnOrder: req.body.columnOrder,
    };
    const result = await db.boards.insertOne(board);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(" Board creation failed!");
  }
});

boardRouter.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const updateData = ({ boardName, columnOrder: columnOrder } = req.body);

    if (updateData._id) delete updateData._id;
    // if (updateData.columns) delete updateData.columns;

    const board = await db.boards.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: updateData,
      },
      { returnOriginal: false }
    );
    res.status(200).json(board.value);
  } catch (error) {
    res.status(500).json("Some thing went wrong!" + error);
  }
});

boardRouter.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let respond;
    if (id) {
      respond = await db.boards.deleteOne({ _id: ObjectId(id) });
      console.log("respond", respond);
      if (respond.acknowledged) {
        res.json(`Successfully delete ${respond.deletedCount}`);
        return;
      } else {
        res.json(respond);
        return;
      }
    } else {
      return res.status(400).json(" Id is missing!");
    }
  } catch (error) {
    res.status(500).json("Some thing went wrong " + error);
  }
});

module.exports = boardRouter;
