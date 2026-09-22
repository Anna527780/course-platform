"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Courses",
      [
        {
          title: "Основы JavaScript",
          description: "Изучите основы программирования на JavaScript",
          duration: "6 недель",
          level: "Начальный",
          price: 0,
          lessons: 12,
          progress: 0,
          isPublished: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Продвинутый Node.js",
          description: "Создание масштабируемых серверных приложений",
          duration: "8 недель",
          level: "Продвинутый",
          price: 49.99,
          lessons: 24,
          progress: 0,
          isPublished: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "React с нуля",
          description: "Создание современных интерфейсов с React",
          duration: "10 недель",
          level: "Средний",
          price: 39.99,
          lessons: 30,
          progress: 0,
          isPublished: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Courses", null, {});
  },
};
