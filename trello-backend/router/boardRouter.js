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
      query["_id"] = new ObjectId(id);
    }
    boards = await db.boards.find({}).toArray();
    res.status(200).json(boards);
  } catch (error) {
    res.status(500);
    res.json("some thing went wrong " + error);
  }
});

boardRouter.post("/", async (req, res) => {
  try {
    const board = { boardName: req.body.boardName, order: req.body.order };
    const result = await db.boards.insertOne(board);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(" Board creation failed!");
  }
});

boardRouter.put("/", async (req, res) => {
  try {
    const id = req.headers.id;

    const {boardName, order} = req.body;

    const filter = {
      _id: new ObjectId(id),
    };
    const updateDoc = {
      $set: {boardName, order},
    };

    // if(boardName === '')req.body.boardName = 'Untitled'
    const board = await db.boards.updateOne(filter, updateDoc);
    res.status(200).json(board);
  } catch (error) {
    res.status(500).json("Some thing went wrong!" + error);
  }
});

boardRouter.delete('/:id',async (req,res)=>{
    try {
        const id = req.params.id;
        let respond
        if(id){
            respond = await db.boards.deleteOne({_id: new ObjectId(id)})
            console.log("respond", respond);
            if(respond.acknowledged) {
                res.json(`Successfully delete ${respond.deletedCount}`)
                return
            } else {
                res.json(respond)
                return
            }
        } else {
        return  res.status(400).json(" Id is missing!")
        }
    } catch (error) {
    res.status(500).json("Some thing went wrong " + error)
    }
})

module.exports = boardRouter;
