const router = require('express').Router();
const UsuarioController= require('../controllers/UsuarioController');

router.get('', UsuarioController.find);
router.post("/new", UsuarioController.create);

module.exports = router;
