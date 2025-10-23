import AppError from '../../errors/appError';
import { Admission } from '../Admission/admission.model';
import { College } from '../College/college.model';
import { IReview } from './myCollege.interface';
import { Review } from './myCollege.model';

// GET all admissions
const getMyColleges = async (userId: string) => {
  try {
    return await Admission.find({ userId }).populate(
      'collegeId',
      'collegeName image admissionDate reviews',
    );
  } catch (error: any) {
    throw new AppError(
      500,
      error.message || 'Error fetching my colleges',
      'Failed to get my colleges',
    );
  }
};

// ADD review to a college
const addReview = async (
  userId: string,
  data: { collegeId: string; rating: number; comment: string },
): Promise<IReview> => {
  const review = await Review.create({ ...data, userId });

  await College.findByIdAndUpdate(data.collegeId, {
    $push: { reviews: review._id },
  });

  const reviews = await Review.find({ collegeId: data.collegeId });
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
      : 0;

  await College.findByIdAndUpdate(data.collegeId, { rating: avgRating });

  return review;
};

// GET all reviews
const getCollegeReviews = async (collegeId: string) => {
  try {
    return await Review.find({ collegeId }).populate('userId', 'name email');
  } catch (error: any) {
    throw new AppError(
      500,
      error.message || 'Error fetching reviews',
      'Failed to get reviews',
    );
  }
};

// get all college reviews
const getAllCollegeReviews = async () => {
  try {
    return await Review.find().populate(
      'userId',
      'name email',
      'collegeName',
    );
  } catch (error: any) {
    throw new AppError(
      500,
      error.message || 'Error fetching reviews',
      'Failed to get reviews',
    );
  }
};

export const myCollegeService = {
  getMyColleges,
  addReview,
  getCollegeReviews,
  getAllCollegeReviews,
};
