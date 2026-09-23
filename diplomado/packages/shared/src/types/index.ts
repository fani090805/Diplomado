import type { fiscalRegimes } from '../constants/index.js';

export type FiscalRegimeCode = (typeof fiscalRegimes)[keyof typeof fiscalRegimes];

export type LoginInput = {
  email: string;
  password: string;
};

export type User = {
  id: string;
  email: string;
  name: string;
  tenantId: string;
  companyId: string | null;
};

export type Company = {
  id: string;
  name: string;
  rfc: string;
  fiscalRegime: FiscalRegimeCode;
};

export type Role = {
  id: string;
  name: string;
  permissions: string[];
};

export type Settings = {
  key: string;
  value: unknown;
};
