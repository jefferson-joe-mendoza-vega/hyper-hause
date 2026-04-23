#!/bin/bash
#bash scripts/deploy-production.sh 2>&1 | tail -60
set -e

# Ir al directorio del backend
cd "$(dirname "$0")/.."

# Verificar que existe .dev.vars
if [ ! -f '.dev.vars' ]; then
  echo "❌ Error: No existe .dev.vars en backend/"
  echo "Crea ese archivo con:"
  echo "  FIREBASE_API_KEY=..."
  echo "  GOOGLE_CLIENT_SECRET=..."
  echo "  JWT_SECRET=..."
  exit 1
fi

# Leer variables de .dev.vars
echo "📖 Leyendo variables de .dev.vars..."

FIREBASE_API_KEY=$(grep '^FIREBASE_API_KEY=' .dev.vars | cut -d'=' -f2-)
GOOGLE_CLIENT_SECRET=$(grep '^GOOGLE_CLIENT_SECRET=' .dev.vars | cut -d'=' -f2-)
JWT_SECRET=$(grep '^JWT_SECRET=' .dev.vars | cut -d'=' -f2-)
IMGBB_API_KEY=$(grep '^IMGBB_API_KEY=' .dev.vars | cut -d'=' -f2-)

# Validar que todas las variables están presentes
if [ -z "$FIREBASE_API_KEY" ] || [ -z "$GOOGLE_CLIENT_SECRET" ] || [ -z "$JWT_SECRET" ]; then
  echo "❌ Error: Faltan variables en .dev.vars"
  echo "Requiere: FIREBASE_API_KEY, GOOGLE_CLIENT_SECRET, JWT_SECRET"
  exit 1
fi

# Subir secrets a Cloudflare (production)
echo "🔐 Subiendo secrets a Cloudflare Workers (production)..."

# Intentar subir cada secret, ignorar si ya existe
echo "$FIREBASE_API_KEY" | wrangler secret put FIREBASE_API_KEY --env production 2>/dev/null || echo "  ℹ️  FIREBASE_API_KEY ya existe"
echo "$GOOGLE_CLIENT_SECRET" | wrangler secret put GOOGLE_CLIENT_SECRET --env production 2>/dev/null || echo "  ℹ️  GOOGLE_CLIENT_SECRET ya existe"
echo "$JWT_SECRET" | wrangler secret put JWT_SECRET --env production 2>/dev/null || echo "  ℹ️  JWT_SECRET ya existe"
echo "$IMGBB_API_KEY" | wrangler secret put IMGBB_API_KEY --env production 2>/dev/null || echo "  ℹ️  IMGBB_API_KEY ya existe"

# Deployar backend en production
echo ""
echo "🚀 Desplegando backend en production..."
wrangler deploy --env production

# Mostrar URLs de éxito
echo ""
echo "✅ Listo! Backend deployado exitosamente"
echo ""
echo "URLs para consultar backend:"
echo "  Health:       https://hyper-hause-backend.misystemsoft.workers.dev/api"
echo "  Propiedades:  https://hyper-hause-backend.misystemsoft.workers.dev/api/propiedades"
echo "  Recomendadas: https://hyper-hause-backend.misystemsoft.workers.dev/api/propiedades/recomendadas?limit=10"
echo ""
