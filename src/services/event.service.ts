import Event from '../models/event.model';
import createEventDto from '../dtos/create-event.dto';
import updateEventDto from '../dtos/update-event.dto';

export const createEvent = async (payload: createEventDto) => {
  const event = await Event.create(payload);
  return { status: 200, event }
}

export const getEvents = async () => {
  const events = await Event.find();
  return { status: 200, events };
}

export const updateEvent = async (eventId: string, payload: updateEventDto) => {
  let event = await Event.findById(eventId);

  if (!event) {
    return { status: 400, message: 'Event not exist' };
  }

  event = await Event.findByIdAndUpdate(eventId, payload, { new: true });
  
  return { status: 200, event }
}

export const deleteEvent = async (eventId: string) => {
  const event = await Event.findById(eventId);

  if (!event) {
    return { status: 400, message: 'Event not exist' };
  }

  await Event.findByIdAndDelete(eventId);

  return { status: 200, message: 'Delete succeed' };
}


