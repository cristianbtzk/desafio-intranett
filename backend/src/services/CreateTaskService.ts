import { getRepository } from 'typeorm';
import Task from '../models/Task';
import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
  name: string;
  start: Date;
  responsible_id: string;
}

class CreateTaskSerivce {
  public async execute({
    name,
    start,
    responsible_id,
  }: Request): Promise<Task> {
    const taskRepository = getRepository(Task);
    const userRepository = getRepository(User);

    const checkUserExists = await userRepository.findOne({
      where: {
        id: responsible_id,
      },
    });

    if (!checkUserExists) {
      throw new AppError('Usuário não existe');
    }

    const task = await taskRepository.create({
      name,
      start,
      user_id: responsible_id,
      status: 'Em andamento',
    });

    await taskRepository.save(task);

    return task;
  }
}

export default CreateTaskSerivce;
