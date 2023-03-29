const express = require("express");
const { ObjectId } = require("mongodb");
const columnRouter = express.Router();
const { db } = require("../db");

columnRouter.get("/", async (req, res) => {
  try {
    let columns;
    const {
      boardId: boardId,
      columnName: columnName,
      cardOrder: cardOrder,
      id,
    } = req.headers;
    const query = {};

    if (boardId) {
      query["boardId"] = ObjectId(boardId);
    }
    if (columnName) {
      query["columnName"] = columnName;
    }
    if (cardOrder) {
      query["cardOrder"] = cardOrder;
    }
    if (id) {
      query["_id"] = ObjectId(id);
    }
    columns = await db.columns.find({}).toArray();
    res.status(200).json(columns);
  } catch (error) {
    res.status(500);
    res.json("some thing went wrong " + error);
  }
});

columnRouter.post("/", async (req, res) => {
  try {
    const { columnName, boardId } = req.body;

    const column = {
      columnName,
      boardId: new ObjectId(boardId),
    };
    if (!ObjectId.isValid(boardId)) {
      return res.status(400).json("Invalid board ID");
    }

    const result = await db.columns.insertOne(column);

    const newBoardId = column.boardId;
    const newColumnId = result.insertedId;

    const updateBoard = await db.boards.findOneAndUpdate(
      { _id: newBoardId },
      { $push: { columnOrder: newColumnId } },
      { returnOriginal: false }
    );

    res.status(200).json({
      _id: column._id,
      columnName: column.columnName,
      boardId: column.boardId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Column creation failed!");
  }
});

columnRouter.put("/", async (req, res) => {
  try {
    const id = req.headers.id;
    const { columnName, cardOrder, boardId } = req.body;
    const column = { columnName, cardOrder, boardId: ObjectId(boardId) };

    const filter = {
      _id: ObjectId(id),
    };
    const updateDoc = {
      $set: column,
    };

    const result = await db.columns.updateOne(filter, updateDoc);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json("Some thing went wrong!" + error);
  }
});

columnRouter.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let respond;
    if (id) {
      respond = await db.columns.deleteOne({ _id: ObjectId(id) });
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

module.exports = columnRouter;
