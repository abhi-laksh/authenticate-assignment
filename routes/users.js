const controller = require('../controllers/users');
const router = require('express').Router();

// /users
router.get('/', controller.getUsers); // /users
router.get('/:userId', controller.getUser); // /users/:userId
router.post('/', controller.createUser); // /users

module.exports = router;