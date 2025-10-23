import AppError from '../../errors/appError';
import { IAdmission } from './admission.interface';
import { Admission } from './admission.model';

// CREATE admission
const createAdmission = async (data: IAdmission): Promise<IAdmission> => {
  try {
    return await Admission.create(data);
  } catch (error: any) {
    throw new AppError(
      400,
      error.message || 'Error creating admission',
      'Failed to create admission',
    );
  }
};

// GET all admissions
const getMyAdmissions = async (userId: string): Promise<IAdmission[]> => {
  try {
    return await Admission.find({ userId }).populate(
      'collegeId',
      'collegeName image admissionDate rating',
    );
  } catch (error: any) {
    throw new AppError(
      500,
      error.message || 'Error fetching admissions',
      'Failed to get admissions',
    );
  }
};

// GET single admission by ID
const getAdmissionById = async (id: string): Promise<IAdmission | null> => {
  try {
    const admission = await Admission.findById(id).populate(
      'collegeId',
      'collegeName image admissionDate rating',
    );
    if (!admission) {
      throw new AppError(
        404,
        `Admission with id ${id} not found`,
        'Admission not found',
      );
    }
    return admission;
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      500,
      error.message || 'Error fetching admission',
      'Failed to get admission',
    );
  }
};

export const admissionService = {
  createAdmission,
  getMyAdmissions,
  getAdmissionById,
};
