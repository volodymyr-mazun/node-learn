// src/controllers/studentsController.js

import { Student } from '../models/student.js';
import createHttpError from 'http-errors';

// Отримати список усіх студентів

export const getStudents = async (req, res) => {
  const { page = 1, perPage = 10 } = req.query; //Дістаємо з req.query два параметри
  const skip = (page - 1) * perPage; //Вираховуємо, скільки документів пропустити (page=3, perPage=10 → skip = 20)
  const studentsQuery = await Student.find(); //Створює базовий запит до колекції Student.

  const [totalItems, students] = await Promise.all([
    studentsQuery.clone().countDocuments(), //Клонуємо запит, щоб не зламати основ. countDocuments() рахує, скільки всього студентів
    studentsQuery.skip(skip).limit(perPage), //базовий запит, але обмежений: пропускає skip і бере perPage.
  ]);
  const totalPages = Math.ceil(totalItems / perPage);
  res.status(200).json({ page, perPage, totalItems, totalPages, students });
};

// Отримати одного студента за id
export const getStudentById = async (req, res, next) => {
  const { studentId } = req.params;
  const student = await Student.findById(studentId);
  if (!student) {
    next(createHttpError(404, 'Student not found'));
    return;
  }
  res.status(200).json(student);
};

// Новий контролер
export const createStudent = async (req, res) => {
  const student = await Student.create(req.body);
  res.status(201).json(student);
};

export const deleteStudent = async (req, res, next) => {
  const { studentId } = req.params;
  const student = await Student.findOneAndDelete({
    _id: studentId,
  });
  if (!student) {
    next(createHttpError(404, 'Student not found'));
    return;
  }
  res.status(200).json(student);
};

export const updateStudent = async (req, res, next) => {
  const { studentId } = req.params;
  const student = await Student.findOneAndUpdate({ _id: studentId }, req.body, {
    new: true,
  });
  if (!student) {
    next(createHttpError(404, 'Student not found'));
    return;
  }
  res.status(200).json(student);
};
