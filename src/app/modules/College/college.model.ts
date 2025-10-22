import mongoose, { Schema, model } from 'mongoose';
import { ICollege } from './college.interface';

const collegeSchema = new Schema<ICollege>(
  {
    collegeName: { type: String, required: true },
    image: { type: String, required: true },
    rating: { type: Number },
    admissionDate: { type: String, required: true },
    numberOfResearch: { type: Number, required: true },
    events: { type: [String], default: [] },
    sports: { type: [String], default: [] },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
      },
    ],
  },
  { timestamps: true },
);

export const College = model<ICollege>('College', collegeSchema);
