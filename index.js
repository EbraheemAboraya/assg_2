require('dotenv').config();
const mongoose=require("mongoose");
const express = require("express");
const app = express();
const {connectDB}=require("./dbmongoo/conncetdb");
const port =process.env.PORT || 8080;
const routerShelter=require("./routers/shelters_router");
const logger=require("./logger/errorLogger");

module.exports=app;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.path}`);
    next();
});
app.use('/shelters',routerShelter);

connectDB();
app.listen(port,()=>console.log(`server listening on port ${port}!`));









