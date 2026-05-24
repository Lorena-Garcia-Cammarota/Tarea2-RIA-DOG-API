# Registro de interacciones — Diseño (Patitas)

Solo se anotan decisiones y pedidos relacionados con **UI/UX, mockups, componentes visuales, estilos y navegación de interfaz**.  
No incluye API, infraestructura, Git, tests ni preguntas generales.

---

## 2026-05-19 — Inicialización del proyecto

| Hora (aprox.) | Pedido / contexto | Acción tomada |
|---------------|-------------------|---------------|
| — | Usuario pidió armar el árbol de carpetas del proyecto React en la raíz del repo (sin subcarpeta `DOG API` anidada). | Se creó estructura según consigna: `src/components`, `src/views`, `src/services`, `src/router`, `tests/`, `docs/`, `docker/` (placeholder), `prompts/`. |
| — | Usuario pidió un archivo en `docs/` para registrar interacciones de **diseño**. | Se creó este archivo (`Registro_Diseno.md`). |
| — | Scaffold inicial de la app según mockup **Patitas** (`Documento_de_Mockup.md`). | Header con título “Patitas”, subtítulo y botón “Mi Galería”; rutas `/` y `/galeria`; variables CSS base (`--patitas-bg`, tonos cálidos del mockup); Bootstrap 5 como framework UI. |

---

## 2026-05-20 — Página principal (diseño estático)

| Pedido | Decisión / resultado |
|--------|----------------------|
| Diseñar solo la home de forma **estática**, sin llamadas a Dog CEO API; máxima responsividad. | Grilla con 24 fotos locales (12 URLs base repetidas); filtro de raza solo cambia estado visual. Imágenes vía URLs estáticas del export Figma (`mockup assets`), no API. |
| Lista fija de **10** razas en el desplegable (incluye “Todos los Perros”). | `src/data/breeds.js` con 10 opciones e iconos emoji alineados al mockup. |
| **12** fotos iniciales y más contenido al **hacer scroll**. | 24 tarjetas en grilla responsive (1 / 2 / 3 / 4 columnas) + texto “Deslizá hacia abajo…”. |
| Header acorde al mockup (logo, botón rosa “Mi Galería”). | Logo desde `docs/image3.png` → `public/assets/logo.png`; botón con gradiente rosa; contador de favoritos en UI (estado local, sin LocalStorage aún). |
| Usar assets de `mockup assets` / carpeta de diseño. | La carpeta Figma exportó solo TSX/CSS; iconos SVG creados en `public/assets/icons/`; logo copiado desde mockup en docs. |
| Corazón **rojo** al marcar favorito (solo visual en home). | `heart-filled.svg` (#e11d48) / `heart-outline.svg` en cada tarjeta; toggle actualiza contador del header. |
| Colores y layout según mockup `image7.png`. | `src/styles/patitas.css` con paleta ámbar/rosa y componentes `Header`, `BreedFilter`, `DogCard`, `DogGrid`. |

---

## Plantilla para entradas futuras

```markdown
## YYYY-MM-DD — Título breve

| Pedido | Decisión / resultado |
|--------|----------------------|
| …      | …                    |
```
