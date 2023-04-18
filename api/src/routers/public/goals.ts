import express from 'express';
import Goals from '../../models/goals';

const publicGoalsRouter = express.Router().get('/', async (_req, res) => {
  const goals = (await Goals.getAllGoals(true)).map((goal) =>
    goal.toResource()
  );

  res.json(goals);
});

export default publicGoalsRouter;
