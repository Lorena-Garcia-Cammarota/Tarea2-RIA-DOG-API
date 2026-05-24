# Guía de Laboratorio: Tarea 2 - Aplicaciones RIA

**Curso:** Rich Internet Applications (RIA) 2026  
**Docente:** Andrés Pastorini  
**Pre entrega:** Lunes 1 de Junio  
**Prórroga (si se necesita):** 15 de Junio

---

## 1. Objetivo y Alcance

Desarrollar una aplicación RIA funcional que consuma APIs públicas, aplicando un ciclo de desarrollo profesional que abarque desde el diseño hasta la documentación y despliegue.

**Se requiere:**

- **Frameworks permitidos:** Vue 3, React o Angular.
- **UI:** Uso obligatorio de Bootstrap o Material Design.
- **Navegación:** Mínimo 2 rutas/páginas diferentes.
- **Backend:** No se permite lógica de negocio propia ni bases de datos persistentes (excepto LocalStorage).

---

## 2. Proceso de Inscripción

Enviar correo a **apastorini@gmail.com** antes de comenzar el desarrollo.

- **Asunto:** Tarea 2 RIA 2026
- **Contenido:** Escenario elegido e integrantes del grupo.
- Indicar en orden de preferencia tres escenarios que desean abordar, para que el docente indique cuál será asignado.

---

## 3. Criterios de Evaluación

| Criterio | Puntaje | Evidencia Requerida |
|---|---|---|
| Mockups de UI | 15 pts | Figma o Excalidraw (Móvil y Desktop) |
| Navegación funcional | 20 pts | 2+ rutas implementadas |
| Consumo de API | 25 pts | Integración de servicios externos |
| Calidad de Código y Git | 10 pts | Repositorio público con estructura sugerida |
| Testing y Performance | 20 pts | Unitarios + Integración + Lighthouse > 80 |
| Documentación | 10 pts | README.md completo + PPT |
| **TOTAL** | **100 pts** | - |

---

## 4. Uso de Inteligencia Artificial

El uso de herramientas de IA está permitido bajo las siguientes condiciones:

- **Registro de Prompts:** Guardar cada interacción relevante en la carpeta `prompts/` del repositorio.
- **Memory Bank:** Crear el archivo `00-memory-bank.md` para gestionar el contexto del proyecto.
- **Declaración:** Listar explícitamente las herramientas usadas en el `README.md`.

---

## 5. Estructura de Proyecto Sugerida

```
mi-grupo-lab2/
├── src/
│   ├── components/     # Componentes reutilizables
│   ├── views/          # Páginas principales
│   ├── services/       # Llamadas a APIs
│   └── router/         # Configuración de rutas
├── tests/              # Pruebas unitarias e integración
├── docker/             # Dockerfile y config de Nginx
├── README.md           # Guía de ejecución y descripción
└── docker-compose.yml
```

---

## 6. Presentación Final

Cada grupo dispondrá de **8 minutos** para presentar:

1. Arquitectura de componentes y flujo de navegación.
2. Demostración de la aplicación funcionando (pueden usar el video de 30s como respaldo).
3. Resultados de las pruebas de performance y testing.

---

## Apéndice A: 10 Escenarios Propuestos

| # | Aplicación | API Sugerida | Descripción |
|---|---|---|---|
| 1 | Buscador de Películas | TMDB API | Búsqueda por título, filtros, detalles y tráilers. Poder ver detalle de películas. |
| 2 | Clima en Tiempo Real | OpenWeatherMap | Búsqueda por ciudad, pronóstico 5 días e iconos. |
| 3 | Buscador de Recetas | TheMealDB | Búsqueda por ingrediente, categorías y favoritos. |
| 4 | Noticias por Categoría | NewsAPI | Headlines por país y tópicos (tech, sports). |
| 5 | Conversor de Monedas | ExchangeRate-API | Conversión +150 monedas e historial gráfico. |
| 6 | Buscador de Libros | OpenLibrary | Búsqueda por autor/ISBN y lecturas pendientes. |
| 7 | Pokédex Interactivo | PokeAPI | Fichas, evoluciones y sprites animados. |
| 8 | Rastreador de Vuelos | AviationStack | Estado en vivo, rutas y datos de aeropuertos. |
| 9 | Usuarios GitHub | GitHub API | Perfiles, repositorios y actividad reciente. |
| 10 | Dog Finder | Dog CEO API | Búsqueda por raza, fotos y galería personal. |

---

## Apéndice B: Ciclo de Desarrollo

### Paso 1: Diseño de Mockups

- **Herramientas:** Figma, Excalidraw, Penpot o Draw.io.
- **Entregables:** UI (desktop), Diagrama de componentes y Flujo de navegación.

### Paso 2: Testing y Performance

- **Performance:** Lighthouse (Chrome) o WebPageTest.
- **Video Demo:** 30 segundos mostrando navegación y búsqueda.

### Paso 3: Presentación PPT

Mínimo 7 diapositivas cubriendo: Portada, Mockups, Arquitectura, APIs, Tests, Enlaces y Conclusiones.

---

## Apéndice C: Alternativas de APIs

| Principal | Alternativa 1 | Alternativa 2 |
|---|---|---|
| TMDB | OMDb API | Watchmode |
| OpenWeather | WeatherAPI | AccuWeather |
| TheMealDB | Spoonacular | Edamam |
| NewsAPI | CurrentsAPI | GNews |
| ExchangeRate | Frankfurter | CurrencyAPI |

---

## Apéndice D: Checklist de Entregables

- [ ] Mockups (Entrega inicial para monitoreo)
- [ ] Código en GitHub con `README.md` completo (diseño, configuración, paso a paso para levantar el sistema, links a reportes de test, seguridad)
- [ ] Tests Unitarios e Integración (Capturas de éxito)
- [ ] Video de 30 segundos (Link en el repo)
- [ ] PPT de presentación
