import type { NextFunction, Request, Response } from 'express';

export const rateLimit = (maxRequests = 100, windowMs = 60_000) => {
  const requests = new Map<string, { count: number; resetAt: number }>();

  return (req: Request, _res: Response, next: NextFunction): void => {
    const key = req.ip ?? 'unknown';
    const now = Date.now();
    const current = requests.get(key);

    if (!current || now > current.resetAt) {
      requests.set(key, { count: 1, resetAt: now + windowMs });
      next();
      return;
    }

    if (current.count >= maxRequests) {
      const error = new Error('Too many requests');
      (error as Error & { status?: number }).status = 429;
      next(error);
      return;
    }

    current.count += 1;
    next();
  };
};
