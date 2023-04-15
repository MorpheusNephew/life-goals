import { randomUUID } from 'crypto';
import { Goal, GoalDto, PostGoalDto, PutGoalDto } from '../../types';

export default class Goals {
  private static list: Goal[] = [];

  static createGoal(goalToCreate: PostGoalDto, creator: string) {
    const createdGoal = new Goal({
      ...goalToCreate,
      createdDate: Date.now().toString(),
      id: randomUUID(),
      creator,
    });

    Goals.list.push(createdGoal);

    return createdGoal;
  }

  static deleteGoal(goalId: string) {
    Goals.list = Goals.list.filter((goal) => goal.id !== goalId);
  }

  static getAllGoals(publicGoals: boolean, creator?: string) {
    return publicGoals
      ? Goals.list.filter((goal) => goal.public).reverse()
      : Goals.list.filter((goal) => goal.creator === creator).reverse();
  }

  static getGoal(goalId: string) {
    return Goals.list.find((goal) => goal.id === goalId);
  }

  static updateGoal(goalId: string, updatedGoalInfo: PutGoalDto) {
    const goalIndex = Goals.list.findIndex((goal) => goal.id === goalId);

    if (goalIndex < 0) {
      throw new Error('Goal not found');
    }

    const currentGoal = Goals.list[goalIndex];

    const updatedGoal = new Goal({ ...currentGoal, ...updatedGoalInfo });

    Goals.list[goalIndex] = updatedGoal;

    return updatedGoal;
  }

  static toResource(goal: Goal): GoalDto {
    return {
      advice: goal.advice,
      createdDate: goal.createdDate,
      id: goal.id,
      text: goal.text,
      public: goal.public,
    };
  }
}