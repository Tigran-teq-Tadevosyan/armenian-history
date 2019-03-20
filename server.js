'use strict';

//Defining used modules
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

//Loading configuration
const config = require('./utils/loadConfig')();

//Initializing the DB connection
mongoose.connect(config.db.host, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.info("Connected to MongoDB!");
})

//Setting up server options
app.set('tokenSecret', config.JWT_SECRET);
app.set('view engine', 'ejs');

//Installing server middleware
app.use(express.static('www'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//Add routes to app
require('./utils/addRoutes')(app);

server.listen(process.env.PORT || config.port, () => { console.info(`ArmGov has started on ${process.env.PORT || config.port} port.`); });
