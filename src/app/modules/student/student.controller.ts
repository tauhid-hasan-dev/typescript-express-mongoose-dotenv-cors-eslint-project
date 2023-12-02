// controller will only do request to services and get response from the services
// Controller will not know the query

import { Request, Response, NextFunction } from 'express';
import { studentServices } from './student.services';
// import studentValidationSchema from './student.validation';
// import { studentValidationSchema } from './student.joi.validation';

const getStudentFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await studentServices.getStudentFromDB();
    res.status(200).json({
      success: true,
      message: 'All Students is retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getSingleStudentFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.studentId;
    const result = await studentServices.getSingleStudentFromDB(id);
    console.log(result);
    res.status(200).json({
      success: true,
      message: 'Student is retrieved successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.studentId;
    const result = await studentServices.deleteStudentFromDB(id);
    console.log(result);
    res.status(200).json({
      success: true,
      message: 'Student is deleted successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const studentController = {
  getStudentFromDB,
  getSingleStudentFromDB,
  deleteStudent,
};
