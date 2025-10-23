import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { admissionService } from './admission.service';

// CREATE admission
export const createAdmission = catchAsync(
  async (req: Request, res: Response) => {
    const payload: any = { ...req.body, userId: req.user._id };

    if (req.files && (req.files as any).image) {
      payload.image = `/uploads/${(req.files as any).image[0].filename}`;
    } else {
      return res.status(400).json({
        success: false,
        message: 'Image is required',
      });
    }

    const admission = await admissionService.createAdmission(payload);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Admission created successfully',
      data: admission,
    });
  },
);

// GET all admissions
export const getMyAdmissions = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.user._id;
    const admissions = await admissionService.getMyAdmissions(userId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admissions retrieved successfully',
      data: admissions,
    });
  },
);

// GET single admission by ID
export const getAdmissionById = catchAsync(
  async (req: Request, res: Response) => {
    const admissionId = req.params.id;
    const admission = await admissionService.getAdmissionById(admissionId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admission retrieved successfully',
      data: admission,
    });
  },
);



export const admissionController = {
  createAdmission,
  getMyAdmissions,
  getAdmissionById,
};
