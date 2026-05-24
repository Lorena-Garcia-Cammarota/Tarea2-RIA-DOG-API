# Testing y Performance — Patitas (RIA 2026)

Guía para ejecutar pruebas automatizadas y medir performance con Lighthouse en el proyecto **Patitas**.

**Integrantes:** Federico Alonso, Lorena García  
**Consigna:** [`Tarea_2_RIA_2026.md`](Tarea_2_RIA_2026.md) — criterio *Testing y Performance* (unitarios + integración + Lighthouse > 80).

---

## 1. Resumen

| Área | Herramienta | Resultado |
|------|-------------|-----------|
| Tests unitarios e integración | Vitest + Testing Library | **13 tests** en 5 archivos — todos pasan |
| Performance | Lighthouse (Chrome) | **93** (Mobile, build de producción) |
| Accessibility | Lighthouse | **100** |
| Best Practices | Lighthouse | **100** |
| SEO | Lighthouse | **92** |

Evidencias guardadas en el repo:

- Reporte Lighthouse: [`lighthouse-report.report.html`](lighthouse-report.report.html) / [`.json`](lighthouse-report.report.json)
- Capturas para la entrega: [`Informe_Testing_y_Performance.md`](Informe_Testing_y_Performance.md) *(pendiente de armar con screenshots)*

---

## 2. Tests automatizados

### Stack

- **Vitest** — runner de tests (configurado en `vite.config.js`)
- **jsdom** — entorno de navegador simulado
- **@testing-library/react** + **@testing-library/jest-dom** — render y aserciones orientadas al usuario

### Comandos

En Windows, si PowerShell bloquea `npm`, usar `npm.cmd`:

```bash
npm.cmd run test        # modo watch (desarrollo)
npm.cmd run test:run    # una sola corrida (CI / entrega)
```

Salida esperada:

```
Test Files  5 passed (5)
     Tests  13 passed (13)
```

### Archivos de prueba

| Archivo | Tipo | Qué valida |
|---------|------|------------|
| `tests/dogApi.test.js` | Unitario | Fetch a Dog CEO API, catálogo por raza, paginación (`PAGE_SIZE`), mapeo de URLs a fotos |
| `tests/galleryStorage.test.js` | Unitario | Lectura/escritura de favoritos en LocalStorage (`patitas-gallery`) |
| `tests/homeCatalogCache.test.js` | Unitario | Caché de sesión al volver del home desde galería |
| `tests/App.test.jsx` | Unitario | Header muestra el título "Patitas" |
| `tests/App.integration.test.jsx` | Integración | Navegación home → galería; favoritos persisten y se muestran en galería |

### Detalle por suite

**`dogApi`** (7 tests)

- `fetchRandomDogImages` devuelve un arreglo de URLs
- `fetchPhotosForBreed` usa el endpoint de raza
- `fetchBreedImageCatalog` usa el listado completo
- `fetchImageUrlsForBreed` usa aleatorio en "Todos los perros"
- `fetchImageUrlsForBreed` usa catálogo fijo por raza
- `paginateUrls` y `getTotalPages` dividen por páginas de `PAGE_SIZE`
- `urlsToPhotos` arma objetos con `id` igual a la URL

**`galleryStorage`** (2 tests)

- Galería vacía si no hay datos en LocalStorage
- Guardar y eliminar favoritos en LocalStorage

**`homeCatalogCache`** (1 test)

- Guarda y devuelve el catálogo del home entre navegaciones

**`App` — integración** (2 tests)

- Navega de home a galería y muestra el título "Tu Galería Personal"
- Persiste favoritos en LocalStorage y los muestra al entrar a galería

### Mocks

Los tests de API e integración **no llaman a la red real**: se usa `vi.stubGlobal('fetch', ...)` con respuestas simuladas. LocalStorage se limpia en `afterEach` para aislar cada prueba.

---

## 3. Performance con Lighthouse

### Requisito del curso

Lighthouse **Performance > 80** sobre el build de producción (no sobre `npm run dev`).

