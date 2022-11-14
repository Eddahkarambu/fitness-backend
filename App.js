
const bodyParser = require("body-parser");
const express = require ("express");
const app = express();
const mongoose =require ("mongoose");
const usersRoute = require ('./routes/users');
require('dotenv/config');
app.use(bodyParser.json());



var cors = require('cors');
app.use(cors({origin:true,credentials: true}));


app.options('*', cors()); 

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


app.use('/users', usersRoute);
// routes
app.get('/', async(req,res) => {
    res.send('we are on home');
});


// Connect to db
mongoose.connect(process.env.DB_CONNECTION, () =>console.log('connected to db!'));

// listenp
app.listen(3001);

