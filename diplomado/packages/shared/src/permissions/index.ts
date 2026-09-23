import type { BaseRole } from '../constants/index.js';

export const permissionsCatalog = {
  auth: ['login', 'register', 'refresh', 'logout'],
  users: ['read', 'create', 'update', 'delete'],
  companies: ['read', 'create', 'update', 'delete'],
  tenants: ['read', 'create', 'update', 'delete'],
  settings: ['read', 'write']
} as const;

type PermissionResource = keyof typeof permissionsCatalog;
type PermissionAction = (typeof permissionsCatalog)[PermissionResource][number];
export type Permission = `${PermissionResource}:${PermissionAction}`;
export type RolePermission = Permission | '*';

export const rolePermissions: Record<BaseRole, readonly RolePermission[]> = {
  propietario: ['*'],
  administrador: ['users:read', 'users:create', 'users:update', 'companies:read', 'companies:create', 'companies:update', 'settings:read', 'settings:write'],
  contador: ['companies:read', 'settings:read'],
  vendedor: ['users:read', 'companies:read'],
  comprador: ['companies:read'],
  almacenista: ['companies:read'],
  cajero: ['companies:read'],
  rh: ['users:read'],
  solo_lectura: ['companies:read', 'settings:read']
};

export const hasPermission = (permission: string, userPermissions: readonly string[]): boolean =>
  userPermissions.includes('*') || userPermissions.includes(permission);
