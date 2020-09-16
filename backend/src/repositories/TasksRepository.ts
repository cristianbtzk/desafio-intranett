import { EntityRepository, Repository } from 'typeorm';
import Task from '../models/Task';

@EntityRepository(Task)
class TasksRepository extends Repository<Task> {
  public async listTasksOrdered(id: string): Promise<Task[]> {
    const tasks = await this.find({
      where: {
        user_id: id,
      },
      order: {
        status: 'DESC',
      },
    });

    return tasks || null;
  }
}

export default TasksRepository;
