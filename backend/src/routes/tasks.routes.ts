import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import CreateTaskSerivce from '../services/CreateTaskService';
import TasksRepository from '../repositories/TasksRepository';
import CancelTaskService from '../services/CancelTaskService';
import FinishTaskService from '../services/FinishTaskService';

const tasksRouter = Router();

tasksRouter.post('/', async (request, response) => {
  const { name, start, responsible_id } = request.body;
  const createTask = new CreateTaskSerivce();

  const task = await createTask.execute({ responsible_id, name, start });

  return response.json(task);
});

tasksRouter.get('/:user_id', async (request, response) => {
  const { user_id: id } = request.params;

  const tasksRepository = getCustomRepository(TasksRepository);

  const tasks = await tasksRepository.listTasksOrdered(id);

  return response.json(tasks);
});

tasksRouter.put('/', async (request, response) => {
  const { task_id, cancelled_at, cancellation_reason } = request.body;
  const cancelTask = new CancelTaskService();
  const task = await cancelTask.execute({
    task_id,
    cancellation_reason,
    cancelled_at,
  });

  return response.json(task);
});

tasksRouter.patch('/', async (request, response) => {
  const { task_id, end } = request.body;
  const finishTask = new FinishTaskService();
  const task = await finishTask.execute({
    task_id,
    end,
  });

  return response.json(task);
});

export default tasksRouter;
