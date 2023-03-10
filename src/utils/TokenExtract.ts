import Jwt from "./Jwt";
import { Request } from "express";

module.exports.tokenExtract = (req: Request) => {
  const bearer = req.headers.authorization;
  const bearerToken = bearer.split(' ')[1];
  const tokenDecoded = Jwt.verify(bearerToken);

  return tokenDecoded;
};