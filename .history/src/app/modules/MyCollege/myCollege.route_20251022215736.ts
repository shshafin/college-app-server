import express from 'express';
import { myCollegeController } from './myCollege.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

// Get all colleges
router.get('/my', auth(), myCollegeController.getMyColleges);

// Add review to a college
router.post('/review', auth(), myCollegeController.addReview);

// Get all reviews of a college
router.get('/reviews/:collegeId', myCollegeController.getCollegeReviews);

export const MyCollegeRoutes = router;
