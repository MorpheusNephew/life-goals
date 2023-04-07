import express from 'express';
import goalsRouter from './goals';

const routers = express.Router().use('/goals', goalsRouter);

export default routers;
