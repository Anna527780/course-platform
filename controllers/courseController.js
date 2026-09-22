const { Course } = require("../models");

// GET /api/courses - получение всех курсов
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();
    res.json(courses);
  } catch (error) {
    res.status(500).json({
      error: "Ошибка при получении курсов",
      message: error.message,
    });
  }
};

// GET /api/courses/:id - получение курса по ID
const getCourseById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const course = await Course.findByPk(id);

    if (!course) {
      return res.status(404).json({
        error: "Курс не найден",
        message: `Курс с ID ${id} не существует`,
      });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({
      error: "Ошибка при получении курса",
      message: error.message,
    });
  }
};

// POST /api/courses - создание нового курса
const createCourse = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        error: "Неверные данные",
        message: "Название и описание курса обязательны",
      });
    }

    const newCourse = await Course.create(req.body);
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({
      error: "Ошибка при создании курса",
      message: error.message,
    });
  }
};

// PUT /api/courses/:id - полное обновление курса
const updateCourse = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const course = await Course.findByPk(id);

    if (!course) {
      return res.status(404).json({
        error: "Курс не найден",
        message: `Курс с ID ${id} не существует`,
      });
    }

    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        error: "Неверные данные",
        message: "Название и описание курса обязательны",
      });
    }

    await Course.update(req.body, { where: { id } });
    const updatedCourse = await Course.findByPk(id);
    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({
      error: "Ошибка при обновлении курса",
      message: error.message,
    });
  }
};

// DELETE /api/courses/:id - удаление курса
const deleteCourse = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const course = await Course.findByPk(id);

    if (!course) {
      return res.status(404).json({
        error: "Курс не найден",
        message: `Курс с ID ${id} не существует`,
      });
    }

    await Course.destroy({ where: { id } });
    res.json({
      message: "Курс успешно удален",
      deletedCourse: course,
    });
  } catch (error) {
    res.status(500).json({
      error: "Ошибка при удалении курса",
      message: error.message,
    });
  }
};

// PATCH /api/courses/:id/progress - обновление прогресса
const updateProgress = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const course = await Course.findByPk(id);

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
    await course.save();
    res.json(course);
  } catch (error) {
    res.status(500).json({
      error: "Ошибка при обновлении прогресса",
      message: error.message,
    });
  }
};

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  updateProgress,
};
