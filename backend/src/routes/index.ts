import { Router } from 'express';
import usersRouter from './users.routes';
import accountsRouter from './accounts.routes';
import tasksRouter from './tasks.routes';
import sessionsRouter from './sessions.routes';
import verifyAuthenticated from '../middlewares/verifyAuthenticated';

const routes = Router();

routes.use('/accounts', accountsRouter);
routes.use('/sessions', sessionsRouter);

routes.use(verifyAuthenticated);
routes.use('/users', usersRouter);
routes.use('/tasks', tasksRouter);
export default routes;
