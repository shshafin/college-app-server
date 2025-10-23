import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { collegeService } from './college.service';

// GET all colleges
export const getAllColleges = catchAsync(
  async (req: Request, res: Response) => {
    const colleges = await collegeService.getAllColleges();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Colleges retrieved successfully',
      data: colleges,
    });
  },
);

// GET single college by ID
export const getCollegeById = catchAsync(
  async (req: Request, res: Response) => {
    const collegeId = req.params.id;
    const college = await collegeService.getCollegeById(collegeId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'College retrieved successfully',
      data: college,
    });
  },
);

// CREATE new college
export const createCollege = catchAsync(async (req: Request, res: Response) => {
  const payload = { ...req.body };

  if (req.files && (req.files as any).image) {
    payload.image = `/uploads/${(req.files as any).image[0].filename}`;
  } else {
    return res.status(400).json({
      success: false,
      message: 'Image is required',
    });
  }

  const college = await collegeService.createCollege(payload);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'College created successfully',
    data: college,
  });
});

// UPDATE existing college
export const updateCollege = catchAsync(async (req: Request, res: Response) => {
  const collegeId = req.params.id;
  const payload = { ...req.body };

  if (req.files && (req.files as any).image) {
    payload.image = `/uploads/${(req.files as any).image[0].filename}`;
  }

  const updatedCollege = await collegeService.updateCollege(collegeId, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'College updated successfully',
    data: updatedCollege,
  });
});

// DELETE college
export const deleteCollege = catchAsync(async (req: Request, res: Response) => {
  const collegeId = req.params.id;
  const deletedCollege = await collegeService.deleteCollege(collegeId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'College deleted successfully',
    data: deletedCollege,
  });
});

// SEARCH colleges by name
export const searchCollegesByName = catchAsync(
  async (req: any, res: Response) => {
    const colleges = await collegeService.searchCollegesByName(req.query.name);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Colleges retrieved successfully',
      data: colleges,
    });
  },
);

export const collegeController = {
  getAllColleges,
  getCollegeById,
  createCollege,
  updateCollege,
  deleteCollege,
};
