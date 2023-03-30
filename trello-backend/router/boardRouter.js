const express = require("express");
const { ObjectId } = require("mongodb");
const boardRouter = express.Router();
const { db } = require("../db");

boardRouter.get("/", async (req, res) => {
  try {
    let boards;
    const { name: boardName, order, id } = req.headers;
    const query = {};

    if (boardName) {
      query["boardName"] = boardName;
    }
    if (order) {
      query["order"] = order;
    }
    if (id) {
      query["_id"] = ObjectId(id);
    }
    boards = await db.boards.find({}).toArray();
    res.status(200).json(boards);
  } catch (error) {
    res.status(500);
    res.json("some thing went wrong " + error);
  }
});

boardRouter.get("/fullBoard", async (req, res) => {
  try {
    let boards;
    boards = await db.boards
      .aggregate([
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

    // console.log("board : ", boards);

    // Add card to each column
    boards[0].columns.forEach((column) => {
      column.cards = boards[0].cards.filter((card) => {
        // console.log("test", card);
        // console.log("card-columnId", card.columnId);
        // console.log("columnId", column._id);
        card.columnId.toString() === column._id.toString();
      });
    });

    // delete cards from boards
    delete boards[0].cards;

    console.log("board: ", boards);
    res.status(200).json(boards);
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

boardRouter.put("/", async (req, res) => {
  try {
    const id = req.headers.id;

    const { boardName, columnOrder: columnOrder } = req.body;

    const filter = {
      _id: new ObjectId(id),
    };
    const updateDoc = {
      $set: { boardName, columnOrder: columnOrder },
    };

    // const newBoardId = result.boardId
    // const newColumnId = result._id
    // const updateBoard = await db.boards.findOneAndUpdate(
    //   {
    //   _id:ObjectId(newBoardId)},
    //   {$push: { columnOrder: newColumnId}},
    // { returnOriginal: false }
    // )

    // if(boardName === '')req.body.boardName = 'Untitled'
    const board = await db.boards.updateOne(filter, updateDoc);
    res.status(200).json(board);
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
