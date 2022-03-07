const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

const port = 5090

const url ="mongodb+srv://user:1234@cluster0.fyqaj.mongodb.net/kiosk_db?retryWrites=true&w=majority"

mongoose.connect(url)
.then(results =>{
    console.log(results);
    app.listen(port,function(){
        console.log(`server is running via port:${port}`);
    })
})
.catch(err =>{
    console.log(err);
})