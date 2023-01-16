const router = require('express').Router();
const ProdutoController = require('../controllers/ProdutoController');

router.get('', ProdutoController.find);
router.post('/new', ProdutoController.create);
router.post('/:id', ProdutoController.edit);
router.delete('/:id', ProdutoController.delete);


module.exports = router;