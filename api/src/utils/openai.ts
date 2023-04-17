import { Configuration, CreateCompletionRequest, OpenAIApi } from 'openai';
import { OPENAI_API_KEY, OPENAI_ORGANIZATION_ID } from './variables';

const configuration = new Configuration({
  organization: OPENAI_ORGANIZATION_ID,
  apiKey: OPENAI_API_KEY,
});

const openAI = new OpenAIApi(configuration);

export const getGoalAdvice = async (lifeGoal: string) => {
  const { data: models } = await openAI.listModels();

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
    console.error({ error: e });

    return '';
  }
};

export default openAI;
