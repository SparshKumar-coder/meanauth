


// Including all the Modules

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { UserHandler } = require(path.resolve(__dirname, 'UserHandler', 'UserHandler'));
const mongoose = require ('mongoose');
const { DashboardRouter } = require (path.resolve(__dirname, 'Dashboard', 'dashboard'));
const { Middleware } = require (path.resolve(__dirname, 'Middleware', 'Middleware'));
const { LogoutRouter } = require (path.resolve(__dirname, 'Logout', 'Logout'));

// Including the Config File
const Config = require(path.resolve(__dirname, 'Config', 'Config'));


// Setting Up Mongoose Connections
mongoose.connect (`mongodb://localhost:27017/${Config.DBname}`);

// Setting up Mongoose for using Promises instead of Callbacks
mongoose.Promise = global.Promise;


// Making the Instance of Express and Configure BodyParser

const app = express();
app.use(bodyParser.json());
app.use(cors());



// Making an API path

app.use('/user', UserHandler);


// Making an Dashboard Route

app.use ('/dashboard', Middleware, DashboardRouter);


// Making the /logout route

app.use ('/logout', Middleware, LogoutRouter);



// Making the server listen on Config PORT

app.listen(Config.PORT, () => {

    console.log(`http://localhost:${Config.PORT}`);

})