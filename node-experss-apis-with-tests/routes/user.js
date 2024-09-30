const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const { protect } = require('../middlewares/auth');
const uploadFile = require('../config/multer');
const { registerValidation, loginValidation } = require('../validations/authValidations');

// Route to create a new user
router.post('/register',registerValidation, userController.registerUser);
router.post('/login',loginValidation, userController.loginUser);
router.get('/profile', protect, (req, res) => {
  res.json(req.user);
});
router.post('/logout', userController.logoutUser)
router.post('/upload-avatar', protect, uploadFile.upload, userController.uploadAvatar);

module.exports = router;
