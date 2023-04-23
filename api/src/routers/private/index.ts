import express from 'express';
import privateGoalsRouter from './goals';
import { auth } from 'express-oauth2-jwt-bearer';
import {
  AUTH0_AUDIENCE,
  AUTH0_MANAGEMENT_DOMAIN,
  AUTH0_TOKEN_SIGNING_ALG,
} from '../../utils/variables';
import privateUsersRouter from './users';

const jwtCheck = auth({
  audience: AUTH0_AUDIENCE,
  issuerBaseURL: `https://${AUTH0_MANAGEMENT_DOMAIN}/`,
  tokenSigningAlg: AUTH0_TOKEN_SIGNING_ALG,
});

const privateRouter = express
  .Router()
  .use(jwtCheck)
  .use((req, res, next) => {
    res.locals.userId = req.auth?.payload?.sub;
    next();
  })
  .use('/goals', privateGoalsRouter)
  .use('/users', privateUsersRouter);

export default privateRouter;
