
const bodyParser = require("body-parser");
const express = require ("express");
const app = express();
const mongoose =require ("mongoose");
require('dotenv/config');

app.use(bodyParser.json());

// import routes
const usersRoute = require ('./routes/users');
app.use('/users', usersRoute);

// routes
app.get('/', (req,res) => {
    res.send('we are on home');
});

// listen

// Connect to db
mongoose.connect(process.env.DB_CONNECTION, () =>console.log('connected to db!'));

app.listen(3001);

