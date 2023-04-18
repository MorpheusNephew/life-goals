import { randomUUID } from 'crypto';
import { Goal, GoalDto, PostGoal, PutGoal } from '../../types';
import { IGoals } from './index';

export default class DiskGoals implements IGoals {
  private list: Goal[];

  constructor() {
    this.list = [];
  }

  createGoal(goalToCreate: PostGoal, creator: string): Promise<Goal> {
    const createdGoal = new Goal({
      ...goalToCreate,
      createdDate: new Date(),
      id: randomUUID(),
      creator,
    });

    this.list.push(createdGoal);

    return Promise.resolve(createdGoal);
  }

  deleteGoal(goalId: string): Promise<void> {
    this.list = this.list.filter((goal) => goal.id !== goalId);

    return Promise.resolve();
  }

  getAllGoals(
    publicGoals: boolean,
    creator?: string | undefined
  ): Promise<Goal[]> {
    return Promise.resolve(
      publicGoals
        ? this.list.filter((goal) => goal.public).reverse()
        : this.list.filter((goal) => goal.creator === creator).reverse()
    );
  }

  getGoal(goalId: string): Promise<Goal | undefined> {
    return Promise.resolve(this.list.find((goal) => goal.id === goalId));
  }

  updateGoal(goalId: string, updatedGoalInfo: PostGoal): Promise<Goal> {
    const goalIndex = this.list.findIndex((goal) => goal.id === goalId);

    if (goalIndex < 0) {
      throw new Error('Goal not found');
    }

    const currentGoal = this.list[goalIndex];

    const updatedGoal = new Goal({ ...currentGoal, ...updatedGoalInfo });

    this.list[goalIndex] = updatedGoal;

    return Promise.resolve(updatedGoal);
  }
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
