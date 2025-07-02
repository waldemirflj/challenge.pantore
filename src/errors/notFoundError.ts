import { AppError } from './appError';

export default class NotFoundError extends AppError {
  constructor(message = 'Recurso não encontrado') {
    super(404, message);
    this.name = 'NotFoundError';
  }
}
