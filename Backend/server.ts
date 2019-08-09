import * as bodyParser from "body-parser";
import express, {} from "express";
import authRoutes from './Routes/Auth/auth.routes';
import apiRoutes from './Routes/Api/api.routes';
import mongoose from "mongoose";
import * as CORS from "cors";
require("./Models/bill.model");
require("./Models/group.model");
require("./Models/response.model");
require("./Models/user.model");
const passport = require('passport');
const jwtStrategy = require('./Middleware/authentication.middleware');

const app = express();
const port = 8090;

//basic app configuration
passport.use(jwtStrategy);
app.use(bodyParser.urlencoded({extended: true}));
app.use(CORS.default());
app.use(bodyParser.json());
app.use(passport.initialize());

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://127.0.0.1:27017/baant-o-fy', { useNewUrlParser: true }).then((db)=>{
    app.use('/auth',authRoutes);
    app.use('/api', passport.authenticate('jwt',{session: false}), apiRoutes);
    app.listen(port);
}).catch((error)=>{
    console.log(error);
});