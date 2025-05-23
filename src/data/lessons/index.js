// src/data/lessons/index.js
import lesson1_1 from './module1/lesson1';
import lesson1_2 from './module1/lesson2';
import lesson1_3 from './module1/lesson3';
import lesson2_1 from './module2/lesson1';
import lesson2_2 from './module2/lesson2';
import lesson2_3 from './module2/lesson3';
import lesson3_1 from './module3/lesson1';
import lesson3_2 from './module3/lesson2';
import lesson3_3 from './module3/lesson3';
import lesson4_1 from './module4/lesson1';
import lesson4_2 from './module4/lesson2';
import lesson5_1 from './module5/lesson1';
import lesson5_2 from './module5/lesson2';
import lesson5_3 from './module5/lesson3';
import lesson5_4 from './module5/lesson4';
import lesson6_1 from './module6/lesson1';
import lesson6_2 from './module6/lesson2';
import lesson7_1 from './module7/lesson1';
import lesson7_2 from './module7/lesson2';
import lesson8_1 from './module8/lesson1';
import lesson8_2 from './module8/lesson2';
import lesson8_3 from './module8/lesson3';
import lesson8_4 from './module8/lesson4';


export const LESSONS = {
  '1-1': lesson1_1,
  '1-2': lesson1_2,
  '1-3': lesson1_3,
  '2-1': lesson2_1,
  '2-2': lesson2_2,
  '2-3': lesson2_3,
  '3-1': lesson3_1,
  '3-2': lesson3_2,
  '3-3': lesson3_3,
  '4-1': lesson4_1,
  '4-2': lesson4_2,
  '5-1': lesson5_1,
  '5-2': lesson5_2,
  '5-3': lesson5_3,
  '5-4': lesson5_4,
  '6-1': lesson6_1,
  '6-2': lesson6_2,
  '7-1': lesson7_1,
  '7-2': lesson7_2,
  '8-1': lesson8_1,
  '8-2': lesson8_2,
  '8-3': lesson8_3,
  '8-4': lesson8_4,
};

export function getLesson(moduleId, lessonId) {
  const key = `${moduleId}-${lessonId}`;
  return LESSONS[key] || null;
}

export function getModuleLessons(moduleId) {
  return Object.values(LESSONS)
    .filter(lesson => lesson.id.startsWith(`${moduleId}-`))
    .sort((a, b) => a.id.localeCompare(b.id));
}

export function getAllLessons() {
  return Object.values(LESSONS).sort((a, b) => a.id.localeCompare(b.id));
}