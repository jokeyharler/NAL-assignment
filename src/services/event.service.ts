import Event from '../models/event.model';
import createEventDto from '../dtos/create-event.dto';
import updateEventDto from '../dtos/update-event.dto';

export const createEvent = async (payload: createEventDto) => {
  const event = await Event.create(payload);
  
  if (new Date(payload.dueDate) < new Date(payload.startDate)) {
    return { status: 400, message: 'the due date must be greater than the start date' }
  }

  return { status: 200, event }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getEvents = async (query: any) => {
  const limit: number = query.limit ? query.limit : 5;
  const page: number = query.page ? query.page : 1;
  const sortKey: string = query.sortKey ? query.sortKey : 'startDate';
  const order = query.sortOrder ? query.sortOrder : 'desc';

  const events = await Event.find().limit(limit).skip((page - 1) * limit).sort([[sortKey, order]]);
  const count = await Event.count();
  
  return { status: 200, events, totalPages: Math.ceil(count / limit), page };
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


