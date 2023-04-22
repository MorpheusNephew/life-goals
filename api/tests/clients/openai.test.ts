import { randomUUID } from 'crypto';
import { OpenAIApi } from 'openai';
import { getGoalAdvice } from '../../src/clients/openai';
import { AxiosError } from 'axios';
import logger from '../../src/utils/logger';

describe('Clients', () => {
  describe('OpenAI tests', () => {
    describe('getGoalAdvice', () => {
      const GOAL = 'I want to write better unit tests';

      test('should return goal advice', async () => {
        // Arrange
        const createCompletionSpy = jest.spyOn(
          OpenAIApi.prototype,
          'createCompletion'
        );

        const advice = randomUUID();

        createCompletionSpy.mockResolvedValueOnce({
          data: { choices: [{ text: advice }] },
        } as any);

        // Act
        const returnedAdvice = await getGoalAdvice(GOAL);

        // Assert
        expect(returnedAdvice).toBe(advice);
      });

      test.each([{ code: '401', message: 'Incorrect API key provided' }])(
        'should log error and return no advice',
        async ({ code, message }) => {
          // Arrange
          const createCompletionSpy = jest.spyOn(
            OpenAIApi.prototype,
            'createCompletion'
          );

          const loggerErrorSpy = jest.spyOn(logger, 'error');

          const axiosError = new AxiosError(message, code);

          createCompletionSpy.mockRejectedValueOnce(axiosError);

          // Act / Assert
          await expect(() => getGoalAdvice(GOAL)).rejects.toThrow(axiosError);
          expect(loggerErrorSpy).toHaveBeenCalledWith(
            'Error creating advice with OpenAI',
            { error: axiosError }
          );
        }
      );
    });
  });
});
