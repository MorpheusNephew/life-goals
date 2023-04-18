import {
  LOCAL_DEV,
  MONGO_DB_NAME,
  MONGO_DB_PASSWORD,
  MONGO_DB_USER,
} from './variables';
import { connect } from 'mongoose';

const initializeMongoose = async () => {
  try {
    await connect(
      `mongodb://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@localhost:27017/${MONGO_DB_NAME}`
    );
    console.log('Connected to Mongodb');
  } catch (e) {
    console.error('Unable to connect to Mongodb', { error: e });
  }
};

export const initializeDb = async () => {
  if (LOCAL_DEV) {
    await initializeMongoose();
  }
};
