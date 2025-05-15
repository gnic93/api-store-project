# My Store API

API RESTful para la gestión de una tienda, desarrollada con Node.js, Express, Sequelize y autenticación JWT. Soporta operaciones CRUD para usuarios, productos, categorías, clientes y órdenes, además de autenticación y recuperación de contraseña.

## Características

- CRUD de usuarios, productos, categorías, clientes y órdenes.
- Autenticación con JWT y Passport (estrategias local y JWT).
- Recuperación y cambio de contraseña por email.
- Validación de datos con Joi.
- Manejo de errores centralizado.
- Soporte para bases de datos PostgreSQL y MySQL.
- Configuración lista para despliegue en Vercel y Docker.

## Estructura del proyecto

```
api/
  app.js
  config/
  db/
  libs/
  middlewares/
  routes/
  schemas/
  services/
  utils/
```

## Instalación

1. Clona el repositorio.
2. Instala las dependencias:

   ```sh
   npm install
   ```

3. Copia el archivo `.env.example` a `.env` y completa las variables de entorno necesarias.

4. Ejecuta las migraciones de la base de datos:

   ```sh
   npm run migrations:run
   ```

## Uso

### Desarrollo

```sh
npm run dev
```

### Producción

```sh
npm start
```

La API estará disponible en `http://localhost:3000/api/v1`.

## Endpoints principales

- `POST /api/v1/auth/login` — Login de usuario.
- `POST /api/v1/auth/recovery` — Solicitar recuperación de contraseña.
- `POST /api/v1/auth/change-password` — Cambiar contraseña con token.
- `GET /api/v1/products` — Listar productos.
- `GET /api/v1/categories` — Listar categorías.
- `GET /api/v1/users` — Listar usuarios (requiere rol admin).
- `GET /api/v1/orders` — Listar órdenes (requiere autenticación).
- `GET /api/v1/profile/my-orders` — Ver órdenes del usuario autenticado.

## Variables de entorno

Configura las siguientes variables en tu archivo `.env`:

```
PORT=3000
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_NAME=
DB_PORT=
API_KEY=
JWT_SECRET=
SMTP_EMAIL=
SMTP_PASSWORD=
```

## Docker

Puedes levantar los servicios de base de datos con:

```sh
docker-compose up -d
```

## Despliegue en Vercel

El archivo [`vercel.json`](vercel.json) ya está configurado para desplegar la API en Vercel.

## Licencia

ISC

---

Desarrollado con Node.js, Express y Sequelize.