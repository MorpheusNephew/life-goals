import express from 'express';
import Goals from '../../models/goals';

const publicGoalsRouter = express.Router().get('/', (_req, res) => {
  const goals = Goals.getAllGoals(true).map((goal) => goal.toResource());

  res.json(goals);
});

export default publicGoalsRouter;
