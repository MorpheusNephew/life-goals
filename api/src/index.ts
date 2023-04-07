import express from 'express';
import routers from './routers';

const app = express();
const port = process.env.PORT ?? 30001;

app.use('/api', routers);

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
