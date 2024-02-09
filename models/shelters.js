const mongoose=require("mongoose");
const {models} = require("mongoose");
const Schema=mongoose.Schema


const  sheltersSchema=new Schema({
    location:{ type: String },
    title:{ type: String },
    capacity:{ type: Number }
});

const shelter=mongoose.model("shelter",sheltersSchema);
module.exports=shelter;