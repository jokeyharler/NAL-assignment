import express from 'express';
import { EventController } from '../controllers/index';
import { createValidator } from 'express-joi-validation';
import { createEvent, updateEvent} from '../validators/event.validator';

const validator = createValidator()

export const eventRoutes = express.Router();

eventRoutes.post('/',validator.body(createEvent), EventController.createEvent);
eventRoutes.get('/',validator.body(updateEvent), EventController.getEvents);
eventRoutes.put('/:id', EventController.updateEvent);
eventRoutes.delete('/:id', EventController.deleteEvent);