
# Backend de Podcast Party

Backend de la PWA Podcast Party para Web Reactiva hecho con Node.js, Express y JavaScript.

## Despliegue

### Despliegue en local

1. Clona el repositorio

```bash
  git clone git@github.com:AdoptaUnJuniorPlatform/GT-PodcastParty.git 
```
2. Navega al directorio del servidor

```bash
cd GT-PodcastParty/server
```
3. Instala las dependencias
```bash
npm install
```
4. Crea un archivo `.env` en la raíz del directorio `server` y añade las siguientes variables de entorno:

```plaintext
MONGO_URI=<direccion_de_tu_DB>
JWT_SECRET=<tu_jwt_secret>
JWT_REFRESH_SECRET=<tu_jwt_refresh_secret>
PORT=<puerto_deseado>
CORS_WHITELIST=<dominios_permitidos>
```
5. Inicia el servidor en modo desarrollo
```bash
npm run dev
```
O en modo producción
```bash
npm start
```

## Referencia de API

### Registrar un nuevo usuario

```http
  POST /auth/register
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. Email del usuario |
| `password`      | `string` | **Required**. Contraseña del usuario |


#### Respuestas

```http
 201 Created
  
{
  "message": "User registered successfully",
  "accessToken": "JWT token",
  "refreshToken": "JWT refresh token"
}

```

```http
 500 Internal Server Error
  
{
  "message": "Mensaje de error"
}
```

### Inicio de sesión

```http
  POST /auth/login
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. Email del usuario |
| `password`      | `string` | **Required**. Contraseña del usuario |


#### Respuestas

```http
 200 OK
  
{
  "message": "Login successful",
  "accessToken": "JWT token",
  "refreshToken": "JWT refresh token"
}

```

```http
 400 Bad Request
  
{
  "message": "Invalid credentials"
}
```

```http
 404 Not Found
  
{
  "message": "User not found"
}
```

```http
 500 Internal Server Error
  
{
  "message": "Mensaje de error"
}
```

### Actualizar JWT token

```http
  POST /auth/refresh-token
```

| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `refreshToken`      | `string` | **Required**. JWT refresh token |


#### Respuestas

```http
 200 OK
  
{
  "accessToken": "New access token",
  "refreshToken": "New refresh token"
}

```

```http
 401 Unauthorized
  
{
  "message": "Refresh token required"
}

```
```http
 403 Forbidden
  
{
  "message": "Invalid refresh token"
}

```
```http
 500 Internal Server Error
  
{
  "message": "Mensaje de error"
}

```

### Cerrar sesión e invalidar el token de refresco

```http
  POST /auth/logout
```

| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `refreshToken`      | `string` | **Required**. JWT refresh token |


#### Respuestas

```http
 200 OK
  
{
  "message": "Logout successful"
}

```

```http
 401 Unauthorized
  
{
  "message": "Refresh token required"
}

```
```http
 403 Forbidden
  
{
  "message": "Invalid refresh token"
}

```
```http
 500 Internal Server Error
  
{
  "message": "Mensaje de error"
}

```

### Recupera episodio por páginas

```http
  GET /episodes
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `page`      | `integer` | `Optional`. Número de página a recuperar (default 1) |

#### Respuestas
```http
 200 OK
  
[
    {
      "title": "Episode Title",
      "link": "http://example.com/episode",
      "pubDate": "2023-10-01T00:00:00Z",
      "content": "Episode content",
      "id": "61641297",
      "duration": "00:30:00",
      "audioInfo": {
        "url": "http://example.com/audio.mp3",
        "length": "12345678",
        "type": "audio/mpeg"
      },
      "image": "http://example.com/image.jpg"
    },
    ...
  ]
```

```http
 404 Not Found
  
{
  "message": "No se encontró el episodio"
}
```

```http
 500 Internal Server Error
  
{
  "message": "Mensaje de error"
}
```

### Recuperar un episodio

```http
  GET /episodes/:id
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. ID numérico del episodio (extraído del GUID del RSS) |

#### Respuestas

```http
 200 OK
  
[
  {
    "title": "Episode title",
    "link": "https://example.com/episode",
    "pubDate": "Wed, 15 Sep 2021 04:00:00 GMT",
    "duration": "1149"
  },
  ...
]
```

```http
404 Not Found

{
  "message": "No se encontró el episodio"
}
```

```http
 500 Internal Server Error
  
{
  "message": "Mensaje de error"
}
```
### Agregar un episodio a favoritos

```http
  POST /fav/:podcastId
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `podcastId`      | `string` | **Required**. ID del episodio a agregar a favoritos |
| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `accessToken`      | `string` | **Required**. JWT access token |


#### Respuestas

```http
200 OK

{
  "message": "Podcast added to favorites successfully"
}
```

```http
400 Bad Request

{
  "message": "Podcast already favorited"
}
```

```http
500 Internal Server Error

{
  "message": "Mensaje de error"
}
```
### Eliminar un episodio de favoritos

```http
  DELETE /fav/:podcastId
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `podcastId`      | `string` | **Required**. ID del episodio a eliminar a favoritos |
| Header | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `accessToken`      | `string` | **Required**. JWT access token |


#### Respuestas

```http
200 OK

{
  "message": "Podcast removed from favorites successfully"
}
```

```http
400 Bad Request

{
  "message": "Podcast not found in favorites"
}
```

```http
500 Internal Server Error

{
  "message": "Mensaje de error"
}
```

### Obtener detalles del usuario

```http
  GET /users
```

#### Respuestas

```http
200 OK

{
  "favorites": ["episode1", "episode2"],
  "lastListened": "episode3"
}
```

```http
404 Not Found

{
  "message": "User not found"
}
```

```http
500 Internal Server Error

{
  "message": "Mensaje de error"
}
```