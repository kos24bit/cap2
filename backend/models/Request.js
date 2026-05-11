const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({

studentId:{
type:String,
required:true
},

courseId:{
type:String,
required:true
},

status:{
type:String,
enum:["pending","approved","rejected"],
default:"pending"
},

createdAt:{
type:Date,
default:Date.now
}

});

module.exports = mongoose.model("Request",requestSchema);