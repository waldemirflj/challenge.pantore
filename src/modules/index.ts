import { Router } from 'express';

export default Router()
  .use('/', require('./healthcheck/healthcheck.routes').default)
  .use('/api/v1/users', require('./users/user.routes').default);
