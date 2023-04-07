import express from 'express';

const goalsRouter = express.Router().get('/', (_req, res) => {
  res.send('Goals router');
});

export default goalsRouter;
