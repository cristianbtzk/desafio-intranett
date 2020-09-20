import { getRepository } from 'typeorm';
import User from '../models/User';

interface Request {
  id?: string;
}

class ListUsersService {
  public async execute({ id }: Request): Promise<User[]> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: {
        id,
      },
    });

    const usersList = await userRepository.find({
      where: {
        account_id: user?.account_id,
      },
    });

    return usersList;
  }
}

export default ListUsersService;
