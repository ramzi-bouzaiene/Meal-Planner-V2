import { AppError } from './AppError'

export class ResourceNotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404)
  }
}
