import express from 'express';
import { ManagementClient } from 'auth0';
import {
  AUTH0_MANAGEMENT_CLIENT_ID,
  AUTH0_MANAGEMENT_CLIENT_SECRET,
  AUTH0_MANAGEMENT_DOMAIN,
} from '../../utils/variables';

const usersRouter = express.Router().get('/me', async (req, res) => {
  const auth0Management = new ManagementClient({
    domain: AUTH0_MANAGEMENT_DOMAIN,
    clientId: AUTH0_MANAGEMENT_CLIENT_ID,
    clientSecret: AUTH0_MANAGEMENT_CLIENT_SECRET,
  });

  const userInfo = await auth0Management.getUser({
    id: req.auth?.payload.sub!,
  });

  res.json(userInfo);;
});

export default usersRouter;
