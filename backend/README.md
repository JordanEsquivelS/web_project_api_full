# Proyecto 13 - web_project_around_express

Esta es una aplicación Express básica que sirve datos relacionados con tarjetas (cards) y usuarios.

## Tecnologías Utilizadas

### Express.js

Framework para Node.js que facilita la creación de aplicaciones web. Utilizado en este proyecto para gestionar endpoints, middlewares y manejo de errores.

### Node.js

Entorno de ejecución que permite correr JavaScript en el servidor. Es la base sobre la que se construye y ejecuta nuestra aplicación Express.

### FS y Path

Módulos integrados en Node.js. `FS` se utiliza para la lectura de archivos, y `Path` para gestionar y resolver rutas de archivos.

### Mongoose

Una librería de modelado de objetos para MongoDB. Facilita la interacción con la base de datos usando JavaScript.

### Bcrypt

Utilizado para el hashing y verificación de contraseñas. Es esencial para la seguridad y autenticación en el back-end.

### JsonWebToken (jsonwebtoken)

Permite la creación y verificación de tokens JWT para autenticación y protección de rutas.

### Celebrate y Joi

Bibliotecas utilizadas para la validación de datos entrantes. Permiten asegurarse de que los datos que se reciben sean coherentes y seguros.

### Cors

Middleware utilizado para habilitar solicitudes cruzadas (Cross-Origin Resource Sharing) y garantizar que la API pueda interactuar de forma segura con otros dominios.

### Winston

Un registrador flexible para Node.js, permite registrar información y errores, facilitando la detección y corrección de problemas.

### Validator

Librería que ofrece strings y validadores, útil para la validación y limpieza de datos.

### Dotenv

Utilizado para cargar variables de entorno desde un archivo .env. Esto ayuda a mantener seguras las claves y configuraciones sensibles, permitiendo que no se expongan directamente en el código.

### ESLint con Configuración Airbnb

Herramienta de linting para identificar y reportar patrones encontrados en código ECMAScript/JavaScript. La configuración de Airbnb es una guía de estilo de código ampliamente aceptada.

### Nodemon

Utilidad que monitorea cambios en archivos y reinicia automáticamente el servidor. Es especialmente útil durante el desarrollo para ver cambios en tiempo real.

## Instalación:

Sigue estos pasos para configurar y ejecutar el proyecto en tu máquina local:

1. **Clonar el repositorio**: Comienza clonando el repositorio de GitHub en tu máquina local utilizando el siguiente comando:

   git clone https://github.com/JordanEsquivelS/web_project_around_express.git

2. **Instalar dependencias**: Abre una terminal en la carpeta raíz del proyecto y ejecuta el siguiente comando para instalar todas las dependencias necesarias:

   npm install

3. **Ejecutar en modo de desarrollo**: Una vez que todas las dependencias estén instaladas, puedes ejecutar el proyecto en modo de desarrollo con el siguiente comando:

   npm start

## Demostración - Endpoints

### Usuarios

- `GET /users` : Devuelve una lista de todos los usuarios.

  ![Solicitud de Usuarios](./demo_images/get_users.png)

- `GET /users/:id` : Devuelve un usuario específico basado en su ID. (Ejemplo Id: `f20c9c560aa652a72cba323f` )

  ![Solicitud de Usuarios según Id](./demo_images/get_users_id.png)

### Tarjetas (Cards)

- `GET /cards` : Devuelve una lista de todas las tarjetas.

  ![Solicitud de Tarjetas](./demo_images/get_cards.png)

- `GET /cards/:cardId` : Devuelve una tarjeta específica basada en su ID. (Ejemplo Id: `5d2090310fdbbf001ffdf72d` )

  ![Solicitud de Tarjetas por id](./demo_images/get_cards_id.png)

## Manejo de Errores

- Si se accede a un recurso no existente, devuelve un error 404 con el mensaje "Recurso solicitado no encontrado".

  ![Error de Usuario](./demo_images/get_no_found.png)

- Si se solicita un usuario con `Id invalido`, devuelve un mensaje de error: ID de usuario no encontrado. (Ejemplo Id: `1212`)

  ![Error id de tarjeta](./demo_images/get_users_id_invalido.png)

- Si se solicita una tarjeta con `Id invalido`, devuelve un mensaje de error: ID de tarjeta no encontrado. (Ejemplo Id: `44444444`)

  ![Error id de tarjeta](./demo_images/get_cards_id_invalido.png)

- En caso de un error del servidor, devuelve un error 500 con el mensaje "¡Algo salió mal!".

## Demostración Video - Servidor

Haz clic en el siguiente enlace para ver la demostración del proyecto en YouTube :

[![Ver Demostración en YouTube](./demo_images/Miniatura_vid.png)](https://youtu.be/4xZyMsrSh4g)
