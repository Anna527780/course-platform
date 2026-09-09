const { courses } = require("../models/courses");

// Объявляем nextId прямо здесь
let nextId = 4;

// GET /api/courses - получение всех курсов
const getAllCourses = (req, res) => {
  res.json(courses);
};

// GET /api/courses/:id - получение курса по ID
const getCourseById = (req, res) => {
  const id = parseInt(req.params.id);
  const course = courses.find((c) => c.id === id);

  if (!course) {
    return res.status(404).json({
      error: "Курс не найден",
      message: `Курс с ID ${id} не существует`,
    });
  }

  res.json(course);
};

// POST /api/courses - добавление нового курса
const createCourse = (req, res) => {
  const { title, description, duration, level, price, lessons } = req.body;

  // Валидация обязательных полей
  if (!title || !description) {
    return res.status(400).json({
      error: "Неверные данные",
      message: "Название и описание курса обязательны",
    });
  }

  const newCourse = {
    id: nextId,
    title,
    description,
    duration: duration || "Не указано",
    level: level || "Начальный",
    price: price || 0,
    lessons: lessons || 0,
    progress: 0,
  };

  // Увеличиваем nextId
  nextId = nextId + 1;

  courses.push(newCourse);
  res.status(201).json(newCourse);
};

// PUT /api/courses/:id - полное обновление курса
const updateCourse = (req, res) => {
  const id = parseInt(req.params.id);
  const courseIndex = courses.findIndex((c) => c.id === id);

  if (courseIndex === -1) {
    return res.status(404).json({
      error: "Курс не найден",
      message: `Курс с ID ${id} не существует`,
    });
  }

  const { title, description, duration, level, price, lessons, progress } =
    req.body;

  // Валидация обязательных полей
  if (!title || !description) {
    return res.status(400).json({
      error: "Неверные данные",
      message: "Название и описание курса обязательны",
    });
  }

  // Обновляем курс
  courses[courseIndex] = {
    id,
    title,
    description,
    duration: duration || "Не указано",
    level: level || "Начальный",
    price: price || 0,
    lessons: lessons || 0,
    progress: progress || 0,
  };

  res.json(courses[courseIndex]);
};

// DELETE /api/courses/:id - удаление курса
const deleteCourse = (req, res) => {
  const id = parseInt(req.params.id);
  const courseIndex = courses.findIndex((c) => c.id === id);

  if (courseIndex === -1) {
    return res.status(404).json({
      error: "Курс не найден",
      message: `Курс с ID ${id} не существует`,
    });
  }

  const deletedCourse = courses.splice(courseIndex, 1);
  res.json({
    message: "Курс успешно удален",
    deletedCourse: deletedCourse[0],
  });
};

// PATCH /api/courses/:id/progress - обновление прогресса
const updateProgress = (req, res) => {
  const id = parseInt(req.params.id);
  const course = courses.find((c) => c.id === id);

  if (!course) {
    return res.status(404).json({
      error: "Курс не найден",
      message: `Курс с ID ${id} не существует`,
    });
  }

  const { progress } = req.body;

  if (progress === undefined || progress < 0 || progress > 100) {
    return res.status(400).json({
      error: "Неверные данные",
      message: "Прогресс должен быть числом от 0 до 100",
    });
  }

  course.progress = progress;
  res.json(course);
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  updateProgress,
};
