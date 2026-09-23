import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/AppError.js';

export const requirePermission = (permission: string) => (req: Request, _res: Response, next: NextFunction): void => {
  const permissions = (req.user as { permissions?: string[] } | undefined)?.permissions ?? [];

  if (!permissions.includes(permission)) {
    next(new AppError('FORBIDDEN', 'No tienes permisos para esta acción.', 403));
    return;
  }

  next();
};
