const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// POST /api/auth/register - регистрация
const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Неверные данные",
        message: "Email и пароль обязательны",
      });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({
        error: "Конфликт",
        message: "Пользователь с таким email уже существует",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      passwordHash,
    });

    res.status(201).json({
      message: "Пользователь успешно зарегистрирован",
      user: {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: "Ошибка при регистрации",
      message: error.message,
    });
  }
};

// POST /api/auth/login - вход
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Неверные данные",
        message: "Email и пароль обязательны",
      });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        error: "Ошибка входа",
        message: "Неверный email или пароль",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);

    if (!isValidPassword) {
      return res.status(401).json({
        error: "Ошибка входа",
        message: "Неверный email или пароль",
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" },
    );

    res.json({
      message: "Вход выполнен успешно",
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: "Ошибка при входе",
      message: error.message,
    });
  }
};

// GET /api/auth/profile - данные текущего пользователя
const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "email", "role", "createdAt"],
    });

    if (!user) {
      return res.status(404).json({
        error: "Пользователь не найден",
        message: "Пользователь с таким ID не существует",
      });
    }

    res.json({
      message: "Данные текущего пользователя",
      user,
    });
  } catch (error) {
    res.status(500).json({
      error: "Ошибка при получении профиля",
      message: error.message,
    });
  }
};

module.exports = { register, login, getProfile };
