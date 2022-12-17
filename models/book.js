const Joi = require('joi');
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        trim: true
    },
    author: {
        type: String,
        trim: true
    },
    isbn: {
        type: Number,
        trim: true
    },
    published_date: {
        type: Date,
        default: Date.now()
    },
    rating: {
        type: Number,
        default: 0
    }
})

const Book = mongoose.model('Book', bookSchema);

function validateBook(book) {
    const schema = Joi.object({
        name: Joi.string().min(1).required(),
    });

    return schema.validate(book)
}
    
module.exports = {
    bookSchema,
    Book,
    validateBook
}