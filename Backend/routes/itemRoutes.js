const express = require('express');
const router = express.Router();
const { createItem, getItems, updateItem, deleteItem } = require('../controllers/itemController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, createItem);
router.get('/', getItems);
router.put('/:id', auth, updateItem);
router.delete('/:id', auth, deleteItem);

module.exports = router;
