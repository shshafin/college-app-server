import { z } from 'zod';

export const admissionValidationSchema = z.object({
  collegeId: z.string().min(1, 'College is required'),
  candidateName: z.string().min(1, 'Candidate Name is required'),
  subject: z.string().min(1, 'Subject is required'),
  candidateEmail: z.string().email('Invalid email'),
  candidatePhone: z.string().min(5, 'Invalid phone number'),
  address: z.string().min(1, 'Address is required'),
  dateOfBirth: z.string().min(1, 'Date of Birth is required'),
  image: z.string().min(1, 'Image is required'),
});
