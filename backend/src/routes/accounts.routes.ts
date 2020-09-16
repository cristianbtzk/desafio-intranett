import { Router } from 'express';
import CreateAccountService from '../services/CreateAccountService';

const accountsRouter = Router();

accountsRouter.post('/', async (request, response) => {
  const { accountName, userName, email, password, permission } = request.body;

  const createAccount = new CreateAccountService();
  const { account, user } = await createAccount.execute({
    accountName,
    userName,
    password,
    email,
    permission,
  });

  delete user.password;

  return response.json({ account, user });
});

export default accountsRouter;
