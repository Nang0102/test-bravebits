const express = require('express')
const todoRouter = express.Router()
const {db} = require('../db')

todoRouter.get('/',async (req,res)=>{
    try {
        let todos
    const todoName = req.headers
    if(todoName){
        todos = await db.todos.find({todoName: todoName}).toArray()
    }   
    todos = await db.todos.find().toArray()
    res.status(200).json(todos)
    } catch (error) {
        res.status(500);
        res.json("some thing went wrong " + error);
    }
})

module.exports= todoRouter
