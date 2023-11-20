// controller will only do request to services and get response from the services
// Controller will not know the query

import { Request, Response } from 'express';
import { studentServices } from './student.services';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    // will call service function to send this data
    const result = await studentServices.createStudentIntoDB(studentData);
    /* console.log(result); */
    // send response
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getStudentFromDB = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.getStudentFromDB();
    /* console.log(result); */
    // send response
    res.status(200).json({
      success: true,
      message: 'All Students is retrieved successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSingleStudentFromDB = async (req: Request, res: Response) => {
  try {
    const id = req.params.studentId;
    const result = await studentServices.getSingleStudentFromDB(id);
    console.log(result);
    // send response
    res.status(200).json({
      success: true,
      message: 'Student is retrieved successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const studentController = {
  createStudent,
  getStudentFromDB,
  getSingleStudentFromDB,
};
