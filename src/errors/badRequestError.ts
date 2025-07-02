import { AppError } from './appError';

export default class BadRequestError extends AppError {
  constructor(message = 'Requisição inválida') {
    super(400, message);
    this.name = 'BadRequestError';
  }
}
