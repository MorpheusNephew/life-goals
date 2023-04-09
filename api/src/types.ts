export interface GoalDto {
  id: string;
  createdDate: string;
  text: string;
  advice: string;
  public?: boolean;
}

export type PostGoalDto = Omit<GoalDto, 'id' | 'createdDate'>;
export type PutGoalDto = PostGoalDto;

export class Goal {
  id: string;
  createdDate: string;
  text: string;
  advice: string;
  public?: boolean;
  creator: string;

  constructor(goal: {
    id: string;
    createdDate: string;
    text: string;
    advice: string;
    public?: boolean;
    creator: string;
  }) {
    this.id = goal.id;
    this.advice = goal.advice;
    this.createdDate = goal.createdDate;
    this.text = goal.text;
    this.creator = goal.creator;
    this.public = goal.public;
  }

  toResource(): GoalDto {
    return {
      advice: this.advice,
      createdDate: this.createdDate,
      id: this.id,
      text: this.text,
      public: this.public,
    };
  }
}
