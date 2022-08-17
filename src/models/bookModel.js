const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true
    },
    authorName: String,
    tags: [String],
    prices: {
        indianPrice: String,
        europePrice: String,
    },
    year: {
        type: Number,
        default: 2021
    },
    sales: { type: Number, default: 10 },
    TotalPages: Number,
    stockAvailable: Boolean,
}, { timestamps: true });


module.exports = mongoose.model('Book', bookSchema) //users

//Validation:
//require:true
//unique
// default

//String
//Number
//Date
//Boolean
// Arrays
// Object
// ObjectId
// Buffer - not cover

