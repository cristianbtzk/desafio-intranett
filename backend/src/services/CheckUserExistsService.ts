import { getRepository } from 'typeorm';
import User from '../models/User';
import AppError from '../errors/AppError';

class CheckUserExistsService {
  public async execute(id: string): Promise<boolean> {
    const usersRepository = getRepository(User);
    try {
      const user = await usersRepository.findOne({
        where: {
          id,
        },
      });
      if (user) {
        return true;
      }
      return false;
    } catch (err) {
      throw new AppError('Problema com ID do usuário');
    }
  }
}

export default CheckUserExistsService;
