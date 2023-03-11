import { NextFunction, Request, Response } from 'express';
import { eventServices } from '../services/index';

export const createEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.body)
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


/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       name: 'Authorization'
 *       in: 'header'
 *       bearerFormat: 'JWT'
 *   schemas:
 *     event:
 *       type: object
 *       required:
 *       properties:
 *         eventName:
 *           type: string
 *           description: event name
 *         description:
 *           type: string
 *           description: description
 *         startDate:
 *           type: string
 *           description: start date
 *         dueDate:
 *           type: string
 *           description: due date
 *       example:
 *           eventName: new event
 *           description: description
 *           startDate: yyyy-mm-dd
 *           dueDate: yyyy-mm-dd
 */

/**
 * @swagger
 * /api/v1/events:
 *   post:
 *     security: 
 *        - BearerAuth: []
 *     summary: Create a new event
 *     tags: [events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/event'
 *     responses:
 *       200:
 *         description: The event was successfully created
 *       400:
 *         description: Bad request
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/v1/events:
 *   get:
 *     summary: Returns the list of events
 *     tags: [events]
 *     security: 
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The numbers of events to return
 *       - in: query
 *         name: sortKey
 *         schema:
 *           type: string
 *           enum: [eventName, description, startDate, dueDate]
 *         description: The property which you want to sort
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: The sorting order
 *     responses:
 *       200:
 *         description: The list of the events
 */

/**
 * @swagger
 * /api/v1/events/{id}:
 *   put:
 *     security: 
 *        - BearerAuth: []
 *     summary: Update event
 *     tags: [events]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The event id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/event'
 *     responses:
 *       200:
 *         description: The event was successfully updated
 *       400:
 *         description: Bad request
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/v1/events/{id}:
 *   delete:
 *     security: 
 *        - BearerAuth: []
 *     summary: Delete event
 *     tags: [events]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The event id
 *     responses:
 *       200:
 *         description: The event was successfully deleted
 *       400:
 *         description: Bad request
 *       500:
 *         description: Some server error
 */