// Модель курсов (данные хранятся в памяти сервера)
let courses = [
  {
    id: 1,
    title: "Основы JavaScript",
    description: "Изучите основы программирования на JavaScript",
    duration: "6 недель",
    level: "Начальный",
    price: 0,
    lessons: 12,
    progress: 0,
  },
  {
    id: 2,
    title: "Продвинутый Node.js",
    description: "Создание масштабируемых серверных приложений",
    duration: "8 недель",
    level: "Продвинутый",
    price: 49.99,
    lessons: 24,
    progress: 0,
  },
  {
    id: 3,
    title: "React с нуля",
    description: "Создание современных интерфейсов с React",
    duration: "10 недель",
    level: "Средний",
    price: 39.99,
    lessons: 30,
    progress: 0,
  },
];

// ВАЖНО: используем let, а не const!
let nextId = 4; // для генерации новых ID

module.exports = {
  courses,
  nextId,
};
