import { Router } from 'express';
import AddUserToTeamService from '../services/AddUserToTeamService';
import ListUsersWithoutTeam from '../services/ListUsersWithoutTeam';

const teamUsersRouter = Router();

teamUsersRouter.post('/', async (request, response) => {
  const { id } = request.body;
  const authId = request.user.id;
  const addUserToTeam = new AddUserToTeamService();
  const user = await addUserToTeam.execute({ id, authId });

  return response.json(user);
});

teamUsersRouter.get('/', async (request, response) => {
  const authId = request.user.id;
  const listUsersWithoutTeam = new ListUsersWithoutTeam();

  const users = await listUsersWithoutTeam.execute({ authId });

  return response.json(users);
});

export default teamUsersRouter;
