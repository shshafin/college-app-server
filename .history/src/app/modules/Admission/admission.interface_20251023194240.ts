import { Types } from 'mongoose';

export interface IAdmission {
  _id?: string;
  userId: Types.ObjectId;
  collegeId: Types.ObjectId;
  candidateName: string;
  subject: string;
  candidateEmail: string;
  candidatePhone: string;
  address: string;
  dateOfBirth: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}
