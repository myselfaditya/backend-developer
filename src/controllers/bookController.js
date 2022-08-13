const bookModel=require("../models/bookModel")

const bookController=async function(req,res){
    let  data=req.body
    let savedData=await bookModel.create(data)
    res.send({msg:savedData})

}
const getBook=async function(req,res){
    let getData=await bookModel.find()
    const bookArr=[]
    for(let i=0;i<getData.length;i++){
        bookArr.push(getData[i].bookName);
    }
    res.send({msg:bookArr})
}
module.exports.createBook=bookController;
module.exports.getBook=getBook;