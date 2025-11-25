// src/routes/studentsRoutes.js

import { Router } from 'express';
import {
  getStudents,
  getStudentById,
  createStudent,
  deleteStudent,
  updateStudent,
} from '../controllers/studentsController.js';
import { celebrate } from 'celebrate';
import { createStudentSchema } from '../validations/studentsValidation.js';
import { studentIdParamSchema } from '../validation/studentsValidation.js';
import { updateStudentSchema } from '../validations/studentsValidation.js';
import { getStudentsSchema } from '../validation/studentsValidation.js';

const router = Router();
router.get('/students', celebrate(getStudentsSchema), getStudents);

router.get(
  '/students/:studentId',
  celebrate(studentIdParamSchema),
  getStudentById,
);

router.post('/students', celebrate(createStudentSchema), createStudent);

router.delete(
  '/students/:studentId',
  celebrate(studentIdParamSchema),
  deleteStudent,
);

router.patch(
  '/students/:studentId',
  celebrate(updateStudentSchema),
  updateStudent,
);

export default router;
