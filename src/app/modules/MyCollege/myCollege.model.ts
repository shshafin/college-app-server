import mongoose, { Schema, model } from 'mongoose';
import { IReview } from './myCollege.interface';

const reviewSchema = new Schema<IReview>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    collegeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'College',
      required: true,
    },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true },
);

export const Review = model<IReview>('Review', reviewSchema);
