import { Configuration, OpenAIApi } from 'openai';
import { OPENAI_API_KEY, OPENAI_ORGANIZATION_ID } from './variables';

const configuration = new Configuration({
  organization: OPENAI_ORGANIZATION_ID,
  apiKey: OPENAI_API_KEY,
});

const openAI = new OpenAIApi(configuration);

export const getGoalAdvice = () => {
  console.log({ openAI });
};

export default openAI;
