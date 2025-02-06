import mongoose from 'mongoose';
import logger from '../utils/logger';
import { UserModel } from './user.schema';
import { UserRole } from '../../../../shared/src/lib/models/user.model';
import bcrypt from 'bcrypt';

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/technologyRadar');
    logger.info('MongoDB connected successfully!');
    await resetUsers();
  } catch (error) {
    logger.error(`MongoDB connection error: ${error}`);
    process.exit(1);
  }
};
