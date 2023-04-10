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
    console.log("result newCard", result);

    const ColumnId = card.columnId;
    const newCardId = result.insertedId.toString();

    const updateColumn = await db.columns.findOneAndUpdate(
      { _id: ColumnId },
      { $push: { cardOrder: newCardId } },
      { returnOriginal: false }
    );

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

cardRouter.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log("id", id);
    const { cardName, columnId, boardId, cover, _destroy } = req.body;
    const card = {
      cardName,
      cover,
      columnId: new ObjectId(columnId),
      boardId: new ObjectId(boardId),
      _destroy,
    };
    console.log("req.body-card", req.body);
    console.log("card", card);
    const filter = {
      _id: new ObjectId(id),
    };
    const updateDoc = {
      $set: { ...card },
    };

    const result = await db.cards.findOneAndUpdate(filter, updateDoc);
    const findCard = await db.cards
      .find({
        _id: new ObjectId(id),
      })
      .toArray();
    console.log("resultCardValue", findCard[0]);
    res.status(200).json(findCard[0]);
  } catch (error) {
    res.status(500).json("Some thing went wrong!" + error);
  }
});

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
