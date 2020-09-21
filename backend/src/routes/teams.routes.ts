import { Router } from 'express';
import CreateTeamService from '../services/CreateTeamService';
import ListUsersOfSameTeam from '../services/ListUsersOfSameTeam';

const teamsRouter = Router();

teamsRouter.post('/', async (request, response) => {
  const { id } = request.user;
  const { name } = request.body;
  const createTeam = new CreateTeamService();
  const team = await createTeam.execute({ user_id: id, name });

  return response.json(team);
});

teamsRouter.get('/', async (request, response) => {
  const authId = request.user.id;
  const listUsersOfSameTeam = new ListUsersOfSameTeam();

  const users = await listUsersOfSameTeam.execute({ authId });

  return response.json(users);
});
export default teamsRouter;
