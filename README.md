# Patitas — Dog Finder (RIA 2026)

Aplicación RIA en React que consume la [Dog CEO API](https://dog.ceo/dog-api/) para explorar fotos por raza y guardar favoritos en LocalStorage.

## Requisitos

- [Node.js](https://nodejs.org/) LTS (incluye npm)

## Instalación

```bash
npm.cmd install
```

En Windows, si `npm` falla en PowerShell, usa siempre **`npm.cmd`** en lugar de `npm` (ver abajo).

## Desarrollo

```bash
npm.cmd run dev
```

O, en Windows, doble clic o desde la terminal del proyecto:

```bash
.\dev.bat
```

Abrir la URL que muestra Vite (por defecto `http://localhost:5173`).

### Windows: `npm` bloqueado en PowerShell

Si ves *"running scripts is disabled on this system"* al ejecutar `npm`, Node está instalado pero PowerShell no puede ejecutar `npm.ps1`. **No hace falta reinstalar Node.**

| Solución | Comando |
|----------|---------|
| Recomendada | `npm.cmd run dev` |
| Atajo en el repo | `.\dev.bat` |
| Otra terminal | Abrir **Símbolo del sistema (cmd)** y usar `npm run dev` |

Para instalar dependencias: `npm.cmd install`.

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción en `dist/` |
| `npm run preview` | Vista previa del build |
| `npm run test` | Tests en modo watch |
| `npm run test:run` | Tests unitarios + integración (una vez) |
| `npm run lint` | ESLint |

Guía de **Lighthouse** y evidencias: [`docs/Testing_y_Performance.md`](docs/Testing_y_Performance.md).

## Estructura

```
├── public/assets/      # Logo e íconos (SVG)
├── src/
│   ├── components/     # Header, DogCard, DogGrid, BreedFilter, GalleryEmptyState
│   ├── views/          # HomeView, GalleryView
│   ├── services/       # dogApi.js, galleryStorage.js
│   ├── router/         # AppRouter (/, /galeria)
│   ├── data/           # breeds.js
│   └── styles/         # patitas.css
├── tests/
├── docs/               # Mockup, consigna, registro de diseño
├── docker/             # (futuro) Dockerfile y Nginx
├── prompts/            # Registro de prompts IA (consigna)
├── docker-compose.yml
├── dev.bat
└── 00-memory-bank.md
```

## Herramientas de IA

- **Cursor (Agent)** — scaffolding inicial, Home + Dog CEO API, Mi Galería (favoritos y empty state). Ver `prompts/`.

## Documentación del curso

Ver `docs/Tarea_2_RIA_2026.md` y `docs/Documento_de_Mockup.md`.
