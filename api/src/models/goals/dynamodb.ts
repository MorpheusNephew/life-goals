import { Item } from 'dynamoose/dist/Item';
import dynamoose from 'dynamoose';
import { IGoals } from '.';
import { PostGoal, Goal, GoalDto } from '../../types';
import { GOALS_DB_NAME } from '../../utils/variables';
import { randomUUID } from 'crypto';

class GoalItem extends Item {
  id!: string;
  text!: string;
  advice!: string;
  createdDate!: Date;
  public!: boolean;
  publicDate: Date | undefined;
  creator!: string;

  toGoal(): Goal {
    return new Goal(this);
  }
}

const GoalModel = dynamoose.model<GoalItem>(GOALS_DB_NAME, {
  id: String,
  text: String,
  advice: String,
  createdDate: Date,
  public: Boolean,
  publicDate: Date,
  creator: String,
});

export default class DynamoGoals implements IGoals {
  async createGoal(goalToCreate: Goal): Promise<Goal> {
    const createdGoal = await GoalModel.create({
      ...goalToCreate,
    });

    return createdGoal.toGoal();
  }

  async deleteGoal(goalId: string): Promise<void> {}

  async getAllGoals(
    publicGoals: boolean,
    creator?: string | undefined
  ): Promise<Goal[]> {
    throw new Error('Method not implemented.');
  }

  async getGoal(goalId: string): Promise<Goal | null | undefined> {
    throw new Error('Method not implemented.');
  }

  async updateGoal(goalId: string, updatedGoalInfo: Goal): Promise<Goal> {
    throw new Error('Method not implemented.');
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
