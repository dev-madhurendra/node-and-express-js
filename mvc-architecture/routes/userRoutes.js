const express = require('express');
const userController = require('../controllers/userController');
const { USERS_ROUTE } = require('../utils/AppConstants');


const router = express.Router();

// Routes
router.post(`${USERS_ROUTE}`, userController.createUser);
router.get(`${USERS_ROUTE}`, userController.getAllUsers);
router.get(`${USERS_ROUTE}/:id`, userController.getUserById);
router.patch(`${USERS_ROUTE}/:id`, userController.updateUser);
router.delete(`${USERS_ROUTE}/:id`, userController.deleteUser);

module.exports = router;
