import express from 'express';

const publicGoalsRouter = express.Router().get('/', (_req, res) => {
  res.send('Public Goals Router');
});

export default publicGoalsRouter;
