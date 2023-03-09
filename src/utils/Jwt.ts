import JWT from 'jsonwebtoken';

class Jwt {
  secret: string;
  expiresIn: string;
  constructor() {
    this.secret = process.env.JWT_SECRET;
    this.expiresIn = process.env.JWT_EXPIRATION || '7d';
  }

  issue(payload: string, expires: string) {
    return JWT.sign(payload, this.secret, {
      expiresIn: expires || this.expiresIn,
    });
  }

  verify(token: string) {
    return JWT.verify(token, this.secret);
  }
}

export default new Jwt();
