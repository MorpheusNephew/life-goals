import express, { Request } from 'express';
import Goals from '../../models/goals';
import { PostGoalDto, PutGoalDto } from '../../types';

const privateGoalsRouter = express
  .Router()
  .get('/', (req, res) => {
    res.json(
      Goals.getAllGoals(false, req.auth?.payload.sub).map((goal) =>
        goal.toResource()
      )
    );
  })
  .get('/:goalId', (req, res) => {
    const currentUser = req.auth?.payload.sub!;
    const goal = Goals.getGoal(req.params.goalId);

    if (!goal) {
      res.sendStatus(404);
    } else if (goal.creator !== currentUser) {
      res.sendStatus(403);
    } else {
      res.json(goal.toResource());
    }
  })
  .post('/', (req: Request<{}, {}, PostGoalDto>, res) => {
    const currentUser = req.auth?.payload.sub!;
    const goalToCreate = req.body;

    const createdGoal = Goals.createGoal(
      goalToCreate,
      currentUser
    ).toResource();

    res.json(createdGoal);
  })
  .put('/:goalId', (req: Request<{ goalId: string }, {}, PutGoalDto>, res) => {
    const goalId = req.params.goalId;
    const currentUser = req.auth?.payload.sub!;
    const goal = Goals.getGoal(goalId);
    const updatedGoalInfo = req.body;

    if (!goal) {
      res.sendStatus(404);
    } else if (goal.creator !== currentUser) {
      res.sendStatus(403);
    } else {
      const updatedGoal = Goals.updateGoal(
        goalId,
        updatedGoalInfo
      ).toResource();

      res.json(updatedGoal);
    }
  })
  .delete('/:goalId', (req, res) => {
    const goalId = req.params.goalId;
    const currentUser = req.auth?.payload.sub!;
    const goal = Goals.getGoal(goalId);

    if (!goal) {
      res.sendStatus(404);
    } else if (goal.creator !== currentUser) {
      res.sendStatus(403);
    } else {
      Goals.deleteGoal(goalId);
      res.sendStatus(204);
    }
  });

export default privateGoalsRouter;
