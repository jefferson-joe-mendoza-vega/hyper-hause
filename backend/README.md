# Hyper Hause Backend - Cloudflare Worker

Backend API construido con Cloudflare Workers para Hyper Hause.

## Comandos

```bash
# Instalar dependencias
npm install

# Desarrollo local
npm run dev

# Desplegar a producción
npm run deploy
```

## Estructura

```
backend/
├── src/
│   └── index.js       # Worker principal
├── wrangler.toml      # Configuración de Cloudflare
└── package.json       # Dependencias
```

## Endpoints API

- `GET /api` - Información de la API
- `GET /api/propiedades` - Listar propiedades
- `POST /api/propiedades` - Crear propiedad
- `GET /api/proyectos` - Listar proyectos
- `GET /api/testimonios` - Listar testimonios
- `POST /api/contacto` - Enviar mensaje de contacto

## Variables de entorno

Crea un archivo `.dev.vars` para desarrollo local:

```
ENVIRONMENT=development
```
