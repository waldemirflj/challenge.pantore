import { Router, Request, Response } from 'express';
import { DataSource } from 'typeorm';

export const healthcheckRoutes = (dataSource: DataSource) => {
  return Router().get('/', (req: Request, res: Response) => {
    res.json({
      message: 'Welcome.',
    });
  });
};
