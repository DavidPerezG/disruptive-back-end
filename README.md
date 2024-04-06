# Back End de la Aplicación Disruptive

Este es el repositorio del back end de la aplicación Disruptive, desarrollada como parte de una prueba técnica.

## Variables de Entorno

El back end utiliza las siguientes variables de entorno:

- **MONGODB_URI**: URI de conexión a la base de datos MongoDB.
- **JWT_SECRET**: Clave secreta utilizada para firmar los tokens JWT.
- **PORT**: Puerto en el que se ejecutará el servidor.
- **NODE_ENV**: Entorno de ejecución de la aplicación (development, production, etc.).

Asegúrate de configurar estas variables de entorno adecuadamente antes de ejecutar la aplicación.

## Instalación

1. Clona este repositorio.
2. Ejecuta `npm install` para instalar las dependencias.
3. Configura las variables de entorno en un archivo `.env`.
4. Ejecuta `npm start` para iniciar el servidor en modo de producción, o `npm run dev` para iniciar en modo de desarrollo.

## Dependencias Principales

- [bcrypt](https://www.npmjs.com/package/bcrypt): Para el hashing de contraseñas.
- [cors](https://www.npmjs.com/package/cors): Para permitir solicitudes de recursos de diferentes orígenes.
- [dotenv](https://www.npmjs.com/package/dotenv): Para cargar variables de entorno desde un archivo `.env`.
- [express](https://www.npmjs.com/package/express): Framework web de Node.js.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): Para la generación y verificación de tokens JWT.
- [mongoose](https://www.npmjs.com/package/mongoose): ODM (Object Data Modeling) para MongoDB.
- [morgan](https://www.npmjs.com/package/morgan): Middleware para el registro de solicitudes HTTP.
- [validator](https://www.npmjs.com/package/validator): Para la validación de datos.

## Dependencias de Desarrollo

- [@types/jest](https://www.npmjs.com/package/@types/jest): Tipado para Jest.
- [jest](https://www.npmjs.com/package/jest): Framework de pruebas.
- [nodemon](https://www.npmjs.com/package/nodemon): Utilidad para reiniciar automáticamente el servidor en modo de desarrollo.
- [supertest](https://www.npmjs.com/package/supertest): Biblioteca de aserciones para pruebas HTTP.

## Scripts

- `npm start`: Inicia el servidor en modo de producción.
- `npm run dev`: Inicia el servidor en modo de desarrollo.
- `npm test`: Ejecuta las pruebas unitarias.

## Repositorio del Front End

Puedes encontrar el repositorio del front end de la aplicación Disruptive en [este enlace](https://github.com/DavidPerezG/disruptive-front-end/).
