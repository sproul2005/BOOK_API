const BookService = require('../services/book.service');

class BookController {

    // POST /books
    async create(req, res) {
        try {
            const book = await BookService.createBook(req.body);
            res.status(201).json(book);
        } catch (error) {
            if (error.name === 'ValidationError') {
                return res.status(400).json({ error: error.message });
            }
            res.status(500).json({ error: 'Server Error' });
        }
    }

    // DELETE /books/:id
    async delete(req, res) {
        try {
            const book = await BookService.deleteBook(req.params.id);
            if (!book) {
                return res.status(404).json({ error: 'Book not found' });
            }
            res.status(200).json({ message: 'Book deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server Error' });
        }
    }

    // GET /books
    async list(req, res) {
        try {
            const result = await BookService.getBooks(req.query);
            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server Error' });
        }
    }
}

module.exports = new BookController();
