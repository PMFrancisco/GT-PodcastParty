
# Frontend de Podcast Party

Frontend de la PWA Podcast Party para Web Reactiva hecho con JavaScript, Vite y React.

## Despliegue

### Despliegue en local

1.  Clona el repositorio
```bash
  git clone git@github.com:AdoptaUnJuniorPlatform/GT-PodcastParty.git 
```
2.  Navega al directorio del cliente
```bash
cd GT-PodcastParty/client
```
3.  Instala las dependencias
```bash
npm install
```
4.  Crea un archivo  `.env`  en la raíz del directorio  `server`  y añade las siguientes variables de entorno:

```
VITE_PORT=<puerto_deseado>
VITE_HOST=<0.0.0.0>
```

5.  Inicia el servidor en modo desarrollo
```bash
npm run dev
```
O en modo producción, primero lanzaremos
```bash
npm run build
```
Para construir la carpeta .dist de archivos estáticos. Y una vez creada la carpeta, lanzaremos
```bash
npm run preview
```
