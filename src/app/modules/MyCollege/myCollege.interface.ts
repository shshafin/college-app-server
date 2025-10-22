import { Types } from 'mongoose';

export interface IReview {
  _id?: string;
  userId: Types.ObjectId;
  collegeId: Types.ObjectId;
  rating: number;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
}
