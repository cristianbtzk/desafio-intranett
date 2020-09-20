import { getRepository } from 'typeorm';
import Task from '../models/Task';
import AppError from '../errors/AppError';

interface Request {
  task_id: string;
  cancellation_reason: string;
  cancelled_at: Date;
}

class CancelTaskService {
  public async execute({
    cancelled_at,
    cancellation_reason,
    task_id,
  }: Request): Promise<Task> {
    const taskRepository = getRepository(Task);

    const task = await taskRepository.findOne({
      where: {
        id: task_id,
      },
    });

    if (!task) {
      throw new AppError('Tarefa não encontrada');
    }

    task.cancelled_at = cancelled_at;
    task.cancellation_reason = cancellation_reason;
    task.status = 'Cancelada';

    await taskRepository.save(task);

    return task;
  }
}

export default CancelTaskService;
