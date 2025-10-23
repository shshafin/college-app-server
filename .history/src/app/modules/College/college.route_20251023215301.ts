import express from 'express';
import { upload } from '../../middlewares/upload';
import { collegeController } from './college.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

// Create college
router.post(
  '/create',
  auth(),
  upload.fields([{ name: 'image', maxCount: 1 }]),
  collegeController.createCollege,
);

// Update college
router.patch(
  '/update/:id',
  auth(),
  upload.fields([{ name: 'image', maxCount: 1 }]),
  collegeController.updateCollege,
);

// Get all colleges
router.get('/all', collegeController.getAllColleges);

// Get college by ID
router.get('/:id', collegeController.getCollegeById);

// Delete college
router.delete('/delete/:id', auth(), collegeController.deleteCollege);

// Search colleges by name
router.get('/search', collegeController.searchCollegesByNameController);

export const CollegeRoutes = router;
