import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';
import AppError from '../errors/AppError';
import Account from '../models/Account';

interface Request {
  accountName: string;
  userName: string;
  email: string;
  password: string;
}

class CreateAccountService {
  public async execute({
    userName,
    accountName,
    email,
    password,
  }: Request): Promise<{ account: Account; user: User }> {
    const accountRepository = getRepository(Account);

    const account = await accountRepository.create({
      name: accountName,
    });

    await accountRepository.save(account);

    const userRepository = getRepository(User);

    const checkEmailExists = await userRepository.findOne({
      where: { email },
    });

    if (checkEmailExists) {
      throw new AppError('O email já foi utilizado');
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name: userName,
      email,
      password: hashedPassword,
      permission: 'Gestor',
      account_id: account.id,
    });

    await userRepository.save(user);

    return { account, user };
  }
}

export default CreateAccountService;
