import { getRepository } from 'typeorm';
import Task from '../models/Task';
import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
  auth_id: string;
  user_id: string;
}

class ListTasksOfSameTeamService {
  public async execute({ auth_id, user_id }: Request): Promise<Task[]> {
    const tasksRepository = getRepository(Task);
    const usersRepository = getRepository(User);

    const checkAuth = await usersRepository.findOne({
      where: {
        id: auth_id,
      },
    });

    if (!checkAuth) {
      throw new AppError('Erro com a autenticação');
    }

    if (checkAuth.permission !== 'Gestor') {
      throw new AppError('Você não tem permissão para isso');
    }

    const user = await usersRepository.findOne({
      where: {
        id: user_id,
      },
    });

    if (user?.team_id !== checkAuth.team_id) {
      throw new AppError(
        'Você apenas pode visualizar tarefas de usuários da sua equipe',
      );
    }
    const tasks = await tasksRepository.find({
      where: {
        user_id,
      },
    });

    return tasks || null;
  }
}

export default ListTasksOfSameTeamService;
