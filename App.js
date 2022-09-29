
const bodyParser = require("body-parser");
const express = require ("express");
const app = express();
const mongoose =require ("mongoose");
const usersRoute = require ('./routes/users');
require('dotenv/config');
app.use(bodyParser.json());
app.use('/users', usersRoute);

// routes
app.get('/', async(req,res) => {
    res.send('we are on home');
});


// Connect to db
mongoose.connect(process.env.DB_CONNECTION, () =>console.log('connected to db!'));

// listenp
app.listen(3001);

