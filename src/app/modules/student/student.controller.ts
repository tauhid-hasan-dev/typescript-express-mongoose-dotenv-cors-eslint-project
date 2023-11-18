// controller will only do request to services and get response from the services
// Controller will not know the query

import { Request, Response } from 'express';
import { studentServices } from './student.services';

const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body;
    // will call service function to send this data
    const result = await studentServices.createStudentIntoDB(student);
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

export const studentController = {
    createStudent
};
