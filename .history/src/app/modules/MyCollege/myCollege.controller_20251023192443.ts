import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { myCollegeService } from './myCollege.service';

// GET all admissions
export const getMyColleges = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user._id;
  const myColleges = await myCollegeService.getMyColleges(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'My colleges retrieved successfully',
    data: myColleges,
  });
});

// ADD review to a college
export const addReview = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user._id;
  const { collegeId, rating, comment } = req.body;

  const review = await myCollegeService.addReview(userId, {
    collegeId,
    rating,
    comment,
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Review added successfully',
    data: review,
  });
});

// GET all reviews of a college
export const getCollegeReviews = catchAsync(
  async (req: Request, res: Response) => {
    const { collegeId } = req.params;
    const reviews = await myCollegeService.getCollegeReviews(collegeId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Reviews retrieved successfully',
      data: reviews,
    });
  },
);

// GET all college reviews
export const getAllCollegeReviews = catchAsync(
  async (req: Request, res: Response) => {
    const reviews = await myCollegeService.getAllCollegeReviews();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Reviews retrieved successfully',
      data: reviews,
    });
  },
);

export const myCollegeController = {
  getMyColleges,
  addReview,
  getCollegeReviews,
  getAllCollegeReviews,
};
