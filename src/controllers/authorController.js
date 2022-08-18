
const { count } = require("console")
const authorModel = require("../models/authorModel")
const newBookModel = require("../models/newBookModel")



// create authorInfo
const createAuthorInfo = async function (req, res) {
    const data = req.body
    const savedData = await authorModel.create(data);
    res.send(savedData)
    
}

// get author id of "Chetan Bhagat"
const getAuthorId = async function (req, res) {
    const getId = await authorModel.find({ author_name: "Chetan Bhagat" }).select({ author_id: 1, _id: 0 })
    const bookList = await newBookModel.find(getId[0]).select({ name: 1, _id: 0 })
    res.send(bookList);

}

// •	find the author of “Two states” and update the book price to 100;  Send back the author_name and updated price in response.  ( This will also need 2  queries- 1st will be a findOneAndUpdate. The second will be a find query aith author_id from previous query)
const getAuthorName_updatePrice = async function (req, res) {
    const updatePrice = await newBookModel.findOneAndUpdate({ name: "Two states" }, { price: 100 }, { new: true })
    const authorId = updatePrice.author_id
    let authorName = await authorModel.find({ author_id: authorId }).select({ _id: 0, author_name: 1 })
    authorName = authorName[0].author_name
    res.send({ price: updatePrice.price, author_Name: authorName });
}


// •	Find the books which costs between 50-100(50,100 inclusive) and respond back with the author names of respective books.. 
const getRangePrice_author = async function (req, res) {
    const book = await newBookModel.find({ price: { $gt: 49, $lt: 101 } }).select({ price: 1,name:1, author_id: 1, _id: 0 })
    const a=book.map(x=>x.author_id)
    const author=await authorModel.find({author_id:a}).select({author_name:1,author_id:1,_id:0})
    const myData=[]
    console.log(book)
    console.log(author)
    book.forEach(element => {
        author.forEach(element2 => {
            if(element.author_id==element2.author_id){
                data={bookName:element.name,authorName:element2.author_name}
                myData.push(data)
            }
        });
    });
    res.send(myData)
}
module.exports.createAuthorInfo = createAuthorInfo
module.exports.getAuthorId = getAuthorId
module.exports.getAuthorName_updatePrice = getAuthorName_updatePrice
module.exports.getRangePrice_author = getRangePrice_author
