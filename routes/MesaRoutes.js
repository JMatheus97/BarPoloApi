const router = require('express').Router();
const MesaController = require('../controllers/MesaController');

router.post('/new', MesaController.create);

module.exports  = router;