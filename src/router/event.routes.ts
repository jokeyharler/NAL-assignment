import express from 'express';
import { EventController } from '../controllers/index';
import { createValidator } from 'express-joi-validation';
import { createEvent, updateEvent} from '../validators/event.validator';
import authGuard from '../middlewares/auth-guard.middleware';

const validator = createValidator()

export const eventRoutes = express.Router();

eventRoutes.post('/', authGuard, validator.body(createEvent), EventController.createEvent);
eventRoutes.get('/', authGuard, validator.body(updateEvent), EventController.getEvents);
eventRoutes.put('/:id', authGuard, EventController.updateEvent);
eventRoutes.delete('/:id', authGuard, EventController.deleteEvent);