const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema( {
    author_name:{
            type:String,
            required:true
        },
        author_id:{
            type:Number,
            required:true
        },
        age:Number,
        address:String,
},{ timestamps: true })
module.exports=mongoose.model("mongoAuthorw5d3",authorSchema)
