const express = require("express");
const app = express();

app.use(express.json());

const courseRoutes = require("./routes/courses");
app.use("/api/courses", courseRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Что-то пошло не так!",
    message: err.message,
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
