import { Router } from 'express';

import UserController from './user.controller';
import UserService from './user.service';
import UserRepository from './user.repository';
import { AppDataSource } from '../../config/datasource';

const userRepository = new UserRepository(AppDataSource);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

export default Router()
  .get('/', userController.show.bind(userController))
  .get('/:id', userController.index.bind(userController))
  .post('/', userController.create.bind(userController))
  .put('/:id', userController.update.bind(userController))
  .delete('/:id', userController.delete.bind(userController));
