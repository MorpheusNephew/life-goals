import { Item } from 'dynamoose/dist/Item';
import dynamoose from 'dynamoose';
import { IGoals } from '.';
import { PostGoal, Goal, GoalDto } from '../../types';
import { GOALS_DB_NAME } from '../../utils/variables';

class GoalItem extends Item {
  id!: string;
  text!: string;
  advice!: string;
  createdDate!: Date;
  public!: boolean;
  publicDate: Date | undefined;
}

const GoalModel = dynamoose.model<GoalItem>(GOALS_DB_NAME, {
  id: String,
  text: String,
  advice: String,
  createdDate: Date,
  public: Boolean,
  publicDate: Date,
});

export default class DynamoGoals extends IGoals {
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
  getGoal(goalId: string): Promise<Goal | null | undefined> {
    throw new Error('Method not implemented.');
  }
  updateGoal(goalId: string, updatedGoalInfo: PostGoal): Promise<Goal> {
    throw new Error('Method not implemented.');
  }
}
