import { z } from 'zod';

export const reviewValidationSchema = z.object({
  collegeId: z.string().min(1, 'College is required'),
  rating: z.number().min(1).max(5, 'Rating must be 1-5'),
  comment: z.string().min(1, 'Comment is required'),
});
