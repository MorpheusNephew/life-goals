import { Goal, GoalDto, PostGoal, PutGoal } from '../../types';
import DiskGoals from './disk';

export interface IGoals {
  createGoal(goalToCreate: PostGoal, creator: string): Promise<Goal>;

  deleteGoal(goalId: string): Promise<void>;

  getAllGoals(publicGoals: boolean, creator?: string): Promise<Goal[]>;

  getGoal(goalId: string): Promise<Goal | undefined>;

  updateGoal(goalId: string, updatedGoalInfo: PutGoal): Promise<Goal>;

  toResource(goal: Goal): GoalDto;
}

const Goals = new DiskGoals();

export default Goals;
