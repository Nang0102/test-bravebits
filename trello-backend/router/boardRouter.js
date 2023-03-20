const express = require('express')
const boardRouter = express.Router()
const {db} = require('../db')

boardRouter.get('/',async (req,res)=>{
    try {
        let boards
    const {name,order } = req.headers
    if(name){
        boards = await db.boards.find({name: name}).toArray()
    }    if(order){
        boards = await db.boards.find({order: order}).toArray()
    }
    boards = await db.boards.find().toArray()
    res.status(200).json(boards)
    } catch (error) {
        res.status(500);
        res.json("some thing went wrong " + error);
    }
})

boardRouter.post('/', async (req,res)=>{
    const board =({name:req.body.name,
        order:req.body.order}) 
   try {
    const result = await db.boards.insertOne(board)
    res.status(200).json(result)
   } catch (error) {
    res.status(500).json(" Board creation failed!")
   }
})

module.exports= boardRouter
