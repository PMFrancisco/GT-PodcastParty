
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
5. Inicia el servidor en modo desarrollo
```bash
npm run dev
```
O en modo producción
```bash
npm start
```

## Referencia de API

### Recupera los 20 últimos episodios

```http
  GET /episodes
```

#### Respuestas
```http
 200 OK
  
[
  {
    "title": "Episode title",
    "link": "https://example.com/episode",
    "pubDate": "Wed, 15 Sep 2021 04:00:00 GMT",
    "id": "61641297",
    "duration": "1149"
  },
  ...
]
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | Título del episodio |
| `link`      | `string` | Enlace al episodio |
| `pubDate`      | `string` | Fecha de publicación del episodio |
| `id`      | `string` | ID numérico del episodio |
| `duration`      | `string` | Longitud del episodio en segundos     |

```http
 404 Not Found
  
{
  "message": "No se encontraron episodios"
}
```

```http
 500 Internal Server Error
  
{
  "message": "Error message"
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
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | Título del episodio |
| `link`      | `string` | Enlace al episodio |
| `pubDate`      | `string` | Fecha de publicación del episodio |
| `duration`      | `string` | Longitud del episodio en segundos     |

```http
 404 Not Found
  
{
  "message": "No se encontraron episodios"
}
```

```http
 500 Internal Server Error
  
{
  "message": "Error message"
}
```

### Registrar un nuevo usuario

```http
  POST /auth/register
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. Email del usuario |
| `password`      | `string` | **Required**. Contraseña del usuario |


#### Respuestas

```http
 201 Created
  
{
  "message": "User registered successfully",
  "token": "JWT token"
}

```

```http
 500 Internal Server Error
  
{
  "message": "Error message"
}
```

### Inicio de sesión

```http
  POST /auth/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. Email del usuario |
| `password`      | `string` | **Required**. Contraseña del usuario |


#### Respuestas

```http
 200 OK
  
{
  "message": "Login successful",
  "token": "JWT token"
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
  "message": "Error message"
}
```

### Acceder a una ruta protegida

```http
  POST /auth/protected
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. Email del usuario |
| `password`      | `string` | **Required**. Contraseña del usuario |


#### Respuestas

```http
 200 OK
  
{
  "message": "You are authorized",
  "user": {
    "email": "user@example.com"
  }
}

```

```http
 401 Unauthorized
  
{
  "message": "Unauthorized"
}
```