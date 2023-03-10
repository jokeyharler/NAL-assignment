import express from 'express';
import { EventController } from '../controllers/index';
import { createValidator } from 'express-joi-validation';
import { createEvent, updateEvent, eventQuery } from '../validators/event.validator';
import authGuard from '../middlewares/auth-guard.middleware';

const validator = createValidator()

export const eventRoutes = express.Router();

eventRoutes.post('/', authGuard, validator.body(createEvent), EventController.createEvent);
eventRoutes.get('/', authGuard, validator.query(eventQuery), EventController.getEvents);
eventRoutes.put('/:id', authGuard, validator.body(updateEvent),EventController.updateEvent);
eventRoutes.delete('/:id', authGuard, EventController.deleteEvent);