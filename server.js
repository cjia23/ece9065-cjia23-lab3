'use strict';

const express = require("express");
const app = express();
const bodyParser = require("body-parser"); 
const cors = require("cors");
let contacts = require("./data");

const hostname = 'localhost';
const port = 27017;
const scheme = 'mongodb';
const path = 'bears';

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.get('/api/contacts', (request, response) => {
    response.json(contacts);
});

app.listen(port,hostname,() =>{
    console.log(`Server is running at ${scheme}://${hostname}:${port}/${path}`);
});




