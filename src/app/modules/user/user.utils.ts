// year semesterCode 4digit number
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  //203001   0001
  return lastStudent?.id ? lastStudent.id : undefined;
};

export const generateStudentId = async (payload: TAcademicSemester) => {
  // first time 0000
  //0001  => 1
  let currentId = (0).toString(); //0

  const lastStudentId = await findLastStudentId(); // 2030 01 0001
  const lastStudentYear = lastStudentId?.substring(0, 4); //2023
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6); //01

  const currentStudentYear = payload.code;
  const currentStudentSemesterCode = payload.year;

  if (
    lastStudentId &&
    lastStudentYear === currentStudentYear &&
    lastStudentSemesterCode === currentStudentSemesterCode
  ) {
    currentId = lastStudentId.substring(6); //0001
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0'); 

  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};
