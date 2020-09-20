import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
  permission: string;
  id: string;
}

class CreateUserService {
  public async execute({
    id,
    name,
    email,
    password,
    permission,
  }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const manager = await userRepository.findOne({
      where: {
        id,
      },
    });

    const account_id = manager?.account_id;

    const checkEmailExists = await userRepository.findOne({
      where: { email },
    });

    if (checkEmailExists) {
      throw new AppError('O email já foi utilizado');
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
      permission,
      account_id,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
