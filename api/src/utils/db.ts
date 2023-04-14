import { Sequelize } from 'sequelize';
import {
  LOCAL_DEV,
  POSTGRES_DB,
  POSTGRES_PASSWORD,
  POSTGRES_USER,
} from './variables';

const initializeLocalPostgres = async () => {
  const sequelize = new Sequelize(
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    {
      host: 'localhost',
      dialect: 'postgres',
    }
  );

  try {
    await sequelize.authenticate();
    console.log('Connected to postgres');
  } catch (e) {
    console.error('Unable to connect to postgres', { error: e });
  }
};

export const initializeDb = async () => {
  if (LOCAL_DEV) {
    await initializeLocalPostgres();
  }
};
