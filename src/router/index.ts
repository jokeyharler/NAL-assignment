import * as express from 'express';
import { authRoutes } from './auth.routes';
import { eventRoutes } from './event.routes';

export const routes = express.Router();

routes.use('/auth', authRoutes);
routes.use('/events', eventRoutes);

