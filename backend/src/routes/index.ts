import { Router } from 'express';
import usersRouter from './users.routes';
import accountsRouter from './accounts.routes';
import tasksRouter from './tasks.routes';
import sessionsRouter from './sessions.routes';
import verifyAuthenticated from '../middlewares/verifyAuthenticated';
import teamsRouter from './teams.routes';
import teamUsersRouter from './teamUsers.routes';
import teamTasksRouter from './teamTasks.routes';

const routes = Router();

routes.use('/accounts', accountsRouter);
routes.use('/sessions', sessionsRouter);

routes.use(verifyAuthenticated);
routes.use('/users', usersRouter);
routes.use('/tasks', tasksRouter);
routes.use('/teams', teamsRouter);
routes.use('/teamsusers', teamUsersRouter);
routes.use('/teamtasks', teamTasksRouter);
export default routes;
