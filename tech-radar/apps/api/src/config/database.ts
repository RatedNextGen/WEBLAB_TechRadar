import mongoose from 'mongoose';
import logger from '../utils/logger';
import { UserModel } from './user.schema';
import { UserRole } from '../../../../shared/src/lib/models/user.model';
import bcrypt from 'bcrypt';
import { TechnologyModel } from './technology.schema';
import { getSampleTechnologies } from './getSampleTechnologies';

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/technologyRadar');
    logger.info('MongoDB connected successfully!');
    await Promise.all([
      await resetUsers(),
      await resetTechnologies()
    ]);
  } catch (error) {
    logger.error(`MongoDB connection error: ${error}`);
    process.exit(1);
  }
};

/**
 * This function is only here so that consistency of the users can be ensured at all times
 * REMOVE it when going to production!
 */
const resetUsers = async () => {
  try {
    logger.info('Drop all users');
    await UserModel.deleteMany({});

    const users = [
      { email: 'cto@hslu.ch', password: 'cto123', role: UserRole.CTO },
      { email: 'techlead@hslu.ch', password: 'techlead123', role: UserRole.TECH_LEAD },
      { email: 'employee@hslu.ch', password: 'employee123', role: UserRole.EMPLOYEE }
    ];

    const hashedUsers = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 1024)
      }))
    );

    await UserModel.insertMany(hashedUsers);
    logger.info('Users added successfully');
  } catch (error) {
    logger.error(`Error adding users ${error}`);
  }
};

/**
 * This function is only here so that there is a baseline of technologies present
 * REMOVE it when going to production!
 */
const resetTechnologies = async () => {
  try {
    logger.info('Drop all technologies');
    await TechnologyModel.deleteMany({});

    const technologies = getSampleTechnologies();

    await TechnologyModel.insertMany(technologies);
    logger.info('Technology added successfully');
  } catch (error) {
    logger.error(`Error adding technologies ${error}`);
  }
};
