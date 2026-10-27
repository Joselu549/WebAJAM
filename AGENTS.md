# AGENTS.md — Web de AJAM

Guía para agentes de IA y colaboradores que trabajen en este repositorio. Prioriza **objetividad y justificación**: antes de añadir algo (dependencia, componente, JS, animación) pregúntate si el contenido lo necesita. Si no, no se añade.

## 1. Contexto del proyecto

- **Qué es:** web de **AJAM — Asociación Jumillana Amigos de la Música** (banda de música).
- **Objetivo:** web **orientada a contenido** (informar y dar imagen). No es una app: no hay login, panel, base de datos ni estado complejo.
- **Secciones (únicas, no crear más sin pedirlo):**
  | Sección        | Ruta              | Propósito                                                      |
  | -------------- | ----------------- | -------------------------------------------------------------- |
  | Inicio         | `/`               | Presentación, impacto visual, accesos a las otras secciones    |
  | Sobre nosotros | `/sobre-nosotros` | Historia, qué es la asociación, agrupaciones, equipo/directiva |
  | Contáctanos    | `/contactanos`    | Datos de contacto y formulario/enlace de contacto              |
- **Idioma:** español (`<html lang="es">`). Todo el texto visible, `alt`, `aria-label` y metadatos en español. Código, nombres de componentes y comentarios técnicos: ver sección 4.
- **Público:** vecinos, socios potenciales, músicos y entidades que quieran contactar. Mucho tráfico móvil: **mobile-first**.

## 2. Stack y decisiones

