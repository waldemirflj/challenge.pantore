import { Router } from 'express';
import { DataSource } from 'typeorm';
import UserController from './user.controller';
import UserService from './user.service';
import UserRepository from './user.repository';

export const userRoutes = (dataSource: DataSource) => {
  const userRepository = new UserRepository(dataSource);
  const userService = new UserService(userRepository);
  const userController = new UserController(userService);

  return Router()
    .get('/', userController.show.bind(userController))
    .get('/:id', userController.index.bind(userController))
    .post('/', userController.create.bind(userController))
    .put('/:id', userController.update.bind(userController))
    .delete('/:id', userController.delete.bind(userController));
};
