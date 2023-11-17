const dashboardController = require('../controllers/dashboard.controller');
const router = require('express').Router();

router.get('/',dashboardController);

module.exports = router;