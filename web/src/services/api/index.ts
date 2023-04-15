import { GetTokenSilentlyOptions } from '@auth0/auth0-react';
import { GoalDto, PostGoalDto, PutGoalDto } from './types';

const API_BASE = '/api';
const PUBLIC_GOALS_API_BASE = `${API_BASE}/public/goals`;
const PRIVATE_GOALS_API_BASE = `${API_BASE}/private/goals`;

export const getAllPublicGoals = async (): Promise<GoalDto[]> => {
  return (await fetch(PUBLIC_GOALS_API_BASE)).json();
};

type GetAccessTokenSilentlyFunction = (
  options: GetTokenSilentlyOptions
) => Promise<string>;

const getRequestOptions = async (
  getAccessTokenSilently: GetAccessTokenSilentlyFunction
) => {
  const accessToken = await getAccessTokenSilently({
    authorizationParams: {
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    },
  });

  const requestOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return requestOptions;
};

export const getUserGoal =
  (getAccessTokenSilently: GetAccessTokenSilentlyFunction) =>
  async (goalId: string): Promise<GoalDto> => {
    const requestOptions = await getRequestOptions(getAccessTokenSilently);

    return (
      await fetch(`${PRIVATE_GOALS_API_BASE}/${goalId}`, requestOptions)
    ).json();
  };

export const getUserGoals =
  (getAccessTokenSilently: GetAccessTokenSilentlyFunction) =>
  async (): Promise<GoalDto[]> => {
    const requestOptons = await getRequestOptions(getAccessTokenSilently);

    return (await fetch(PRIVATE_GOALS_API_BASE, requestOptons)).json();
  };

export const createUserGoal =
  (getAccessTokenSilently: GetAccessTokenSilentlyFunction) =>
  async (goalToCreate: PostGoalDto): Promise<GoalDto> => {
    const requestOptions = await getRequestOptions(getAccessTokenSilently);

    return (
      await fetch(PRIVATE_GOALS_API_BASE, {
        ...requestOptions,
        ...{ method: 'POST', body: JSON.stringify(goalToCreate) },
      })
    ).json();
  };

export const updateUserGoal =
  (getAccessTokenSilently: GetAccessTokenSilentlyFunction) =>
  async (goalId: string, goalToUpdate: PutGoalDto): Promise<GoalDto> => {
    const requestOptions = await getRequestOptions(getAccessTokenSilently);

    return (
      await fetch(`${PRIVATE_GOALS_API_BASE}/${goalId}`, {
        ...requestOptions,
        ...{ method: 'PUT', body: JSON.stringify(goalToUpdate) },
      })
    ).json();
  };
