import Bcrypt from 'bcrypt';

class BcryptUtils {
  saltRounds: number;
  constructor() {
    this.saltRounds = 10;
  }

  hash(password: string) {
    return Bcrypt.hash(password, this.saltRounds);
  }

  hashSync(password: string) {
    return Bcrypt.hashSync(password, this.saltRounds);
  }

  compare(password: string, hash: string) {
    return Bcrypt.compare(password, hash);
  }

  compareSync(password: string, hash: string) {
    return Bcrypt.compareSync(password, hash);
  }
}

export default new BcryptUtils();
