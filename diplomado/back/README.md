# Backend

El backend del ERP vive en [`apps/api`](../apps/api), que es el paquete oficial del monorepo.

Esta carpeta existe como punto de entrada compatible para equipos o herramientas que esperan encontrar un directorio `back`. No duplica el código de la API: sus scripts delegan en `apps/api`.

## Comandos

Desde la raíz del repositorio:

```bash
pnpm --dir back dev
pnpm --dir back build
pnpm --dir back lint
pnpm --dir back typecheck
pnpm --dir back test
```

La API queda disponible en `apps/api/src`, con rutas, middleware, configuración, conexión a MongoDB, documentación OpenAPI y pruebas.