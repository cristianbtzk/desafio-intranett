import { getRepository } from 'typeorm';
import Task from '../models/Task';

interface Request {
  id: string;
}

class ListOwnTasksService {
  public async execute({ id }: Request): Promise<Task[]> {
    const tasksRepository = getRepository(Task);

    const tasks = await tasksRepository.find({
      where: {
        user_id: id,
      },
    });

    return tasks || null;
  }
}

export default ListOwnTasksService;
