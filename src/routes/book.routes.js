const express = require('express');
const router = express.Router();
const BookController = require('../controllers/book.controller');

router.post('/', BookController.create);
router.get('/', BookController.list);
router.delete('/:id', BookController.delete);

module.exports = router;
