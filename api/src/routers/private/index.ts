import express from 'express';
import privateGoalsRouter from './goals';
import { auth } from 'express-oauth2-jwt-bearer';

const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: process.env.AUTH0_TOKEN_SIGNING_ALG,
});

const privateRouter = express
  .Router()
  .use(jwtCheck)
  .use((req, res, next) => {
    res.locals.userId = req.auth?.payload?.sub;
    next();
  })
  .use('/goals', privateGoalsRouter);

export default privateRouter;
