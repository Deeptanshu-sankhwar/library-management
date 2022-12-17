const { Book } = require('../models/book');
const { validateToken } = require('../utils/token');

async function getAllBooks(req, res) {

    const books = await Book.find().exec();

    return res.status(200).json({
        success: true,
        data: books,
        message: "Fetch all books"
    });
}

async function sortBooks(req, res) {
    let books = await Book.find().sort({ price: 1 }).exec();

    return res.status(200).json({
        success: true,
        data: books,
        message: "Fetch all sorted books"
    });
}

async function createBook(req, res) {
    
    const { token, name, price, author, isbn, published_date, rating } = req.body;

    if (await validateToken(token)) {
        let book = new Book({
            name,
            price,
            author,
            isbn,
            published_date,
            rating
        })
    
        book = await book.save();
    
        return res.status(200).json({
            success: true,
            data: book,
            message: "Book created successfully"
        });   
    } else {
        return res.status(400).json({
            success: false,
            message: "Invalid token. Login."
        });
    }
}

async function editBook(req, res) {
    
    const { token, _id, price } = req.body;

    if (await validateToken(token)) {
        let book = await Book.findOneAndUpdate({
            _id: _id
        }, {
            price: price
        });
          
        return res.status(200).json({
            success: true,
            data: {
                _id: book._id,
                name: book.name,
                price: price,
                author: book.author,
                isbn: book.isbn,
                published_date: book.published_date,
                rating: book.rating
            },
            message: "Book price updated successfully"
        });
    } else {
        return res.status(400).json({
            success: false,
            message: "Invalid token. Login."
        });
    }
}

async function deleteBook(req, res) {

    const { _id } = req.params;
    const { token } = req.body;

    if (await validateToken(token)) {
        let book = await Book.deleteOne({ _id: _id });

        return res.status(200).json({
            success: true,
            data: book,
            message: "Book deleted successfully"
        })
    } else {
        return res.status(400).json({
            success: false,
            message: "Invalid token. Login."
        });
    }
}

module.exports = {
    getAllBooks,
    sortBooks,
    createBook,
    editBook,
    deleteBook
}