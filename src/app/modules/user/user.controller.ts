import { Request, Response, NextFunction } from 'express';
import { userServices } from './user.service';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentData } = req.body;

    //!------Joi validation--------
    // const { error, value } = studentValidationSchema.validate(studentData);

    //!-------Zod Validation---------
    // const zodParsedData = studentValidationSchema.parse(studentData);

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
    next(err);
  }
};

export const UserControllers = {
  createStudent,
};
