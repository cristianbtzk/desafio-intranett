import { Router } from 'express';
import usersRouter from './users.routes';
import accountsRouter from './accounts.routes';
import tasksRouter from './tasks.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/accounts', accountsRouter);
routes.use('/tasks', tasksRouter);
export default routes;
