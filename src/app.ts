import type { ErrorRequestHandler } from 'express';
import express, { Application, NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import createError from 'http-errors';
import status from 'http-status';
import morgan from 'morgan';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import { swaggerOptions } from './constants';
import { routes } from './router';

const app: Application = express();

app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
const specs = swaggerJsDoc(swaggerOptions);

app.use('/api/v1', routes);
app.use('/api/v1/documents', swaggerUI.serve, swaggerUI.setup(specs));

app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(status.BAD_REQUEST, 'API not found'));
});

app.use(((err, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || status.INTERNAL_SERVER_ERROR);
  res.send({
    status: err.status || status.INTERNAL_SERVER_ERROR,
    message: err.message,
  });
}) as ErrorRequestHandler);

export default app;
