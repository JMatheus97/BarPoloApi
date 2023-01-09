const router = require('express').Router();
const ProdutoController = require('../controllers/ProdutoController');

router.get('', ProdutoController.find);
router.post('/new', ProdutoController.create);
router.post('/:id', ProdutoController.edit);


module.exports = router;