const controller = require('../controllers/bus');
const router = require('express').Router();

// /bus
router.get('/', controller.getAllBuses); // /bus
router.post('/', controller.createBus); // /bus

module.exports = router;