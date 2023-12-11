// controller will only do request to services and get response from the services
// Controller will not know the query
import httpStatus from 'http-status';
import { studentServices } from './student.services';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
// import studentValidationSchema from './student.validation';
// import { studentValidationSchema } from './student.joi.validation';

const getStudentFromDB = catchAsync(async (req, res) => {
  const result = await studentServices.getStudentFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Students is retrieved successfully',
    data: result,
  });
});

const getSingleStudentFromDB = catchAsync(async (req, res) => {
  const id = req.params.studentId;
  const result = await studentServices.getSingleStudentFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is retrieved succesfully',
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res) => {
  const id = req.params.studentId;
  const udpatedStudentData = req.body;
  const result = await studentServices.updateSingleStudentFromDB(
    id,
    udpatedStudentData,
  );
  console.log(result);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is updated successfully',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const id = req.params.studentId;
  const result = await studentServices.deleteStudentFromDB(id);
  console.log(result);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is deleted succesfully',
    data: result,
  });
});

export const studentController = {
  getStudentFromDB,
  getSingleStudentFromDB,
  deleteStudent,
  updateStudent,
};
