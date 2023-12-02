import { Request, Response } from 'express';
import { userServices } from './user.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { password, student: studentData } = req.body;

    //!------Joi validation--------
    // const { error, value } = studentValidationSchema.validate(studentData);

    //!-------Zod Validation---------
    // const zodParsedData = studentValidationSchema.parse(studentData);

    /*  if (error) {
        res.status(500).json({
          success: false,
          message: 'something went wrong',
          error: error.details,
        });
      } */

    const result = await userServices.createStudentIntoDB(
      password,
      studentData,
    );

    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

export const UserControllers = {
  createStudent,
};
