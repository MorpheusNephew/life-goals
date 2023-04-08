import express from 'express';
import privateGoalsRouter from './private/goals';
import publicRouter from './public';
import privateRouter from './private';

const routers = express
  .Router()
  .use('/public', publicRouter)
  .use('/private', privateRouter);

export default routers;
