import AppError from '../../errors/appError';
import { ICollege } from './college.interface';
import { College } from './college.model';
import { Review } from '../MyCollege/myCollege.model';

// GET all colleges
const getAllColleges = async (): Promise<ICollege[]> => {
  try {
    const colleges = await College.find().lean();

    const collegesWithReviews = await Promise.all(
      colleges.map(async (college) => {
        // get all reviews
        const reviews = await Review.find({ collegeId: college._id }).lean();

        const avgRating =
          reviews.length > 0
            ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
            : 0;

        return {
          ...college,
          reviews,
          rating: avgRating,
        };
      }),
    );

    return collegesWithReviews;
  } catch (error: any) {
    throw new AppError(
      500,
      error.message || 'Error fetching colleges',
      'Failed to get all colleges',
    );
  }
};

// GET single college by ID
const getCollegeById = async (id: string): Promise<ICollege | null> => {
  try {
    const college = await College.findById(id)
      .populate({
        path: 'reviews',
        populate: {
          path: 'userId',
          select: 'name email',
        },
      })
      .lean();

    if (!college) {
      throw new AppError(
        404,
        `College with id ${id} not found`,
        'College not found',
      );
    }

    const avgRating =
      college.reviews && college.reviews.length > 0
        ? college.reviews.reduce((acc: number, r: any) => acc + r.rating, 0) /
          college.reviews.length
        : 0;

    return { ...college, rating: avgRating };
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      500,
      error.message || 'Error fetching college by ID',
      'Failed to get college',
    );
  }
};

// CREATE college
const createCollege = async (data: ICollege): Promise<ICollege> => {
  try {
    return await College.create(data);
  } catch (error: any) {
    throw new AppError(
      400,
      error.message || 'Error creating college',
      'Failed to create college',
    );
  }
};

// UPDATE college
const updateCollege = async (
  id: string,
  data: Partial<ICollege>,
): Promise<ICollege | null> => {
  try {
    const updatedCollege = await College.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updatedCollege) {
      throw new AppError(
        404,
        `College with id ${id} not found`,
        'College not found',
      );
    }
    return updatedCollege;
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      500,
      error.message || 'Error updating college',
      'Failed to update college',
    );
  }
};

// DELETE college
const deleteCollege = async (id: string): Promise<ICollege | null> => {
  try {
    const deletedCollege = await College.findByIdAndDelete(id);
    if (!deletedCollege) {
      throw new AppError(
        404,
        `College with id ${id} not found`,
        'College not found',
      );
    }
    return deletedCollege;
  } catch (error: any) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      500,
      error.message || 'Error deleting college',
      'Failed to delete college',
    );
  }
};

// 

export const collegeService = {
  getAllColleges,
  getCollegeById,
  createCollege,
  updateCollege,
  deleteCollege,
};
