import express from 'express';
import publicGoalsRouter from './goals';

const publicRouter = express.Router().use('/goals', publicGoalsRouter);

export default publicRouter;
