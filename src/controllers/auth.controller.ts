import { NextFunction, Request, Response } from 'express';
import { authSerivces } from '../services/index';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await authSerivces.register(req.body);
    res.status(result.status).send(result);
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.headers)
    const result = await authSerivces.login(req.body);
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
 *   schemas:
 *     user:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: username
 *         password:
 *           type: string
 *           description: password
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     security: 
 *        - Bearer: []
 *     summary: Create a new user
 *     tags: [auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *     responses:
 *       200:
 *         description: The user was successfully created
 *       400:
 *         description: Bad request
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login with created user
 *     tags: [auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/user'
 *     responses:
 *       200:
 *         description: The user was successfully login
 *       400:
 *         description: Bad request
 *       500:
 *         description: Some server error
 */


