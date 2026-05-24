# Prompt — Mi Galería (favoritos)

**Herramienta:** Cursor (Agent)  
**Fecha:** 2026-05-24  
**Contexto:** Proyecto Patitas (React + Vite). Ya existían Home con Dog CEO API, favoritos en LocalStorage (`galleryStorage.js`), corazón en `DogCard` y contador en el header.

## Prompt enviado

Según lo que tengo ya hecho en el repositorio, implementá la vista "Mi Galería" igual que el mockup (estado vacío: título "Tu Galería Personal", mensaje sin favoritos, corazón grande y botón "Ver Perritos"). En la pantalla principal debe poder darse like a los perros con el corazón de cada tarjeta. En la galería debe mostrarse la misma grilla de favoritos y, al hacer clic otra vez en el corazón, quitarse de favoritos y desaparecer de la vista. Los nombres de componentes, funciones y archivos en inglés; textos de la UI en español según el mockup. Reutilizá lo existente (`App.jsx`, `DogCard`, `galleryStorage`) sin rehacer la lógica de persistencia.

## Resultado

- `GalleryView.jsx` — título, empty state o grilla de favoritos.
- `GalleryEmptyState.jsx` — estado vacío + enlace a home.
- `AppRouter.jsx` — pasa `favoriteUrls` y `onToggleFavorite` a la galería.
- Estilos en `patitas.css` para el empty state.
- Mismo `onToggleFavorite` en home y galería; contador del header sincronizado.
