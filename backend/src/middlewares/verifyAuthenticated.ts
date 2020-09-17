import { Request, Response, NextFunction } from 'express';
import CheckUserExistsService from '../services/CheckUserExistsService';
import AppError from '../errors/AppError';

export default async function verifyAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const userId = request.headers.authorization;
  if (!userId) {
    throw new AppError('Token de usuário não encontrado');
  }
  const checkUserExists = new CheckUserExistsService();
  const isAuthenticated = await checkUserExists.execute(userId);

  if (isAuthenticated) {
    request.user = {
      id: userId,
    };
    return next();
  }
  throw new AppError('Problemas com a autenticação');
}
