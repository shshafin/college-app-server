import express from 'express';
import { upload } from '../../middlewares/upload';
import { admissionController } from './admission.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

// Create admission
router.post(
  '/create',
  auth(),
  upload.fields([{ name: 'image', maxCount: 1 }]),
  admissionController.createAdmission,
);

// Get all admissions
router.get('/my', auth(), admissionController.getMyAdmissions);

// Get single admission by ID
router.get('/:id', auth(), admissionController.getAdmissionById);

// Update admission
router.patch(
  '/update/:id',
  auth(),
  upload.fields([{ name: 'image', maxCount: 1 }]),

export const AdmissionRoutes = router;
