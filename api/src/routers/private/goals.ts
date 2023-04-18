import express, { Request } from 'express';
import Goals from '../../models/goals';
import { PostGoalDto, PutGoalDto } from '../../types';
import { getGoalAdvice } from '../../utils/openai';

const privateGoalsRouter = express
  .Router()
  .get('/', async (req, res) => {
    res.json(
      (await Goals.getAllGoals(false, req.auth?.payload.sub)).map((goal) =>
        goal.toResource()
      )
    );
  })
  .get('/:goalId', async (req, res) => {
    const currentUser = req.auth?.payload.sub!;
    const goal = await Goals.getGoal(req.params.goalId);

    if (!goal) {
      res.sendStatus(404);
    } else if (goal.creator !== currentUser && !!goal.public) {
      res.sendStatus(403);
    } else {
      res.json(goal.toResource());
    }
  })
  .post('/', async (req: Request<{}, {}, PostGoalDto>, res) => {
    const currentUser = req.auth?.payload.sub!;
    const goalToCreate = req.body;

    const advice = await getGoalAdvice(goalToCreate.text);

    const createdGoal = (
      await Goals.createGoal({ ...goalToCreate, advice }, currentUser)
    ).toResource();

    res.status(201).json(createdGoal);
  })
  .put(
    '/:goalId',
    async (req: Request<{ goalId: string }, {}, PutGoalDto>, res) => {
      const goalId = req.params.goalId;
      const currentUser = req.auth?.payload.sub!;
      const goal = await Goals.getGoal(goalId);
      const updatedGoalInfo = req.body;

      if (!goal) {
        res.sendStatus(404);
      } else if (goal.creator !== currentUser) {
        res.sendStatus(403);
      } else {
        const updatedGoal = (
          await Goals.updateGoal(goalId, {
            ...goal,
            ...updatedGoalInfo,
          })
        ).toResource();

        res.json(updatedGoal);
      }
    }
  )
  .delete('/:goalId', async (req, res) => {
    const goalId = req.params.goalId;
    const currentUser = req.auth?.payload.sub!;
    const goal = await Goals.getGoal(goalId);

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
