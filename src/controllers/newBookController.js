const newAuthor = require("../models/newAuthor")
const newBook = require("../models/newBook")
const bookModel = require("../models/newBook")
const newPublisher = require("../models/newPublisher")

// create new book on the database
let newCreateBook = async function (req, res) {
    let book = req.body
    let authorId = book.author_id
    let publisherId = book.publisher
    const arrId = await newAuthor.findById(authorId)
    if(!arrId){return res.send("author id is not valid")}

    const arrPublisher = await newPublisher.findById(publisherId)
    if(!arrPublisher){return res.send("publisher id is not valid")}

    console.log(arrId)
    console.log(arrPublisher)

    let bookCreated = await bookModel.create(book)
    res.send(bookCreated)
}

// get all the book from the database with publisher info and author
const getAllBook = async function (req, res) {
    const allBook = await bookModel.find().populate(['author_id', 'publisher'])
    res.send(allBook)
}
// update the value true of isHardCover 
const updateValue = async function (req, res) {
    // getting id from newPublisher databse 
    const data = await newPublisher.find({"name":["Penguin","HarperCollins"]}).select({_id:1})
    const update=await bookModel.updateMany({publisher:data},{isHardCover:true},{new:true})
    res.send(update);
}
// increse the price of book by 10 in range of condtion
const updatePrice = async function (req, res) {
    const data = await newAuthor.find({rating:{$gt:3.5}}).select({_id:1})
    const update=await bookModel.updateMany({author_id:data},{$inc:{price:+10}},{new:true})
    res.send(update);
}

module.exports.newCreateBook = newCreateBook
module.exports.getAllBook = getAllBook
module.exports.updateValue = updateValue
module.exports.updatePrice = updatePrice


