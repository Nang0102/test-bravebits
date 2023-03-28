const { MongoClient } = require("mongodb");

const url =
    "mongodb+srv://Trello_backend:trello0102@cluster0.fjlwaxl.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url);
const dbName = "Trello_Management";
const db = {};

async function connectToDb() {
    await client.connect();
    console.log("Connected successfully to Database");
    const database = client.db(dbName);

    db.boards = database.collection("boards");
    db.columns = database.collection("columns");
    db.cards = database.collection("cards");

    return "done.";
}

module.exports = { connectToDb, db }

