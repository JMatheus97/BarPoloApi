const router  =  require('express').Router();
const ComandaController = require('../controllers/ComandaController');

router.get('', ComandaController.find);
router.post('/new', ComandaController.create);

module.exports = router;