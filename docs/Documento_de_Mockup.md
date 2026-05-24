# Sistema de Creación de Galería de Perros a través de una Única API

**Documento de Mockup**

**Integrantes:**

| Federico Alonso | Lorena García |
|---|---|
| 5.450154-7 | 4.546301-1 |

**Tutor:** Andrés Pastorini  
**Curso:** Rich Internet Applications (RIA)

---

## Tabla de Contenidos

1. [Introducción a la aplicación](#1-introducción-a-la-aplicación)
2. [Introducción](#2-introducción)
3. [Diseño](#3-diseño)
   - 3.1. [Interfaz principal](#31-interfaz-principal)
   - 3.2. [Drop-down menu](#32-drop-down-menu)
   - 3.3. [Galería](#33-galería)
   - 3.4. [Header](#34-header)
4. [Diagrama de navegación](#4-diagrama-de-navegación)

---

## 1. Introducción a la aplicación

**Patitas** es una aplicación web desarrollada en React que interactúa con la Dog CEO API, con el objetivo de ofrecer una experiencia mucho más amigable, visualmente atractiva y fácil de usar para los amantes de los perros.

Patitas es un sistema 100% frontend (sin backend), lo que significa que toda la información generada por el usuario (como su galería personal) se almacena de manera local utilizando el **LocalStorage** del navegador. Esto garantiza una experiencia rápida y funcional sin necesidad de registro ni servidor externo.

---

## 2. Introducción

El presente documento tiene como propósito presentar de manera detallada el diseño de la aplicación Patitas. En él se incluye:

- El diseño gráfico y la identidad visual de la aplicación.
- El diagrama de componentes que muestra la estructura modular de la interfaz.
- El flujo de navegación completo a través del frontend, detallando cómo el usuario interactúa con las diferentes secciones y funcionalidades.

Este documento sirve como guía visual y técnica para comprender la arquitectura de la interfaz, la experiencia de usuario (UX) y las decisiones de diseño tomadas durante el desarrollo.

---

## 3. Diseño

### 3.1. Interfaz principal

Al cargar la aplicación, esta sección muestra una selección predeterminada de imágenes de perros obtenidas directamente de la Dog CEO API. Estas imágenes se presentan en una cuadrícula atractiva y responsive, permitiendo una navegación visual fluida. El objetivo es que el usuario encuentre contenido interesante desde el primer momento sin necesidad de realizar ninguna búsqueda.

Los botones han sido diseñados para ser altamente visibles y llamativos, incorporando iconos intuitivos y significativos (como corazón, estrella o hueso) según la acción que representan. Esta decisión se tomó considerando el perfil del usuario objetivo.

### 3.2. Drop-down menu

El menú desplegable es uno de los principales elementos de filtrado de la aplicación Patitas. Se encuentra ubicado estratégicamente justo debajo del header, ofreciendo al usuario un acceso rápido y visible para explorar el contenido según sus preferencias.

A través de este menú, el usuario puede filtrar las imágenes por raza de perro. Al seleccionar una raza específica, la aplicación realiza una llamada a la Dog CEO API para obtener una nueva lista de imágenes aleatorias que correspondan al criterio elegido.

### 3.3. Galería

La **Galería Personal**, accesible mediante el botón "Mi Galería", es una de las secciones principales de la aplicación Patitas. Este botón se encuentra siempre visible en el header de la aplicación, permitiendo al usuario acceder a su colección en cualquier momento y desde cualquier pantalla.

El botón utiliza un ícono de corazón, el mismo que aparece en cada tarjeta de perro dentro de la interfaz principal y de los resultados de búsqueda. Esta coherencia visual es intencional: establece una relación directa y clara entre la acción de "guardar" una foto (al hacer clic en el corazón) y el lugar donde se visualizan todas las imágenes guardadas. De esta forma, el usuario comprende intuitivamente la funcionalidad sin necesidad de explicaciones adicionales.

### 3.4. Header

El **Header** es uno de los elementos más importantes de la interfaz de Patitas, ya que proporciona identidad de marca y acceso constante a las funciones principales de la aplicación.

Visualmente, el header se distingue del resto de la interfaz al utilizar un color más claro. Esta elección cromática crea un contraste agradable con el fondo principal, permitiendo que el header destaque sin resultar agresivo, y contribuye a transmitir una sensación de limpieza, orden y ligereza.

La simplicidad del header es intencional: al eliminar elementos innecesarios (como menús complejos o botones de login), se logra una interfaz más limpia, rápida y centrada en el contenido, ideal para el público objetivo de la aplicación.

---

## 4. Diagrama de navegación

El diagrama que se muestra a continuación representa las operaciones clásicas que se realizarán en el sistema. Incluye un actor principal (el usuario), objetos cuadrados como las acciones, rombos como las decisiones que puede tomar, y cuadrados redondeados como el sistema renderizando una nueva ruta.
