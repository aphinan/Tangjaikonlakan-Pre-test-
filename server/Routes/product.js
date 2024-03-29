const express = require("express");
const router = express.Router();

const {
  read,
  list,
  create,
  update,
  remove
} = require('../Controllers/product')

//localhost:5000/api/product
router.get('/product/list', list)
router.get('/product/:id', read)
router.post('/product', create)
router.put('/product/', update)
router.put('/product/:id', remove)


module.exports = router;