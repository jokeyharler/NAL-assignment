/* eslint-disable @typescript-eslint/no-explicit-any */
import JWT from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config()

class Jwt {
  secret: string;
  expiresIn: string;
  constructor() {
    this.secret = process.env.JWT_SECRET;
    this.expiresIn = process.env.JWT_EXPIRATION || '7d';
  }

  issue(payload: any, expires?: string) {
    return JWT.sign(payload, this.secret, {
      expiresIn: expires || this.expiresIn,
    });
  }

  verify(token: string) {
    return JWT.verify(token, this.secret);
  }
}

export default new Jwt();
