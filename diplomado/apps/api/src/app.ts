import express, { type Express } from 'express';
import { errorHandler } from './core/errors/errorHandler.js';
import { logger } from './core/logger/index.js';
import { corsMiddleware, helmetMiddleware, rateLimit } from './core/middleware/index.js';
import { healthHandler } from './core/middleware/health.js';
import { openApiDocument } from './docs/openapi.js';

export const app: Express = express();

app.use(helmetMiddleware);
app.use(corsMiddleware);
app.use(express.json());
app.use(rateLimit(100, 60_000));

app.get('/api/v1/health', healthHandler);
app.get('/docs', (_req, res) => {
  res.status(200).json(openApiDocument);
});

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error({ err, url: req.originalUrl }, 'Unhandled API error');
  errorHandler(err, req, res, next);
});
