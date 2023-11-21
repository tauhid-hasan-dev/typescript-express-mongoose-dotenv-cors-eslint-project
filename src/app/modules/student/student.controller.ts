// controller will only do request to services and get response from the services
// Controller will not know the query

import { Request, Response } from 'express';
import { studentServices } from './student.services';
import studentValidationSchema from './student.validation';
// import { studentValidationSchema } from './student.joi.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    
    //!------Joi validation--------
    // const { error, value } = studentValidationSchema.validate(studentData);
    
    //!-------Zod Validation---------
    const zodParsedData = studentValidationSchema.parse(studentData);

   /*  if (error) {
      res.status(500).json({
        success: false,
        message: 'something went wrong',
        error: error.details,
      });
    } */

    const result = await studentServices.createStudentIntoDB(zodParsedData);

    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: err,
    });
  }
};

const getStudentFromDB = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.getStudentFromDB();
    res.status(200).json({
      success: true,
      message: 'All Students is retrieved successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: err,
    });
  }
};

const getSingleStudentFromDB = async (req: Request, res: Response) => {
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
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: err,
    });
  }
};

export const studentController = {
  createStudent,
  getStudentFromDB,
  getSingleStudentFromDB,
};
