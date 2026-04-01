const express = require('express');
const router = express.Router();
const BookController = require('../controllers/book.controller');

router.post('/', BookController.create);
router.get('/', BookController.list);
router.get('/:id', BookController.getById);
router.put('/:id', BookController.update);
router.delete('/:id', BookController.delete);

module.exports = router;
