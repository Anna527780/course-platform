const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const { authenticateToken, isAdmin } = require("../middleware/auth");

// Все маршруты требуют аутентификации
router.get("/", authenticateToken, courseController.getAllCourses);
router.get("/:id", authenticateToken, courseController.getCourseById);
router.post("/", authenticateToken, courseController.createCourse);
router.put("/:id", authenticateToken, courseController.updateCourse);

// Удаление — только для администратора
router.delete(
  "/:id",
  authenticateToken,
  isAdmin,
  courseController.deleteCourse,
);

router.patch(
  "/:id/progress",
  authenticateToken,
  courseController.updateProgress,
);

module.exports = router;
