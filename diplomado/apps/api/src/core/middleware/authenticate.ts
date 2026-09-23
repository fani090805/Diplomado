import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../errors/AppError.js';

export const authenticate = (req: Request, _res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    next(new AppError('UNAUTHORIZED', 'Token requerido.', 401));
    return;
  }

  try {
    const token = authHeader.replace('Bearer ', '');
    const payload = jwt.verify(token, process.env.JWT_SECRET ?? 'development-secret') as { tenantId?: string };
    req.user = { tenantId: payload.tenantId ?? 'tenant-default' } as typeof req.user;
    next();
  } catch {
    next(new AppError('UNAUTHORIZED', 'Token inválido.', 401));
  }
};
