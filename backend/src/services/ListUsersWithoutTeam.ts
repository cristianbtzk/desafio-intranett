import { getRepository } from 'typeorm';
import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
  authId: string;
}

class ListUsersWithoutTeam {
  public async execute({ authId }: Request): Promise<User[]> {
    const userRepository = getRepository(User);

    const userAuth = await userRepository.findOne({
      where: {
        id: authId,
      },
    });

    if (!userAuth || userAuth.permission !== 'Gestor') {
      throw new AppError('Você não tem permissão para fazer isso');
    }

    const users = await userRepository.find({
      where: {
        account_id: userAuth.account_id,
        team_id: null,
      },
    });

    return users;
  }
}

export default ListUsersWithoutTeam;
