# Memory Bank — Patitas (Dog API / RIA 2026)

## Proyecto

- **App:** Patitas — galería de perros con Dog CEO API.
- **Stack:** React 19 + Vite + React Router + Bootstrap 5 (SCSS parcial en `src/styles/bootstrap-patitas.scss`).
- **Persistencia:** LocalStorage (galería personal — favoritos persisten al cerrar el navegador).
- **Integrantes:** Federico Alonso, Lorena García.

## Rutas

| Ruta | Vista | Descripción |
|------|-------|-------------|
| `/` | HomeView | Grilla + filtro por raza |
| `/galeria` | GalleryView (lazy) | Fotos guardadas |

## Referencias

- Mockup: `docs/Documento_de_Mockup.md`
- Registro de diseño (solo UI/UX): `docs/Registro_Diseno.md`
- Consigna: `docs/Tarea_2_RIA_2026.md`
- Testing y Lighthouse: `docs/Testing_y_Performance.md`

## Estado actual

### Home — imágenes y paginación (`dogApi.js`)

- **Solo 12 imágenes:** `HOME_IMAGE_POOL_SIZE = 12` = `PAGE_SIZE` (fetch, render y grilla 4×3; sin segunda página).
- **Todos los perros:** 12 aleatorias (`/breeds/image/random/12`); cambian al recargar o al volver a esa opción.
- **Cada raza:** catálogo fijo, primeras 12 ordenadas (`takeFixedPool`); mismas fotos en cada visita.
- **Imágenes:** `loading="lazy"`, `width`/`height` 320, `ratio 1x1` (CLS).
- **Carga:** una sola petición por cambio de raza (`fetchImageUrlsForBreed`); sin fase doble 12+48.

### UX / navegación

- **Favoritos:** LocalStorage (`patitas-gallery`); contador en header; persisten entre sesiones del navegador.
- **Caché de sesión:** `homeCatalogCache.js` — al volver de `/galeria` a `/` no se recarga la grilla (solo memoria; no sobrevive cerrar el navegador).
- **Galería:** empty state, grilla, unlike, **Volver al inicio**.
- Layout **responsive** (Bootstrap): 1 / 2 / 3 / **4** columnas; header/footer rosa suave; **Footer** con copyright.

### Performance (Lighthouse)

- Medir con `npm run build` + `npm run preview` (no `dev`).
- **Mobile** suele dar mejor puntaje que **Desktop** (muchas imágenes visibles a la vez en pantalla grande).
- Optimizaciones: preconnect `dog.ceo` / `images.dog.ceo`, `GalleryView` lazy, chunks vendor, imágenes `lazy` + `sizes`, Bootstrap SCSS reducido, Sass `quietDeps` en `vite.config.js`.

### Tests

- Vitest: `npm run test:run` — 13 tests (dogApi, galleryStorage, homeCatalogCache, App, integración).
- Informe: `docs/Informe_Testing_y_Performance.md` (capturas Lighthouse + tests).
