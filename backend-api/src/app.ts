import Fastify from 'fastify';
import cors from '@fastify/cors';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { errorHandler } from 'utils/errorHandler';
import mongoosePlugin from 'plugins/mongoose';
import solutionRoutes from 'routes/solution';
import authRoutes from 'routes/auth';
import { rateLimiter } from 'utils/rateLimiter';

dotenv.config({
  path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../.env'),
});

const app = Fastify();
app.setErrorHandler(errorHandler);

await app.register(mongoosePlugin);
await app.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
});

app.addHook('preHandler', rateLimiter);

await app.register(solutionRoutes, { prefix: '/solutions' });
await app.register(authRoutes, { prefix: '/auth' });

export default app;
