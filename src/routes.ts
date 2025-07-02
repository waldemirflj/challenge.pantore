import { Router } from 'express';

export const routes = Router().use('/', require('./modules').default);
