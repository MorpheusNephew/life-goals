import express, { Request } from 'express';
import Goals from '../../models/goals';
import { Goal, PostGoalDto, PutGoalDto } from '../../types';
import { getGoalAdvice } from '../../clients/openai';
import { randomUUID } from 'crypto';

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
    const goalInfo = req.body;

    const advice = await getGoalAdvice(goalInfo.text);

    const goalToCrate = new Goal({
      ...goalInfo,
      advice,
      creator: currentUser,
      id: randomUUID(),
      createdDate: new Date(),
    });

    const createdGoal = await Goals.createGoal(goalToCrate);

    res.status(201).json(createdGoal.toResource());
  })
  .put(
    '/:goalId',
    async (req: Request<{ goalId: string }, {}, PutGoalDto>, res) => {
      const goalId = req.params.goalId;
      const currentUser = req.auth?.payload.sub!;
      const goal = await Goals.getGoal(goalId);
      const updatedGoalInfo = req.body;

      let updatedGoal: Goal;

      if (!goal) {
        res.sendStatus(404);
      } else if (goal.creator !== currentUser) {
        res.sendStatus(403);
      } else {
        updatedGoal = new Goal({ ...goal, ...updatedGoalInfo });
        await Goals.updateGoal(goalId, updatedGoal);

        res.json(updatedGoal.toResource());
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
