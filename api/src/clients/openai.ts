import { Configuration, CreateCompletionRequest, OpenAIApi } from 'openai';
import { OPENAI_API_KEY, OPENAI_ORGANIZATION_ID } from '../utils/variables';
import logger from '../utils/logger';

const configuration = new Configuration({
  organization: OPENAI_ORGANIZATION_ID,
  apiKey: OPENAI_API_KEY,
});

const openAI = new OpenAIApi(configuration);

export const getGoalAdvice = async (lifeGoal: string) => {
  const createCompletionRequest: CreateCompletionRequest = {
    model: 'text-davinci-003',
    prompt: `As someone that is asked for life advice, give someone advice about "${lifeGoal}"`,
    max_tokens: 1024,
  };

  try {
    const { data: result } = await openAI.createCompletion(
      createCompletionRequest
    );

    return result.choices[0].text ?? '';
  } catch (e) {
    logger.error('Error creating advice with OpenAI', { error: e }); // Log this for futher investigation

    throw e;
  }
};

export default openAI;
