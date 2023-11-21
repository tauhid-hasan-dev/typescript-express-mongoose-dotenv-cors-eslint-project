import { Schema, model } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student.interface';

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContactNo: {
    type: String,
    required: true,
  },
});

const localGurdianSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

// create a schema using interface

const studentSchema = new Schema<Student>({
  id: { type: String, required: true, unique:true },
  name: {
    type: userNameSchema,
    required: [true, 'Name field is Required'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female'],
      message: "{VALUE} is not valid"
    },
    required: true,
  },
  dateOfBirth: { type: String },
  email: { type: String, required: true, unique: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: {
    type: guardianSchema,
    required: [true, 'Gurdian is required']
  },
  localGuardian: {
    type: localGurdianSchema,
    required: [true, 'Local guardian is required']
  },
  profileImg: { type: String },
  isActive: {},
});

// Create a Model from the schema and type of the model will be the type called student.
// we will do database query on this model.
export const StudentModel = model<Student>('Student', studentSchema);
