import mongoose, { Schema, model } from 'mongoose';
import { IAdmission } from './admission.interface';

const admissionSchema = new Schema<IAdmission>(
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
    candidateName: { type: String, required: true },
    subject: { type: String, required: true },
    candidateEmail: { type: String, required: true },
    candidatePhone: { type: String, required: true },
    address: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true },
);

export const Admission = model<IAdmission>('Admission', admissionSchema);
