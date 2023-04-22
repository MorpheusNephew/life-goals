import { randomUUID } from 'crypto';
import { OpenAIApi } from 'openai';
import { getGoalAdvice } from '../../src/clients/openai';
import { AxiosError } from 'axios';
import logger from '../../src/utils/logger';

describe('Clients', () => {
  describe('OpenAI tests', () => {
    describe('getGoalAdvice', () => {
      const GOAL = 'I want to write better unit tests';
      const advice = randomUUID();

      test.each([
        { expectedResult: '', advice: undefined },
        { expectedResult: advice, advice },
      ])('should return goal advice', async ({ advice, expectedResult }) => {
        // Arrange
        const createCompletionSpy = jest.spyOn(
          OpenAIApi.prototype,
          'createCompletion'
        );

        createCompletionSpy.mockResolvedValueOnce({
          data: { choices: [{ text: advice }] },
        } as any);

        // Act
        const returnedAdvice = await getGoalAdvice(GOAL);

        // Assert
        expect(returnedAdvice).toBe(expectedResult);
      });

      test.each([
        { code: '401', message: 'Incorrect API key provided' },
        { code: '401', message: 'Invalid Authentication' },
        {
          code: '401',
          message: 'You must be a member of an organization to use the API',
        },
        { code: '429', message: 'Rate limit reached for requests' },
        {
          code: '429',
          message:
            'You exceeded your current quota, please check your plan and billing details',
        },
        {
          code: '429',
          message: 'The engine is currently overloaded, please try again later',
        },
        {
          code: '500',
          message: 'The server had an error while processing your request',
        },
      ])(
        'should return status code $code when error message is "$message"',
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
