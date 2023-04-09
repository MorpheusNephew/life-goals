import express from 'express';
import publicRouter from './public';
import privateRouter from './private';
import bodyParser from 'body-parser';

const routers = express
  .Router()
  .use(bodyParser.json())
  .use('/public', publicRouter)
  .use('/private', privateRouter);

export default routers;
