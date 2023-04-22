import logger from './logger';
import {
  LOCAL_DEV,
  MONGO_DB_NAME,
  MONGO_DB_PASSWORD,
  MONGO_DB_USER,
} from './variables';
import { connect } from 'mongoose';

const initializeMongoDb = async () => {
  try {
    await connect(
      `mongodb://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@localhost:27017/${MONGO_DB_NAME}`
    );
    logger.info('Connected to Mongodb');
  } catch (e) {
    logger.error('Unable to connect to Mongodb', { error: e });

    throw e;
  }
};

export const initializeDb = async () => {
  if (LOCAL_DEV) {
    await initializeMongoDb();
  }
};
