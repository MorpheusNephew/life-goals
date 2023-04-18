import express from 'express';
import routers from './routers';
import { initializeDb } from './utils/db';

const app = express();
const port = process.env.PORT ?? 3001;
await initializeDb();

app.use('/api', routers);

app.listen(port, async () => {
  console.log(`Listening on http://localhost:${port}`);
});
