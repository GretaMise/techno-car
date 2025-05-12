const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// naujo naudotojo registracija
router.post('/register', authController.register);
// login'as
router.post('/login', authController.login);
// kreipiames i API ir graziname esamo vartotojo duomenis
router.get('/user', authMiddleware, authController.getCurrentUser);

module.exports = router;
