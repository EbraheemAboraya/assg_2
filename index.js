require('dotenv').config();
const mongoose=require("mongoose");
const express = require("express");
const app 	  = express();
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


































// require('dotenv').config();
// const mongoose=require("mongoose");
// const express = require("express");
// const app 	  = express();
// const port =process.env.PORT || 8080;
// mongoose
//     .connect(
//         "mongodb+srv://ibrahemaboraya2002:ebraheems123@cluster1.juz4b4y.mongodb.net/?retryWrites=true&w=majority")
//     .then(()=>{
//         console.log(" connecting mongodb");
//     }).catch((ERROR)=>{
//     console.log("Error connecting mongodb",ERROR);
// })
//
//
// // app.use(express.json());
// // app.use(express.urlencoded({extended: true}));
// // app.use(logger("dev"));
// //
// //
// // app.all('*',(req,res,next)=>{
// //     console.log("checking if user is connected");
// //     next();
// // })
//
// app.listen(port,()=>console.log(`server listening on port ${port}!`));

