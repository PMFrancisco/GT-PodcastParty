
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

### Recuperar un episodio

```http
  GET /episodes/:pubDate
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `pubDate`      | `string` | **Required**. Fecha de publicación del episodio (en el formato exacto como aparece en los datos) |

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