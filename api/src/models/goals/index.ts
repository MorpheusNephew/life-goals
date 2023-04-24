import { Goal, GoalDto, PostGoal, PutGoal } from '../../types';
import MongoGoals from './mongodb';

export abstract class IGoals {
  abstract createGoal(goalToCreate: PostGoal, creator: string): Promise<Goal>;

  abstract deleteGoal(goalId: string): Promise<void>;

  abstract getAllGoals(publicGoals: boolean, creator?: string): Promise<Goal[]>;

  abstract getGoal(goalId: string): Promise<Goal | undefined | null>;

  abstract updateGoal(goalId: string, updatedGoalInfo: PutGoal): Promise<Goal>;

  toResource(goal: Goal): GoalDto {
    return {
      advice: goal.advice,
      createdDate: goal.createdDate,
      id: goal.id,
      text: goal.text,
      public: goal.public,
    };
  }
}

const Goals = new MongoGoals();

export default Goals;
