const express = require("express");
const { ObjectId } = require("mongodb");
const cardRouter = express.Router();
const { db } = require("../db");

cardRouter.get("/", async (req, res) => {
  try {
    let cards;
    const cardName = req.headers;
    if (cardName) {
      cards = await db.cards.find({ cardName: cardName }).toArray();
    }
    cards = await db.cards.find().toArray();
    res.status(200).json(cards);
  } catch (error) {
    res.status(500);
    res.json("some thing went wrong " + error);
  }
});

cardRouter.post("/", async (req, res) => {
  try {
    const { cardName, columnId, cover, boardId } = req.body;
    const card = {
      cardName,
      cover,
      columnId: new ObjectId(columnId),
      boardId: new ObjectId(boardId),
    };

    const result = await db.cards.insertOne(card);

    const ColumnId = card.columnId;
    const newCardId = result.insertedId;

    const updateColumn = await db.columns.findOneAndUpdate(
      { _id: ColumnId },
      { $push: { cardOrder: newCardId } },
      { returnOriginal: false }
    );

    console.log("updateColumnCard", updateColumn.value);
    res.status(200).json({
      _id: card._id,
      cardName: card.cardName,
      columnId: card.columnId,
      cover: card.cover,
      boardId: card.boardId,
    });
  } catch (error) {
    res.status(500);
    res.json("some thing went wrong " + error);
  }
});

cardRouter.put("/", async (req, res) => {
  try {
    const id = req.headers.id;
    const { cardName, columnId, boardId, cover } = req.body;
    const card = {
      cardName,
      cover,
      columnId: new ObjectId(columnId),
      boardId: new ObjectId(boardId),
    };

    const filter = {
      _id: new ObjectId(id),
    };
    const updateDoc = {
      $set: card,
    };

    const result = await db.columns.updateOne(filter, updateDoc);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json("Some thing went wrong!" + error);
  }
});

// const deleteMany = async (req, res) => {
//   try {
//     const ids = ids.req.body;
//     const transformIds = ids.map((id) => ObjectId(id));
//     const result = await db.cards.updateMany(
//       { _id: { $in: transformIds } },
//       { $set: { _destroy: "true" } }
//     );
//     res.status(200);
//     res.json("Successfully deletted " + result);
//   } catch (error) {
//     res.status(500);
//     res.json("some thing went wrong " + error);
//   }
// };

cardRouter.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let respond;
    if (id) {
      respond = await db.cards.deleteOne({ _id: ObjectId(id) });
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
module.exports = cardRouter;
