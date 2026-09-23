declare global {
  namespace Express {
    interface Request {
      user?: {
        tenantId?: string;
        permissions?: string[];
      };
      tenantId?: string;
    }
  }
}

export {};
