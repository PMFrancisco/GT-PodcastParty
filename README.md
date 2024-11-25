# Web Reactiva PWA

¡Bienvenido a **Web Reactiva**! Esta es una Progressive Web App (PWA) creada con **Vite** y **React**. Este proyecto está diseñado para visualizar los episodios de Web Reactiva, crear un usuario, poder añadir favoritos y consultar el historial de últimos capítulos escuchados.

## Colaboradores

🌟[](https://www.linkedin.com/in/ACoAAEiBQ8gB68uihg-rYIFOmXGLq170hfaZNd0)[Francisco Pérez](https://www.linkedin.com/in/franciscopm/)  en backend  
✨  [](https://www.linkedin.com/in/ACoAAEdoIBgBESTlvgvbJAEOZEZfY8CsZVVNVx4)[Kevin Revelo Flores](https://www.linkedin.com/in/kevin-revelo-flores-820262295/)  y  [](https://www.linkedin.com/in/ACoAACWiNLYB11gZvOd98hYeWOOB85y2OW7tRmY)[Sara Monzón Quesada](https://www.linkedin.com/in/sara-monzon-quesada/)  en frontend  
🛠️ [BelénSuarez](https://www.linkedin.com/in/belen-suarez-42a4331b5/) en control de calidad  
🎨 @Clari y María Marenco en UX/UI

## Características

- ⚡️ **Vite**: Compilación ultrarrápida y un entorno de desarrollo moderno.
- ⚛️ **React**: Una biblioteca para construir interfaces de usuario interactivas.

---

## Requisitos Previos

- [Node.js](https://nodejs.org/) v16 o superior.
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/).

---

## Instalación

Clona el repositorio y luego instala las dependencias en las carpetas correspondientes:

[Ver readme de la parte Cliente](https://github.com/AdoptaUnJuniorPlatform/GT-PodcastParty/blob/main/server/README.md)

[Ver readme de la parte Server](https://github.com/AdoptaUnJuniorPlatform/GT-PodcastParty/blob/main/client/README.md)

## Funcionalidades PWA

Esta aplicación está configurada como PWA con soporte para:

-   **Service Workers**: Configurados usando `vite-plugin-pwa`.
-   **Manifest.json**: Archivo de configuración para permitir la instalación de la aplicación.

## Estructura del Proyecto

web-reactiva/
├── public/             # Archivos públicos estáticos (favicon, manifest, etc.)
├── src/
│   ├── assets/         # Recursos como imágenes o estilos
│   ├── components/     # Componentes reutilizables de React
│   ├── pages/          # Vistas o páginas principales
 │	  ├── services/          # Conexión con la base de datos
 │	  ├── utils/          # Funciones reutilizables
│   ├── App.jsx         # Componente principal de React
│   ├── main.jsx        # Entrada principal de la aplicación
├── index.html          # Archivo HTML principal
├── vite.config.js      # Configuración de Vite
├── package.json        # Dependencias y scripts del proyecto
└── README.md           # Documentación del proyecto

¡Gracias por usar **Web Reactiva PWA**!