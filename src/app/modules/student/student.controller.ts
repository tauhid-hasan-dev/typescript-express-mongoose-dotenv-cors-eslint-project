import httpStatus from 'http-status';
// controller will only do request to services and get response from the services
// Controller will not know the query

import { Request, Response, NextFunction } from 'express';
import { studentServices } from './student.services';
import sendResponse from '../../utils/sendResponse';
// import studentValidationSchema from './student.validation';
// import { studentValidationSchema } from './student.joi.validation';

const getStudentFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await studentServices.getStudentFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
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

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is retrieved succesfully',
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

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is deleted succesfully',
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
