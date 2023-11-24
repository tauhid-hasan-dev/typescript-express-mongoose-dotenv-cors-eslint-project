import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (studentData: TStudent) => {
  // const result = await Student.create(studentData);

  const student = new Student(studentData);

  if (await student.isUserExists(studentData.id)) {
    throw new Error('This user exist');
  }

  const result = await student.save();
  return result;
};

const getStudentFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

export const studentServices = {
  createStudentIntoDB,
  getStudentFromDB,
  getSingleStudentFromDB,
};
