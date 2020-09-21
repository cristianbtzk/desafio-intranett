import { getRepository } from 'typeorm';
import User from '../models/User';
import AppError from '../errors/AppError';
import Team from '../models/Team';

interface Request {
  user_id: string;
  name: string;
}

class CreateTeamService {
  public async execute({ user_id, name }: Request): Promise<Team> {
    const userRepository = getRepository(User);
    const teamRepository = getRepository(Team);
    const user = await userRepository.findOne({
      where: {
        id: user_id,
      },
    });

    if (user?.permission !== 'Gestor') {
      throw new AppError('Apenas gestores podem criar uma equipe.');
    }

    const team = await teamRepository.create({
      name,
    });

    await teamRepository.save(team);

    user.team_id = team.id;

    await userRepository.save(user);

    return team;
  }
}

export default CreateTeamService;
