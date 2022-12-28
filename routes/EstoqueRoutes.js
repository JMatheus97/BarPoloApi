const router = require('express').Router();
const EstoqueController = require('../controllers/EstoqueController');

router.post('/new', EstoqueController.create);

module.exports = router;