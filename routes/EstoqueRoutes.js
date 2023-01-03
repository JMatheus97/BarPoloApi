const router = require('express').Router();
const EstoqueController = require('../controllers/EstoqueController');

router.get('', EstoqueController.find);
router.post('/new', EstoqueController.create);

module.exports = router;