import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import CreateTaskSerivce from '../services/CreateTaskService';
import TasksRepository from '../repositories/TasksRepository';

const tasksRouter = Router();

tasksRouter.post('/', async (request, response) => {
  const { name, start, end, responsible_id } = request.body;
  const createTask = new CreateTaskSerivce();

  const task = await createTask.execute({ responsible_id, name, end, start });

  return response.json(task);
});

tasksRouter.get('/:user_id', async (request, response) => {
  const { user_id: id } = request.params;

  const tasksRepository = getCustomRepository(TasksRepository);

  const tasks = await tasksRepository.listTasksOrdered(id);

  return response.json(tasks);
});

export default tasksRouter;
