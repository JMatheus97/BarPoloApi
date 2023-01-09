const router = require('express').Router();
const MesaController = require('../controllers/MesaController');

router.get('', MesaController.find);
router.post('/new', MesaController.create);
router.post('/:id',  MesaController.edit);

module.exports  = router;