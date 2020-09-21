import { getRepository } from 'typeorm';
import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
  authId: string;
}

class ListUsersOfSameTeam {
  public async execute({ authId }: Request): Promise<User[] | null> {
    const userRepository = getRepository(User);

    const userAuth = await userRepository.findOne({
      where: {
        id: authId,
      },
    });

    if (!userAuth) {
      throw new AppError('Erro com a autenticação');
    }

    const users = await userRepository.find({
      where: {
        account_id: userAuth.account_id,
        team_id: userAuth.team_id,
      },

      order: {
        permission: 'DESC',
      },
    });

    const usersFiltered = users.filter(user => user.team_id !== null);

    return usersFiltered;
  }
}

export default ListUsersOfSameTeam;
