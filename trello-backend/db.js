const { MongoClient } = require("mongodb");

const url =
    "mongodb+srv://Trello_backend:trello0102@cluster0.fjlwaxl.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);
const dbName = "trello_management";
const db = {};

async function connectToDb() {
    await client.connect();
    console.log("Connected successfully to Database");
    const database = client.db(dbName);

    db.boards = database.collection("Boards");
    db.todos = database.collection("Todos");

    return "done.";
}

module.exports = { connectToDb, db }

