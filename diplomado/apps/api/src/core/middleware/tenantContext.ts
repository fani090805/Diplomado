import type { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/AppError.js';

export const tenantContext = (req: Request, _res: Response, next: NextFunction): void => {
  const tenantId = req.headers['x-tenant-id'] ?? (req.user as { tenantId?: string } | undefined)?.tenantId;

  if (!tenantId) {
    next(new AppError('TENANT_REQUIRED', 'Se requiere un tenant válido.', 400));
    return;
  }

  req.tenantId = String(tenantId);
  next();
};
