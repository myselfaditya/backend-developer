const mongoose=require("mongoose");

const bookSchema=new mongoose.Schema({
bookName:{
    type:String,
    unique:true,
    require:true
},
authoreName:String,
category:{
    type:String,
    enum:["novel","education","Story","Motivational"]
},
year:Number
}, { timestamps: true }
)

module.exports=mongoose.model("book",bookSchema);
