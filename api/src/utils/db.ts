import { LOCAL_DEV } from './variables';
import { connect } from 'mongoose';

const initializeMongoose = async () => {
  try {
    await connect('mongodb://127.0.0.1:27017/life_goals');
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
