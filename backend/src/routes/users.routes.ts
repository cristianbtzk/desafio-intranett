import { Router } from 'express';
import CreateUserService from '../services/CreateUserSevice';
import ListUsersService from '../services/ListUsersService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { name, email, password, permission } = request.body;
  const { id } = request.user;

  const createUser = new CreateUserService();
  const user = await createUser.execute({
    name,
    email,
    password,
    permission,
    id,
  });

  delete user.password;

  return response.json(user);
});

usersRouter.get('/', async (request, response) => {
  const listUsers = new ListUsersService();
  const id = request.headers.authorization;

  const users = await listUsers.execute({ id });

  return response.json(users);
});

export default usersRouter;
