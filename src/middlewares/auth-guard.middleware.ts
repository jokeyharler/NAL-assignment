import { Request, Response, NextFunction } from "express";
import Jwt from "../utils/Jwt";

const authGuard = async (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    return res.status(401).json({ status: 401, message: 'Unauthenticate' });
  }

  const bearerToken = bearer.split(' ')[1];

  try {
    await Jwt.verify(bearerToken);
  } catch (error) {
    return res.status(401).send(error)
  }

  next();
}

export default authGuard