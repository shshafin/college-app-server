import httpStatus from 'http-status';
import AppError from '../../errors/appError';
import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (payload: TUser) => {
  const { email } = payload;

  // check duplicate user
  const isUserExists = await User.findOne({ email });
  if (isUserExists) {
    throw new AppError(
      httpStatus.ALREADY_REPORTED,
      'User already exists!',
      'create user with another username and email',
    );
  }

  // create user
  const result = await User.create(payload);

  return result;
};

export const getSingleUserByEmail = async (email: string) => {
  const user = await User.findOne({ email });
  return user;
};

export const UserServices = {
  createUserIntoDB,
};
