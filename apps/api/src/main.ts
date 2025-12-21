import * as trpcExpress from '@trpc/server/adapters/express';
import express from 'express';
import { createContext } from './trpc/context';
import { appRouter } from './trpc/router';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3333;

const app = express();

// Middleware
app.use(express.json());

// CORS configuration for Angular app
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

app.use('/trpc', trpcExpress.createExpressMiddleware({ 
  router: appRouter, 
  createContext
}));

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
