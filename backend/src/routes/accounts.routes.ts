import { Router } from 'express';
import CreateAccountService from '../services/CreateAccountService';

const accountsRouter = Router();

accountsRouter.post('/', async (request, response) => {
  const { accountName, userName, email, password } = request.body;

  const createAccount = new CreateAccountService();
  const { account, user } = await createAccount.execute({
    accountName,
    userName,
    password,
    email,
  });
  delete user.password;

  return response.json({ account, user });
});

export default accountsRouter;
