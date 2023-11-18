const mongoController = require('../controllers/mongo.controller');
const router = require('express').Router();


// router.get('/api/providers', providerController.getProvider)
router.post('/createMovie', mongoController.createMovie);
// router.delete('/api/providers', providerController.deleteProvider)
// router.put('/api/providers',providerController.editProvider)


module.exports = router;