| Elemento           | Decisión                                                                       | Motivo                                      |
| ------------------ | ------------------------------------------------------------------------------ | ------------------------------------------- |
| Framework          | **Astro** (última estable)                                                     | Contenido estático, HTML sin JS por defecto |
| Salida             | `output: 'static'`                                                             | No hay lógica de servidor que lo justifique |
| Estilos            | **Tailwind CSS v4** (`@theme`, plugin `@tailwindcss/vite`)                     | Ya definido por el proyecto                 |
| Lenguaje           | **TypeScript** en modo `strict` (`astro/tsconfigs/strict`)                     | Props tipadas, menos errores                |
| Componentes UI     | **Astro Components Kit** (https://astrocomponents.dev/) como referencia/fuente | Ver sección 6                               |
| Gestor de paquetes | `bun` (salvo que exista otro lockfile; no mezclar)                             | Un solo lockfile                            |

**Reglas de stack**

- **No añadir React/Vue/Angular/Svelte** ni ninguna isla de framework. No hace falta para una web de contenido.
- **No añadir dependencias** sin justificarlo por escrito en el PR/mensaje. Antes de instalar algo, comprobar si se resuelve con CSS, Astro o Tailwind.
- JavaScript en cliente: **solo si es imprescindible** (menú móvil, formulario). Usar `<script>` de Astro, pequeño y sin librerías.

## 3. Estructura de carpetas

```
src/
├── components/
│   ├── ui/          # Piezas genéricas reutilizables (botones, tarjetas, badges)
│   ├── layout/      # Header, Footer, Nav
│   ├── sections/    # Bloques de página (Hero, Historia, ContactoForm...)
│   └── effects/     # Fondos animados y efectos decorativos
├── layouts/
│   └── BaseLayout.astro   # <head>, SEO, fondo animado, header/footer
├── pages/
│   ├── index.astro
│   ├── sobre-nosotros.astro
│   └── contactanos.astro
├── content/         # (opcional) contenido en Markdown/JSON si crece
├── assets/          # Imágenes que Astro debe optimizar
└── styles/
    └── global.css   # @import "tailwindcss"; + @theme + animaciones
public/              # favicon, robots.txt, og-image (archivos que no se procesan)
```

- Una página = un archivo en `pages/`. Las páginas **componen** secciones; no contienen maquetación larga.
- Si un bloque se usa en más de una página, va a `components/`. Si solo se usa en una, puede quedarse en la propia página hasta que se repita (no abstraer antes de tiempo).

## 4. Convenciones de código

- Componentes: `PascalCase.astro` (`HeroSection.astro`). Archivos de utilidades: `camelCase.ts`.
- Props siempre tipadas con `interface Props` y desestructuradas en el frontmatter.
- Textos y datos de contacto (teléfono, email, redes, dirección) **centralizados** en un único archivo (`src/data/site.ts`), no repetidos por los componentes.
- Nombres de variables/componentes en inglés o español, pero **coherentes en todo el repo** (por defecto: inglés para código, español para contenido visible).
- Sin CSS en línea ni `<style>` propios salvo que Tailwind no pueda expresarlo (p. ej. `@keyframes`, que van en `global.css`).
- Sin código muerto, comentarios obvios ni componentes "por si acaso".

## 5. Diseño y paleta de colores

### 5.1 Tokens actuales (Tailwind v4, en `src/styles/global.css`)

```css
@theme static {
  --color-primary: #c9a227;
  --color-primary-first: #e4c976;
  --color-secondary: #0a0a0a;
  --color-secondary-first: #1a1a1a;
  --color-ninth: #f5f1e8;
}
```

Uso: `bg-primary`, `text-primary-first`, `border-secondary-first`, `bg-ninth`, etc.

### 5.2 Significado de cada familia

| Familia              | Rol                        | Uso típico                                                                       |
| -------------------- | -------------------------- | -------------------------------------------------------------------------------- |
| `primary` (dorado)   | Color de marca de la banda | Acentos, CTAs, líneas decorativas, iconos, títulos destacados sobre fondo oscuro |
| `secondary` (negros) | Contraste y base oscura    | Fondos de secciones oscuras, texto sobre fondo claro, header/footer              |
| `ninth` (crema)      | Fondo claro                | Fondos de secciones claras y texto sobre fondo oscuro                            |

### 5.3 Cómo ampliar la paleta

- **Solo se añaden colores dentro de estas familias**, siguiendo el esquema `--color-<familia>-<variante>`: p. ej. `--color-primary-second`, `--color-secondary-second`, `--color-ninth-first`.
- Si hace falta un tono nuevo, **derivarlo de uno existente** (más claro/oscuro, mismo matiz) en vez de introducir un color ajeno a la paleta.
- Mantener `@theme static` para que todos los tokens se generen aunque no se usen en el HTML.
- **Prohibido** usar colores hexadecimales sueltos o clases de color por defecto de Tailwind (`bg-gray-800`, `text-yellow-500`...) en componentes. Todo color sale de un token.
- Para transparencias usar la sintaxis de Tailwind (`bg-primary/20`), no crear tokens nuevos por cada opacidad.

### 5.4 Contraste y accesibilidad (importante)

- **`primary` (#c9a227) sobre `ninth` (#f5f1e8) NO cumple contraste** de texto (≈2:1; WCAG AA exige 4.5:1). Reglas:
  - Texto dorado → solo sobre fondos `secondary` / `secondary-first`.
  - En fondos claros, el texto va en `secondary`; el dorado se limita a elementos decorativos (líneas, iconos grandes, bordes), nunca a texto informativo.
  - Botón sobre fondo claro: fondo `primary` + texto `secondary` (sí cumple).
- Estados `:focus-visible` siempre visibles (anillo con `primary` o `primary-first`).
- Verificar contraste de cualquier combinación nueva antes de usarla.

### 5.5 Estética

- **Moderna, elegante y sobria**: base oscura con acentos dorados, secciones alternas claras en crema. Evoca una banda musical sin caer en clichés recargados.
- Tipografía: máximo **2 familias** (una para títulos con carácter, una legible para texto). Cargar con `font-display: swap` y, si es posible, autoalojadas (Fontsource) para no depender de terceros.
- Mucho espacio en blanco, jerarquía clara, bordes/radios consistentes en todo el sitio.
- Imágenes: usar `<Image />` de `astro:assets` (formatos modernos, tamaños explícitos, `alt` descriptivo). Sin imágenes decorativas pesadas.

## 6. Animación y sensación de "página viva"

### 6.1 Fondo animado (requisito principal)

- Debe haber **un fondo animado sutil** presente en el sitio (componente en `components/effects/`, montado en `BaseLayout.astro`).
- Implementación **solo con CSS** (gradientes que se desplazan, formas/orbes difuminados con `@keyframes`, partículas CSS, etc.). Evitar canvas/WebGL/librerías: más peso y complejidad para un efecto decorativo.
- Estilo recomendado: orbes o gradientes dorados (`primary` con baja opacidad) sobre base `secondary`, movimiento lento (ciclos de 15–40 s). Debe **acompañar**, no competir con el contenido.
- Requisitos técnicos obligatorios:
  - `position: fixed; inset: 0; z-index: -1; pointer-events: none;` y `aria-hidden="true"`.
  - Animar **solo `transform` y `opacity`** (aceleradas por GPU). No animar `width`, `top`, `box-shadow` pesados ni `filter: blur` cambiante a pantalla completa.
  - Respetar `prefers-reduced-motion`: con esa preferencia, la animación se desactiva (el fondo queda estático, no desaparece).
  - Sin impacto en LCP/CLS: el fondo no debe retrasar el primer renderizado.

### 6.2 Micro-animaciones

- Permitidas: entrada de secciones al hacer scroll (preferible CSS con `animation-timeline: view()` o `IntersectionObserver` mínimo), hover/focus en botones y tarjetas, subrayados animados en enlaces.
- Duraciones cortas (150–400 ms) y curvas suaves. Nada que parpadee ni distraiga de leer.
- **Regla de decisión:** cada animación debe aportar jerarquía, feedback o identidad. Si solo "decora" y añade peso o JS, se descarta.

## 7. Uso de Astro Components Kit

Referencia: https://astrocomponents.dev/ (componentes Astro con CSS, sin dependencias de framework; estilos glass, neumorphic, cyber, tilt cards, navbar, sections, tipografía con gradiente, etc.).

- **Método preferido: copiar el componente necesario a `src/components/ui/`** y adaptarlo, en lugar de instalar el paquete completo. Motivo: la web solo usará unos pocos componentes y así se controlan estilos y peso.
- Todo componente copiado **debe adaptarse a la paleta del proyecto** (sustituir sus colores por tokens `primary`/`secondary`/`ninth`) y revisarse su contraste (sección 5.4).
- **Usar solo lo que aporte al contenido.** Candidatos razonables:
  - Navbar (p. ej. estilo glass) para el header.
  - Heading con gradiente para títulos destacados (gradiente dorado `primary` → `primary-first`).
  - Tarjetas (glass/profile/tilt) para integrantes, agrupaciones o eventos.
  - Botones con efecto sutil para CTAs.
  - Secciones prediseñadas (hero, CTA) como punto de partida.
  - Inputs animados y alertas para el formulario de contacto.
- **No usar:** componentes de métricas/analítica (stat cards, sparklines, charts), pricing, OTP, switches, color pickers u otros pensados para dashboards/apps. No encajan con una web de contenido de una banda.
- Evitar mezclar más de **2 estilos visuales** del kit (p. ej. glass + uno más). La coherencia pesa más que la variedad. Descartar el estilo "cyberpunk"/neón: choca con la imagen de la banda.
- Antes de adoptar un componente, comprobar que **no requiera JS** o que ese JS sea mínimo.

## 8. Contenido

- La web existe para el contenido: **texto real antes que relleno.** No inventar historia, fechas, nombres, cifras ni eventos de AJAM. Si falta información, dejar un marcador claro (`TODO:`) y avisar; nunca presentar datos inventados como reales.
- Sin `lorem ipsum` en nada que se despliegue.
- Datos de contacto y legales (email, teléfono, dirección, redes) vienen de `src/data/site.ts`.
- Si el contenido crece (noticias, conciertos, galería), usar **Content Collections** de Astro (Markdown/JSON) en lugar de HTML repetido. Hasta entonces, no crearlas.

## 9. Contacto

- La web es estática: **no hay backend**. Opciones, de menor a mayor complejidad:
  1. Enlaces `mailto:` / `tel:` + redes sociales (sin JS, cero dependencias).
  2. Formulario enviado a un servicio externo (Formspree, Web3Forms, etc.).
- **No implementar el formulario con un servicio concreto sin confirmarlo con el equipo.** Si se elige un formulario: validación HTML nativa (`required`, `type="email"`), `label` asociado a cada campo, mensaje de éxito/error accesible, y campo _honeypot_ anti-spam.
- Si se recogen datos personales, incluir enlace a política de privacidad (RGPD).

## 10. SEO, rendimiento y accesibilidad

- Un `<h1>` por página; jerarquía de encabezados sin saltos.
- Cada página con `<title>` y `<meta name="description">` únicos, `canonical`, Open Graph y `og:image`. Centralizar en `BaseLayout.astro` recibiendo props.
- HTML semántico: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`. Navegable por teclado, con enlace "saltar al contenido".
- Añadir `sitemap` (`@astrojs/sitemap`) y `robots.txt` cuando se conozca el dominio final (`site` en `astro.config`).
- Objetivos orientativos (Lighthouse móvil): Rendimiento ≥ 90, Accesibilidad ≥ 95, SEO ≥ 95.
- Sin scripts de terceros (analítica, widgets) sin acuerdo previo.

## 11. Comandos

```bash
bun install        # instalar dependencias
bun run dev        # servidor de desarrollo
bun run build      # build de producción (debe pasar sin errores ni warnings nuevos)
bun run preview    # previsualizar el build
npx astro check    # comprobar tipos de TypeScript y .astro
```

## 12. Antes de dar una tarea por terminada

- [ ] `bun run build` y `npx astro check` sin errores.
- [ ] Solo se usan colores de la paleta (tokens), sin hex sueltos.
- [ ] Contraste verificado en combinaciones nuevas (sección 5.4).
- [ ] Revisado en móvil (≈375 px) y escritorio.
- [ ] Animaciones fluidas y desactivadas con `prefers-reduced-motion`.
- [ ] No se han añadido dependencias ni JS innecesarios.
- [ ] No hay contenido inventado presentado como real.

## 13. Qué NO hacer

- No añadir páginas, secciones o funcionalidades fuera de Inicio / Sobre nosotros / Contáctanos sin petición expresa.
- No introducir frameworks de UI, librerías de animación pesadas (GSAP, Three.js, etc.) ni librerías de componentes adicionales.
- No cambiar los valores de los tokens existentes: solo ampliar la paleta.
- No sobrecargar la página con efectos: si algo distrae de leer el contenido, sobra.
