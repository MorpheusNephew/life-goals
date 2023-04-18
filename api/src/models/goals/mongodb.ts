import { IGoals } from '.';
import { PostGoal, Goal, GoalDto } from '../../types';

export default class MongoGoals implements IGoals {
  createGoal(goalToCreate: PostGoal, creator: string): Promise<Goal> {
    throw new Error('Method not implemented.');
  }
  deleteGoal(goalId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getAllGoals(
    publicGoals: boolean,
    creator?: string | undefined
  ): Promise<Goal[]> {
    throw new Error('Method not implemented.');
  }
  getGoal(goalId: string): Promise<Goal | undefined> {
    throw new Error('Method not implemented.');
  }
  updateGoal(goalId: string, updatedGoalInfo: PostGoal): Promise<Goal> {
    throw new Error('Method not implemented.');
  }
  toResource(goal: Goal): GoalDto {
    throw new Error('Method not implemented.');
  }
}
