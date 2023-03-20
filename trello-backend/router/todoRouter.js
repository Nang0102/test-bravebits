const express = require('express')
const todoRouter = express.Router()
const {db} = require('../db')

todoRouter.get('/',async (req,res)=>{
    try {
        let todos
    const name = req.headers
    if(name){
        todos = await db.todos.find({name: name}).toArray()
    }   
    todos = await db.todos.find().toArray()
    res.status(200).json(todos)
    } catch (error) {
        res.status(500);
        res.json("some thing went wrong " + error);
    }
})

module.exports= todoRouter
