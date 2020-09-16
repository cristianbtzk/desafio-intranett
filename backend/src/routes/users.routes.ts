import { Router } from 'express';
import CreateUserService from '../services/CreateUserSevice';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { name, email, password, permission, account_id } = request.body;

  const createUser = new CreateUserService();
  const user = await createUser.execute({
    name,
    email,
    password,
    permission,
    account_id,
  });

  delete user.password;

  return response.json(user);
});

export default usersRouter;
