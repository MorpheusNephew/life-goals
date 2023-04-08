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
  .use(async (req, _res, next) => {
    console.log({ authorization: req.headers.authorization });
    next();
  })
  .use('/goals', privateGoalsRouter);

export default privateRouter;
