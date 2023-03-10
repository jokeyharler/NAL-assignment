import { NextFunction, Request, Response } from 'express';
import { eventServices } from '../services/index';

export const createEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await eventServices.createEvent(req.body);
    res.status(result.status).send(result);
  } catch (error) {
    next(error);
  }
};

export const getEvents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await eventServices.getEvents(req.query);
    res.status(result.status).send(result);
  } catch (error) {
    next(error);
  }
};

export const updateEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await eventServices.updateEvent(req.params.id, req.body);
    res.status(result.status).send(result);
  } catch (error) {
    next(error);
  }
};

export const deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await eventServices.deleteEvent(req.params.id);
    res.status(result.status).send(result);
  } catch (error) {
    next(error);
  }
};