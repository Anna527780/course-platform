import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
  // Инициализация состояния: берем из localStorage или ставим начальное значение
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Ошибка при чтении localStorage:", error);
      return initialValue;
    }
  });

  // Эффект для сохранения изменений в localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Ошибка при записи в localStorage:", error);
    }
  }, [key, value]);

  return [value, setValue];
}
