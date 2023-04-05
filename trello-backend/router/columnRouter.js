const express = require("express");
const { ObjectId } = require("mongodb");
const columnRouter = express.Router();
const { db } = require("../db");
const { deleteMany } = require("./cardRouter");

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
    const { columnName, boardId, cards, cardOrder } = req.body;

    const column = {
      columnName,
      boardId: new ObjectId(boardId),
      cards,
      cardOrder,
    };
    if (!ObjectId.isValid(boardId)) {
      return res.status(400).json("Invalid board ID");
    }

    const result = await db.columns.insertOne(column);
    console.log("result", {
      _id: column._id,
      columnName: column.columnName,
      boardId: column.boardId,
      cards: column.cards,
      cardOrder: column.cardOrder,
    });

    const newBoardId = column.boardId;
    const newColumnId = result.insertedId.toString();

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

columnRouter.put("/:id", async (req, res) => {
  try {
    const { columnName, cardOrder, boardId, _destroy, cards } = req.body;
    const column = {
      columnName,
      cardOrder,
      boardId: new ObjectId(boardId),
      _destroy,
      cards,
    };
    // if (_destroy !== undefined) {
    //   column._destroy = _destroy;
    // }

    // if (column._id) delete column._id;
    // if (column.cards) delete column.cards;
    console.log("req.body-column", req.body);

    // console.log("column-update", column);
    const updatedColumn = await db.columns.findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: { ...column } },
      { returnOriginal: false }
    );
    console.log("updatedColumn", updatedColumn.value);

    const findColumn = await db.columns
      .find({
        _id: new ObjectId(req.params.id),
      })
      .toArray();
    const deleteMany = async (ids) => {
      console.log("ids", ids);
      const transformIds = ids.map((id) => {
        // if (id === null) {
        //   const idNull = findColumn.cardOrder.filter((id) => id === null);
        //   console.log("idNull", idNull);
        //   delete idNull;
        // }
        console.log("new  Id", new ObjectId(id));
        return new ObjectId(id);
      });
      const result = await db.cards.updateMany(
        { _id: { $in: transformIds } },
        { $set: { _destroy: true } }
      );
      return result;
    };
    if (findColumn[0]._destroy) {
      deleteMany(findColumn[0].cardOrder);
    }
    console.log("findColumn", findColumn[0]);

    return res.status(200).json(findColumn[0]);
  } catch (error) {
    res.status(500);
    res.json("Something went wrong " + error);
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
