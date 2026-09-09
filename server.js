const express = require("express");
const app = express();

// Middleware для парсинга JSON
app.use(express.json());

// Подключаем маршруты для курсов
const courseRoutes = require("./routes/courses");
app.use("/api/courses", courseRoutes);

// Глобальный обработчик ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Что-то пошло не так!",
    message: err.message,
  });
});

// Запуск сервера
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
