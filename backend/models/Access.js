const mongoose = require("mongoose");

const accessRequestSchema = new mongoose.Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    course:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Course"
    },

    status:{
        type:String,
        enum:["pending","approved","rejected"],
        default:"pending"
    }

});

module.exports = mongoose.model("Access", accessSchema);