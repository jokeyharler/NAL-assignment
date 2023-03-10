import Bcrypt from '../utils/Bcrypt';
import User from '../models/user.model'
import Jwt from '../utils/Jwt';
import userDto from '../dtos/auth.dto';

export const register = async (payload: userDto) => {
  const checkExist = await User.findOne({ username: payload.username });
  if (checkExist) {
    return { status: 400, message: 'User existed' };
  }

  const hashedPassword = await Bcrypt.hash(payload.password);

  const newUser = await User.create({ username: payload.username, password: hashedPassword });

  return { status: 200, user: newUser }
}

export const login = async (payload: userDto) => {
  const user = await User.findOne({ username: payload.username });

  if (!user) {
    return { status: 400, message: 'User not exist' };
  }

  const compare = await Bcrypt.compare(payload.password, user.password);

  if (!compare) {
    return { status: 400, message: 'Wrong password' }
  }

  const accessToken = await Jwt.issue({ userId: user._id })

  return { status: 200, body: { accessToken, user } }
}