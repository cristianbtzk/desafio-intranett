import { getRepository } from 'typeorm';
import { isBefore } from 'date-fns';
import Task from '../models/Task';
import AppError from '../errors/AppError';

interface Request {
  task_id: string;
  end: Date;
}

class FinishTaskService {
  public async execute({ end, task_id }: Request): Promise<Task> {
    const taskRepository = getRepository(Task);

    const task = await taskRepository.findOne({
      where: {
        id: task_id,
      },
    });

    if (!task) {
      throw new AppError('Tarefa não encontrada');
    }
    const endDate = new Date(end);
    if (isBefore(endDate, task.start)) {
      throw new AppError(
        'A tarefa não pode ser concluída antes de ter começado',
      );
    }

    task.status = 'Concluída';
    task.end = end;

    await taskRepository.save(task);

    return task;
  }
}

export default FinishTaskService;
