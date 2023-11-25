import express from 'express';
import { studentController } from './student.controller';

const router = express.Router();

router.post('/create-student', studentController.createStudent);
router.get('/', studentController.getStudentFromDB);
router.get('/:studentId', studentController.getSingleStudentFromDB);
router.delete('/:studentId', studentController.deleteStudent);

export const studentRoutes = router;
