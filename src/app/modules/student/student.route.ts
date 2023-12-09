import express from 'express';
import { studentController } from './student.controller';

const router = express.Router();

/* router.post('/create-student', studentController.createStudent); */
router.get('/:studentId', studentController.getSingleStudentFromDB);
router.patch('/:studentId', studentController.updateStudent);
router.delete('/:studentId', studentController.deleteStudent);
router.get('/', studentController.getStudentFromDB);

export const studentRoutes = router;
