import { Schema, model } from 'mongoose';
import { IGoals } from '.';
import { PostGoal, Goal, GoalDto } from '../../types';
import { randomUUID } from 'crypto';

const goalSchema = new Schema<Goal>({
  advice: { type: String, required: true },
  createdDate: { type: Date, required: true },
  creator: { type: String, required: true },
  id: { type: String, required: true },
  public: { type: Boolean, required: true },
  text: { type: String, required: true },
});

const GoalModel = model<Goal>('Goal', goalSchema);

export default class MongoGoals implements IGoals {
  async createGoal(goalToCreate: PostGoal, creator: string): Promise<Goal> {
    const goal = new GoalModel({
      ...goalToCreate,
      createdDate: new Date(),
      id: randomUUID(),
      creator,
    });

    await goal.save();

    return new Goal(goal.toObject());
  }

  async deleteGoal(goalId: string): Promise<void> {
    await GoalModel.deleteOne({ id: goalId });
  }

  async getAllGoals(
    publicGoals: boolean,
    creator?: string | undefined
  ): Promise<Goal[]> {
    const findCriteria = publicGoals ? { public: true } : { creator };

    return (await GoalModel.find(findCriteria).sort('-createdDate')).map(
      (goal) => new Goal(goal.toObject())
    );
  }

  async getGoal(goalId: string): Promise<Goal | undefined | null> {
    const goal = await GoalModel.findOne({ id: goalId });

    return goal ? new Goal(goal.toObject()) : goal;
  }

  async updateGoal(goalId: string, updatedGoalInfo: PostGoal): Promise<Goal> {
    const goal = (await GoalModel.findOne({ id: goalId }))?.toObject();

    if (!goal) {
      throw new Error('Goal not found');
    }

    const updatedGoal = await GoalModel.findOneAndUpdate(
      {
        id: goalId,
      },
      { ...goal, ...updatedGoalInfo }
    );

    if (!updatedGoal) {
      throw new Error('Error updating goal');
    }

    return new Goal(updatedGoal.toObject());
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
