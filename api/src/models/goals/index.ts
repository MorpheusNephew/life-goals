import { Goal, GoalDto, PostGoal, PutGoal } from '../../types';
import MongoGoals from './mongodb';

export interface IGoals {
  createGoal(goalToCreate: PostGoal, creator: string): Promise<Goal>;

  deleteGoal(goalId: string): Promise<void>;

  getAllGoals(publicGoals: boolean, creator?: string): Promise<Goal[]>;

  getGoal(goalId: string): Promise<Goal | undefined | null>;

  updateGoal(goalId: string, updatedGoalInfo: PutGoal): Promise<Goal>;

  toResource(goal: Goal): GoalDto;
}

const Goals = new MongoGoals();

export default Goals;
