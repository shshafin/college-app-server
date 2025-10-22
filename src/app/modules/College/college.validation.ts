import { z } from 'zod';

export const collegeValidationSchema = z.object({
  collegeName: z.string().min(1, 'College name is required'),
  image: z.string().url('Invalid image URL'),
  rating: z
    .number()
    .min(0, 'Rating cannot be less than 0')
    .max(5, 'Rating cannot be more than 5'),
  admissionDate: z.string().min(1, 'Admission date is required'),
  numberOfResearch: z.number().min(0, 'Number of research cannot be negative'),
  events: z.array(z.string()).optional(),
  sports: z.array(z.string()).optional(),
});
