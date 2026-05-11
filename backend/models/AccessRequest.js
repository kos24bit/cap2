const mongoose = require("mongoose");

const accessSchema = new mongoose.Schema({

studentId:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},

courseId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Course"
},

status:{
type:String,
default:"pending"
}

});

module.exports = mongoose.model("Access",accessSchema);