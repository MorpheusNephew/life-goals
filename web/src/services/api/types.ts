export interface GoalDto {
  id: string;
  createdDate: string;
  text: string;
  advice: string;
  public?: boolean;
}

export type PostGoalDto = Pick<GoalDto, 'text' | 'public'>;
export type PutGoalDto = PostGoalDto;
