import mongoose from 'mongoose';
import * as variables from '../../src/utils/variables';
import { initializeDb } from '../../src/utils/db';
import logger from '../../src/utils/logger';

describe('Utils', () => {
  describe('DB tests', () => {
    describe('initalizeDb', () => {
      test('should not initalize database if not LOCAL_DEV', async () => {
        // Assert
        const connectSpy = jest.spyOn(mongoose, 'connect');
        // @ts-ignore
        variables.LOCAL_DEV = false;

        // Act
        await initializeDb();

        // Assert
        expect(connectSpy).not.toHaveBeenCalled();
      });

      describe('initalizeMongoDb', () => {
        beforeEach(() => {
          // @ts-ignore
          variables.LOCAL_DEV = true;
        });

        test('should connect to Mongodb', async () => {
          // Arrange
          const connectSpy = jest.spyOn(mongoose, 'connect');
          const loggerInfoSpy = jest.spyOn(logger, 'info');
          const loggerErrorSpy = jest.spyOn(logger, 'error');

          connectSpy.mockResolvedValueOnce({} as any);

          // Act
          await initializeDb();

          // Assert
          expect(connectSpy).toHaveBeenCalled();
          expect(loggerInfoSpy).toHaveBeenCalledWith('Connected to Mongodb');
          expect(loggerErrorSpy).not.toHaveBeenCalled();
        });

        test('should error not being able to connect', async () => {
          // Arrange
          const connectSpy = jest.spyOn(mongoose, 'connect');
          const loggerInfoSpy = jest.spyOn(logger, 'info');
          const loggerErrorSpy = jest.spyOn(logger, 'error');

          const error = new Error('Something went wrong');

          connectSpy.mockRejectedValueOnce(error);

          // Act / Assert
          await expect(() => initializeDb()).rejects.toThrowError(error);
          expect(connectSpy).toHaveBeenCalled();
          expect(loggerInfoSpy).not.toHaveBeenCalled();
          expect(loggerErrorSpy).toHaveBeenCalledWith(
            'Unable to connect to Mongodb',
            { error }
          );
        });
      });
    });
  });
});
