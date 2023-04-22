import express from 'express';
import routers from './routers';
import { initializeDb } from './utils/db';
import { LOCAL_DEV } from './utils/variables';

export const handler = () => {
  console.log("What's up");
};

const app = express();
const port = process.env.PORT ?? 3001;

app.use('/api', routers);

(async () => {
  await initializeDb();

  if (LOCAL_DEV) {
    app.listen(port, async () => {
      console.log(`Listening on http://localhost:${port}`);
    });
  }
})();
