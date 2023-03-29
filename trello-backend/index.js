const express = require('express'); 
const app = express(); 
const cors = require('cors')
const { connectToDb, db } = require("./db");
const boardRouter = require('./router/boardRouter');
const columnRouter = require('./router/columnRouter');
const cardRouter = require('./router/cardRouter');

const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");

app.use(cors())

app.use(bodyParser.json());

app.get('/', (req,res)=>{
    res.send('hello!')
})
app.use('/board',boardRouter )
app.use('/column', columnRouter)
app.use('/card',cardRouter )

app.listen(port, () => {
    console.log(`server is start at http://localhost:${port}`);
    connectToDb()
})