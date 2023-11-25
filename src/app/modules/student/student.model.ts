import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  TStudent,
  StudentModel,
  UserName,
} from './student.interface';
import config from '../../config';

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
    trim: true,
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    trim: true,
    required: [true, 'Father Name is required'],
  },
  fatherOccupation: {
    type: String,
    trim: true,
    required: [true, 'Father occupation is required'],
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father Contact No is required'],
  },
  motherName: {
    type: String,
    required: [true, 'Mother Name is required'],
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother occupation is required'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother Contact No is required'],
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

const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, required: [true, 'Id is required'], unique: true },
  password: {
    type: String,
    required: [true, 'Password is required'],
    maxlength: [20, 'passwor'],
  },
  name: {
    type: userNameSchema,
    required: [true, 'Name field is Required'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female'],
      message: '{VALUE} is not valid',
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
    required: [true, 'Gurdian is required'],
  },
  localGuardian: {
    type: localGurdianSchema,
    required: [true, 'Local guardian is required'],
  },
  profileImg: { type: String },
  isActive: {},
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

//!-------middlewares in mongoose ----------------

// pre save middleware/ hook : will work on create()  save()
studentSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bycrypt_salt_round),
  );
  next();
});

//post save middleware / hook
studentSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// Query middle ware

studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// !------------creating a custom static method -------------

studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

//!-------------- creating a custom instance method------------
/* studentSchema.methods.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });

  return existingUser;
}; */

// Create a Model from the schema and type of the model will be the type called student.
// we will do database query on this model.
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
export { StudentModel };
