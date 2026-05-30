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

- No hay backend propio ni base de datos: toda la lógica corre en el navegador.
- Los favoritos se guardan solo en **LocalStorage** del dispositivo (`patitas-gallery`).
- Las imágenes provienen de la API pública [Dog CEO](https://dog.ceo/dog-api/); no se almacenan credenciales ni secrets en el repo.

## Herramientas de IA

- **Cursor (Agent)** — scaffolding inicial, Home + Dog CEO API, Mi Galería (favoritos y empty state). Ver `prompts/`.

## Documentación del curso

- Consigna: [`docs/Tarea_2_RIA_2026.md`](docs/Tarea_2_RIA_2026.md)
- Mockup: [`docs/Documento_de_Mockup.md`](docs/Documento_de_Mockup.md)
- Testing y performance: [`docs/Testing_y_Performance.md`](docs/Testing_y_Performance.md)
- Memory bank: [`00-memory-bank.md`](00-memory-bank.md)
- Video de la App: https://youtu.be/oVZbhSrRBt8