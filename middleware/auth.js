const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      error: "Доступ запрещён",
      message: "Токен не предоставлен",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        error: "Доступ запрещён",
        message: "Неверный или истёкший токен",
      });
    }

    req.user = decoded;
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      error: "Доступ запрещён",
      message: "Требуются права администратора",
    });
  }
  next();
};

module.exports = { authenticateToken, isAdmin };
