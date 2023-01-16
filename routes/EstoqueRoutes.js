const router = require('express').Router();
const EstoqueController = require('../controllers/EstoqueController');

router.get('', EstoqueController.find);
router.post('/new', EstoqueController.create);
router.post('/:id', EstoqueController.edit);
router.delete('/:id', EstoqueController.delete);

module.exports = router;