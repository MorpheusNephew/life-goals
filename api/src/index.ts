import express from 'express';
import routers from './routers';
import { initializeDb } from './utils/db';

const app = express();
const port = process.env.PORT ?? 3001;

app.use('/api', routers);

app.listen(port, async () => {
  await initializeDb();
  console.log(`Listening on http://localhost:${port}`);
});
