const express = require('express'); 
const app = express(); 
const { connectToDb, db } = require("./db");
const boardRouter = require('./router/boardRouter');
const todoRouter = require('./router/todoRouter');
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");


app.use(bodyParser.json());

app.get('/', (req,res)=>{
    res.send('hello!')
})
app.use('/board',boardRouter )
app.use('/todo',todoRouter )

app.listen(port, () => {
    console.log(`server is start at http://localhost:${port}/`);
    connectToDb()
})