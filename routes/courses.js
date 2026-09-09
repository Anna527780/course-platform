const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

// GET /api/courses - получение всех курсов
router.get("/", courseController.getAllCourses);

// GET /api/courses/:id - получение курса по ID
router.get("/:id", courseController.getCourseById);

// POST /api/courses - добавление нового курса
router.post("/", courseController.createCourse);

// PUT /api/courses/:id - полное обновление курса
router.put("/:id", courseController.updateCourse);

// DELETE /api/courses/:id - удаление курса
router.delete("/:id", courseController.deleteCourse);

// PATCH /api/courses/:id/progress - обновление прогресса
router.patch("/:id/progress", courseController.updateProgress);

module.exports = router;