### Cómo medir (paso a paso)

1. **Generar el build:**

   ```bash
   npm.cmd run build
   ```

2. **Servir la versión de producción:**

   ```bash
   npm.cmd run preview
   ```

   Por defecto Vite expone `http://localhost:4173/`.

3. **Abrir Chrome** en esa URL (idealmente ventana de incógnito, sin extensiones que alteren la medición).

4. **DevTools → Lighthouse** (F12 → pestaña *Lighthouse*):

   - Modo: **Navigation**
   - Categorías: al menos **Performance** (recomendado marcar todas)
   - Dispositivo: **Mobile** (es el perfil usado en el reporte del repo)

5. **Analyze page load** y exportar el reporte (HTML o JSON) a `docs/` si se repite la medición.

> **Nota:** Mobile suele dar mejor puntaje que Desktop porque en pantallas grandes entran más imágenes visibles a la vez (12 en grilla 4×3), lo que impacta LCP y peso de red.

### Resultados registrados (24/05/2026)

Medición sobre `http://localhost:4173/` — perfil **Mobile** (Moto G Power simulado), Lighthouse **13.3.0**.

| Categoría | Puntaje |
|-----------|---------|
| Performance | **93** |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 92 |

Métricas principales (Performance):

| Métrica | Valor |
|---------|-------|
| First Contentful Paint (FCP) | 1.5 s |
| Largest Contentful Paint (LCP) | 3.0 s |
| Total Blocking Time (TBT) | 0 ms |
| Cumulative Layout Shift (CLS) | 0.072 |
| Speed Index | ver reporte HTML |

Reporte completo: [`lighthouse-report.report.html`](lighthouse-report.report.html).

---

## 4. Optimizaciones aplicadas

| Optimización | Dónde | Objetivo |
|--------------|-------|----------|
| `preconnect` + `dns-prefetch` a `dog.ceo` e `images.dog.ceo` | `index.html` | Conexión temprana a la API e imágenes |
| `loading="lazy"` + `decoding="async"` en fotos | `DogCard.jsx` | Diferir carga de imágenes fuera del viewport |
| `width` / `height` + `ratio 1x1` | `DogCard.jsx` | Reservar espacio y reducir CLS |
| Atributo `sizes` responsive | `DogCard.jsx` | Elegir resolución adecuada según ancho de columna |
| Solo **12 imágenes** en home (`HOME_IMAGE_POOL_SIZE`) | `dogApi.js` | Menos peticiones y menos peso inicial |
| Una sola petición por cambio de raza | `dogApi.js` | Evitar fase doble de carga |
| `GalleryView` con `React.lazy` + `Suspense` | `AppRouter.jsx` | Code-splitting de la ruta `/galeria` |
| Chunk `vendor` (React, Router) | `vite.config.js` | Cacheo separado de dependencias |
| Bootstrap vía SCSS parcial | `bootstrap-patitas.scss` | Menos CSS que el bundle completo |
| Caché de sesión del catálogo home | `homeCatalogCache.js` | No refetch al volver de galería |

---

## 5. Evidencias para la entrega

Checklist sugerido (consigna + Apéndice D):

- [ ] Captura de terminal con `npm run test:run` — 13/13 tests OK
- [ ] Captura de Lighthouse Performance **> 80** (Mobile, build + preview)
- [ ] Reporte HTML/JSON en `docs/` *(ya incluido: `lighthouse-report.report.*`)*
- [ ] Informe consolidado con capturas: [`Informe_Testing_y_Performance.md`](Informe_Testing_y_Performance.md)

---

## 6. Referencias

- [Dog CEO API](https://dog.ceo/dog-api/)
- [Vitest](https://vitest.dev/)
- [Testing Library — React](https://testing-library.com/docs/react-testing-library/intro/)
- [Lighthouse — Chrome DevTools](https://developer.chrome.com/docs/lighthouse/overview/)
- Memory bank del proyecto: [`00-memory-bank.md`](../00-memory-bank.md)
