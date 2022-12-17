const express = require("express");
const router = express.Router();
const bookController = require('../controllers/book');

router.get('/', bookController.getAllBooks);
router.get('/sort', bookController.sortBooks);
router.post('/create', bookController.createBook);
router.put('/edit', bookController.editBook);
router.post('/delete/:_id', bookController.deleteBook);

module.exports = router;