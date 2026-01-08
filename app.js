const express = require('express');
const mongoose = require('./config/database');
const router = require('./src/routes/mainRouter');

require('dotenv').config();;
const port =process.env.PORT;
console.log(port);

const app = express();
app.use(express.json());

app.listen(port,(err)=>{
    if(err)
        console.log(err);
    else
        console.log(`Server is running on this port ${port}`)
});
app.use(process.env.ENDPOINT_SUFFIX,router);

