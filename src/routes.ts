import { Router } from 'express';
import { DataSource } from 'typeorm';

import { healthcheckRoutes } from './modules/healthcheck/healthcheck.routes';
import { userRoutes } from './modules/users/user.routes';

export const routes = (dataSource: DataSource): Router => {
  const router = Router();

  router.use('/', healthcheckRoutes(dataSource));
  router.use('/api/v1/users', userRoutes(dataSource));

  return router;
};
