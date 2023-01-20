require("dotenv").config();
const express =require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./apiRouter');
const app = express();
const PORT= process.env.PORT;
    
app.use(bodyParser.json());
app.use('/api',apiRouter);

app.listen(PORT, ()=>{
    console.log(`server is listening  on ${PORT}`);
});
    
module.exports = app;
  