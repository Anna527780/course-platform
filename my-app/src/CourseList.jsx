import { useState, useEffect } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import "./CourseList.css";

const initialCourses = [
  {
    id: 1,
    title: "Python-разработчик",
    category: "Программирование",
    level: "Начальный",
    price: 0,
  },
  {
    id: 2,
    title: "Специалист по кибербезопасности",
    category: "Программирование",
    level: "Продвинутый",
    price: 49.99,
  },
  {
    id: 3,
    title: "1С-разработчик",
    category: "Программирование",
    level: "Средний",
    price: 39.99,
  },
];

const ALL_CATEGORIES = [
  "Все направления",
  "Программирование",
  "Аналитика",
  "Дизайн",
  "Игры",
  "Маркетинг",
  "Управление",
  "Детям",
];

export default function CourseList() {
  const [courses, setCourses] = useLocalStorage("courses", initialCourses);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Все направления");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ЭФФЕКТ 1: Изменение заголовка страницы в зависимости от количества курсов
  useEffect(() => {
    document.title = `Курсы (${courses.length}) — Платформа`;
  }, [courses.length]);

  const handleDelete = (id) => {
    setCourses(courses.filter((c) => c.id !== id));
  };

  const handleAdd = (newCourse) => {
    setCourses([...courses, { ...newCourse, id: Date.now() }]);
    setIsModalOpen(false);
  };

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "Все направления" ||
      course.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  // ЭФФЕКТ 2: Подсчёт статистики
  const totalCourses = courses.length;
  const freeCourses = courses.filter((c) => c.price === 0).length;
  const paidCourses = totalCourses - freeCourses;

  return (
    <div className="main-wrapper">
      <div className="page-container">
        {/* 1. Фильтры-категории */}
        <div className="categories-row">
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`category-pill ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 2. Поиск */}
        <div className="search-section">
          <input
            type="text"
            className="search-input"
            placeholder="Поиск по курсам..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* 3. Блок статистики (теперь под поиском) */}
        <div className="stats-container">
          <div className="stat-card">
            <span className="stat-value">{totalCourses}</span>
            <span className="stat-label">Всего курсов</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{freeCourses}</span>
            <span className="stat-label">Бесплатных</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{paidCourses}</span>
            <span className="stat-label">Платных</span>
          </div>
        </div>

        {/* 4. Шапка списка */}
        <div className="list-header">
          <h2 className="list-title">Курсы</h2>
          <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
            + Добавить курс
          </button>
        </div>

        {/* 5. Сетка карточек */}
        <div className="course-grid">
          {filteredCourses.length === 0 ? (
            <div className="empty-state">В этой категории курсов пока нет.</div>
          ) : (
            filteredCourses.map((course, index) => (
              <div key={course.id} className="course-card">
                <div
                  className={`card-image placeholder-${(index % 3) + 1}`}
                ></div>

                <div className="card-content">
                  <h3 className="card-title">{course.title}</h3>
                  <div className="card-tags">
                    <span className="tag">
                      {course.category || "Без категории"}
                    </span>
                  </div>
                  <div className="card-meta">
                    <span>⏱ {course.level}</span>
                  </div>
                  <div className="card-footer">
                    <span className="card-price">
                      {course.price === 0
                        ? "Бесплатно"
                        : `${course.price} руб.`}
                    </span>
                    <button
                      className="btn-delete-icon"
                      onClick={() => handleDelete(course.id)}
                      title="Удалить"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {isModalOpen && (
        <AddCourseModal
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAdd}
        />
      )}
    </div>
  );
}

// Модальное окно
function AddCourseModal({ onClose, onAdd }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("Начальный");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd({ title: title.trim(), category, level, price: Number(price) || 0 });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} type="button">
          ✕
        </button>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label className="form-label">Название курса</label>
            <input
              type="text"
              className="form-input"
              placeholder="Например: Основы Python"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={150}
              required
              autoFocus
            />
            <div className="form-hint">
              <span>
                От 3 до 150 символов. Разрешены буквы, цифры, пробелы...
              </span>
              <span>{title.length} / 150</span>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Категория</label>
            <select
              className="form-input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" disabled>
                — выберите категорию —
              </option>
              {ALL_CATEGORIES.filter((cat) => cat !== "Все направления").map(
                (cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ),
              )}
            </select>
            <div className="form-hint">
              Выберите одну из предложенных категорий
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Уровень</label>
            <select
              className="form-input"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="Начальный">Начальный</option>
              <option value="Средний">Средний</option>
              <option value="Продвинутый">Продвинутый</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Цена (руб.)</label>
            <input
              type="number"
              className="form-input"
              placeholder="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Описание</label>
            <textarea
              className="form-input form-textarea"
              placeholder="Краткое описание курса"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={1000}
            />
            <div className="form-hint">
              <span>От 5 до 1000 символов (необязательно)</span>
              <span>{description.length} / 1000</span>
            </div>
          </div>

          <div className="modal-actions">
            <button type="submit" className="btn-primary">
              Сохранить курс
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
