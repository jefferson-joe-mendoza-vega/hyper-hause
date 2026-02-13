# Hyper House Inmobiliaria

Proyecto SvelteKit + Tailwind CSS para Hyper House Inmobiliaria, optimizado para Firebase Hosting.

## 🚀 Despliegue a Firebase Hosting

### Requisitos previos

1. Tener Node.js instalado
2. Tener Firebase CLI instalado (`npm install -g firebase-tools`)
3. Estar autenticado en Firebase (`firebase login` - ya lo hiciste ✅)

### Pasos para desplegar

#### 1. Editar .firebaserc

Abre el archivo `.firebaserc` y reemplaza `"tu-proyecto-id"` con el ID de tu proyecto Firebase:

```json
{
  "projects": {
    "default": "hyper-house-12345"
  }
}
```

#### 2. Construir el proyecto

```bash
npm run build
```

Este comando:
- Genera el sitio estático en la carpeta `build/`
- Optimiza todos los assets
- Pre-renderiza todas las páginas

#### 3. Probar localmente (opcional)

```bash
firebase serve
```

Esto inicia un servidor local en `http://localhost:5000` para probar el sitio antes de desplegarlo.

#### 4. Desplegar a Firebase

```bash
firebase deploy
```

¡Listo! Tu sitio estará en vivo en `https://tu-proyecto-id.web.app`

## 🛠️ Comandos útiles

```bash
# Desarrollo local
npm run dev

# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview

# Servir con Firebase localmente
firebase serve

# Desplegar a Firebase
firebase deploy

# Ver logs de Firebase
firebase deploy --debug
```

## 📁 Estructura del proyecto

```
src/
├── routes/              # Rutas de la aplicación
│   ├── +page.svelte    # Página de inicio
│   ├── buscar/         # Búsqueda de propiedades
│   ├── servicios/      # Servicios
│   ├── contacto/       # Login/Perfil
│   ├── propiedades/    # Listado de propiedades
│   ├── blog/           # Blog
│   └── acerca-de/      # Acerca de
└── lib/
    └── components/     # Componentes globales
        ├── Header.svelte
        └── Footer.svelte
```

### Componentes

#### Componentes Globales (`src/lib/components/`)
- `Header.svelte` - Encabezado con logo isotipo.webp
- `Footer.svelte` - Footer con información de la empresa, servicios, contacto y formulario de consulta

#### Componentes de Búsqueda (`src/routes/buscar/componentes/`)
- `PropertyCard.svelte` - Tarjeta de propiedad individual
- `FilterPanel.svelte` - Panel de filtros avanzados
- `QuickFilters.svelte` - Filtros rápidos horizontales

#### Componentes de Servicios (`src/routes/servicios/componentes/`)
- `ServiceCard.svelte` - Tarjeta de servicio individual

## 🎨 Tecnologías

- **SvelteKit** - Framework principal con adapter-static
- **Tailwind CSS v3** - Framework de estilos
- **Firebase Hosting** - Hosting estático
- **JavaScript** - Lenguaje de programación
- **Material Icons** - Iconografía (Round, Outlined, Symbols)
- **Google Fonts (Manrope)** - Tipografía personalizada

## 🔧 Configuración

- **svelte.config.js** - Configurado con adapter-static para generar sitio estático
- **firebase.json** - Configuración de hosting con cache optimizado
- **tailwind.config.js** - Tema personalizado con colores de la marca
- **+layout.js** - Prerendering habilitado para todas las páginas

## 📝 Notas importantes

- El sitio es completamente estático (SSG - Static Site Generation)
- Todas las páginas se pre-renderizan en build time
- Los assets tienen cache de 1 año para mejor rendimiento
- El logo se encuentra en `static/isotipo.webp`
- Configurado con modo oscuro (class-based strategy)

## Developing

Para iniciar el servidor de desarrollo:

```sh
npm run dev

# o abrir automáticamente en el navegador
npm run dev -- --open
```
