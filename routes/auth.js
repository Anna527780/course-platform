const { authenticateToken } = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// POST /api/auth/register - регистрация
router.post("/register", authController.register);

// POST /api/auth/login - вход
router.post("/login", authController.login);

// GET /api/auth/profile - защищённый маршрут
router.get("/profile", authenticateToken, authController.getProfile);

module.exports = router;
