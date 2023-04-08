import express from 'express';

const privateGoalsRouter = express.Router().get('/', (_req, res) => {
  res.send('Private Goals Router');
});

export default privateGoalsRouter;
