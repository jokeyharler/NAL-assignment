import express from 'express';
import { AuthController } from '../controllers/index';
import { createValidator } from 'express-joi-validation';
import { authenticate } from '../validators/auth.validator';

const validator = createValidator()

export const authRoutes = express.Router();

authRoutes.post('/register', validator.body(authenticate), AuthController.register);
authRoutes.post('/login', validator.body(authenticate), AuthController.login);


