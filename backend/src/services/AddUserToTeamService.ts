import { getRepository } from 'typeorm';
import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
  id: string;
  authId: string;
}

class AddUserToTeamService {
  public async execute({ id, authId }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const authUser = await userRepository.findOne({
      where: {
        id: authId,
      },
    });

    if (!authUser) {
      throw new AppError('Acesso negado');
    }

    if (authUser.permission !== 'Gestor') {
      throw new AppError('Você não tem permissão para isso');
    }

    const user = await userRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new AppError('Usuário não encontrado');
    }

    if (user.permission === 'Gestor') {
      throw new AppError('Apenas um gestor é permitido por equipe');
    }

    user.team_id = authUser.team_id;

    await userRepository.save(user);

    return user;
  }
}

export default AddUserToTeamService;
