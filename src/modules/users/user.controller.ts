import { Request, Response } from 'express';

import { AppError } from '../../errors/appError';
import { instanceToPlain } from 'class-transformer';
import UserService from './user.service';

export default class UserController {
  constructor(private readonly userService: UserService) {}

  show = async (req: Request, res: Response): Promise<any> => {
    try {
      const users = await this.userService.show();
      const data = instanceToPlain(users);

      return res.status(200).json(data);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          error: error.message,
        });
      }

      return res.status(500).json({
        error: 'Erro interno no servidor',
      });
    }
  };

  index = async (req: Request, res: Response): Promise<any> => {
    try {
      const users = await this.userService.index({ id: Number(req.params.id) });
      const data = instanceToPlain(users);

      return res.status(200).json([data]);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          error: error.message,
        });
      }

      return res.status(500).json({
        error: 'Erro interno no servidor',
      });
    }
  };

  create = async (req: Request, res: Response): Promise<any> => {
    try {
      const user = await this.userService.create(req.body);
      const data = instanceToPlain(user);

      return res.status(201).json(data);
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          error: error.message,
        });
      }

      return res.status(500).json({
        error: 'Erro interno no servidor',
      });
    }
  };

  update = async (req: Request, res: Response): Promise<any> => {
    try {
      await this.userService.update(Number(req.params.id), req.body);
      return res.status(200).end();
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          error: error.message,
        });
      }

      return res.status(500).json({
        error: 'Erro interno no servidor',
      });
    }
  };

  delete = async (req: Request, res: Response): Promise<any> => {
    try {
      await this.userService.delete(Number(req.params.id));
      return res.status(200).end();
    } catch (error) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({
          error: error.message,
        });
      }

      return res.status(500).json({
        error: 'Erro interno no servidor',
      });
    }
  };
}
