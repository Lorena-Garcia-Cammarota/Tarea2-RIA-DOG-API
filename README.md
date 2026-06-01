# Patitas — Dog Finder (RIA 2026)

Aplicación RIA en React que consume la [Dog CEO API](https://dog.ceo/dog-api/) para explorar fotos por raza y guardar favoritos en LocalStorage.

**Integrantes:** Federico Alonso, Lorena García

## Requisitos

- [Node.js](https://nodejs.org/) LTS (incluye npm)

## Cómo abrir el proyecto (Windows)

El repositorio está dentro de la carpeta del curso RIA. Desde **PowerShell** o **Símbolo del sistema (cmd)**, navegá hasta la carpeta del proyecto (donde están `package.json`, `src/` y este `README.md`).

Si ya estás en la carpeta `RIA`:

```powershell
cd ".\DOG API\"
```

Si partís desde Documentos (ajustá la ruta según dónde clonaron el repo):

```powershell
cd ".\RIA\DOG API\"
```

### Primera vez (instalar dependencias)

```powershell
npm.cmd install
```

### Levantar la aplicación

```powershell
npm.cmd run dev
```

O con el atajo incluido en el repo:

```powershell
.\dev.bat
```

Abrí en el navegador la URL que muestra Vite (por defecto `http://localhost:5173`).

### Windows: `npm` bloqueado en PowerShell

Si ves *"running scripts is disabled on this system"*, Node está instalado pero PowerShell no puede ejecutar `npm.ps1`. **No hace falta reinstalar Node.**

| Solución | Comando |
|----------|---------|
| Recomendada | `npm.cmd run dev` |
| Atajo en el repo | `.\dev.bat` |
| Otra terminal | Abrir **cmd** y usar `npm run dev` |

Para instalar dependencias: `npm.cmd install`.

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción en `dist/` |
| `npm run preview` | Vista previa del build (usar para Lighthouse) |
| `npm run test` | Tests en modo watch |
| `npm run test:run` | Tests unitarios + integración (una vez) |
| `npm run lint` | ESLint |

Guía de **Lighthouse** y evidencias: [`docs/Testing_y_Performance.md`](docs/Testing_y_Performance.md).

## Estructura

```
├── public/assets/      # Íconos (SVG)
├── src/
│   ├── components/     # Header, DogCard, DogGrid, BreedFilter, GalleryEmptyState, …
│   ├── views/          # HomeView, GalleryView
│   ├── services/       # dogApi.js, galleryStorage.js, homeCatalogCache.js
│   ├── router/         # AppRouter (/, /galeria)
│   ├── data/           # breeds.js
│   └── styles/         # patitas.css, bootstrap-patitas.scss
├── tests/
├── docs/               # Mockup, consigna, registro de diseño, reporte Lighthouse
├── prompts/            # Registro de prompts IA (consigna)
├── docker-compose.yml
├── dev.bat
└── 00-memory-bank.md
```

## Rutas de la aplicación

| Ruta | Vista | Descripción |
|------|-------|-------------|
| `/` | HomeView | Grilla de 12 fotos + filtro por raza |
| `/galeria` | GalleryView | Favoritos guardados en LocalStorage |

## Seguridad

Patitas es una aplicación **solo cliente** (React en el navegador). No hay backend propio, base de datos ni usuarios registrados. El perfil de riesgo es bajo, pero estas son las decisiones y limitaciones relevantes:

### Arquitectura

- Toda la lógica corre en el **navegador**; no se envían datos personales a un servidor nuestro.
- Las imágenes se obtienen de la API pública [Dog CEO](https://dog.ceo/dog-api/), que **no requiere API key**.
- No hay autenticación ni sesiones: no se manejan contraseñas ni tokens.

### Datos almacenados

- Los favoritos se guardan en **LocalStorage** del dispositivo, bajo la clave `patitas-gallery` (ver `src/services/galleryStorage.js`).
- Solo se persisten **URLs de imágenes**; no hay datos sensibles (nombre, email, ubicación, etc.).
- Esos datos son **locales al navegador**: cualquier persona con acceso al mismo dispositivo puede verlos o borrarlos desde las herramientas del navegador.
- Si el JSON en LocalStorage está corrupto, la app lo ignora y arranca con galería vacía (manejo defensivo en `getSavedGallery`).

### Repositorio y dependencias

- **No hay credenciales, API keys ni archivos `.env`** en el repositorio.
- Las dependencias se instalan con npm; conviene mantener `npm audit` al día antes de entregas o despliegues.

### Código y buenas prácticas

- React escapa el contenido por defecto al renderizar; no se usa `dangerouslySetInnerHTML` ni `eval`.
- Las entradas del usuario se limitan a filtrar razas y marcar favoritos (URLs ya validadas por la API).
- **ESLint** (`npm run lint`) ayuda a detectar patrones inseguros o errores comunes.

### Despliegue y Lighthouse

- En **desarrollo** la app corre en `http://localhost` (HTTP local, uso esperado).
- En **producción** debe servirse por **HTTPS** para proteger el tráfico y evitar contenido mixto.
- Lighthouse incluye auditorías de buenas prácticas de seguridad (HTTPS, CSP, clickjacking, etc.). Reporte en [`docs/lighthouse-report.report.html`](docs/lighthouse-report.report.html) — categoría *Best Practices* con puntaje **100**.

## Herramientas de IA

- **Cursor (Agent)** — scaffolding inicial, Home + Dog CEO API, Mi Galería (favoritos y empty state). Ver `prompts/`.

## Documentación del curso

- Consigna: [`docs/Tarea_2_RIA_2026.md`](docs/Tarea_2_RIA_2026.md)
- Mockup: [`docs/Documento_de_Mockup.md`](docs/Documento_de_Mockup.md)
- Testing y performance: [`docs/Testing_y_Performance.md`](docs/Testing_y_Performance.md)
- Memory bank: [`00-memory-bank.md`](00-memory-bank.md)
- Video demo: [`Demo Patitas (YouTube)`](https://youtu.be/oVZbhSrRBt8)