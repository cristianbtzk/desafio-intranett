import { Router } from 'express';
import ListTasksOfSameTeamService from '../services/ListTasksOfSameTeamService';

const teamTasksRouter = Router();

teamTasksRouter.get('/:user_id', async (request, response) => {
  const { user_id } = request.params;
  const auth_id = request.user.id;
  const listTasksOfSameTeam = new ListTasksOfSameTeamService();

  const tasks = await listTasksOfSameTeam.execute({ auth_id, user_id });

  return response.json(tasks);
});

export default teamTasksRouter;
