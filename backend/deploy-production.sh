#!/bin/bash

# Script para deployar backend a producción automáticamente
# Uso: bash deploy-production.sh

set -e  # Salir si hay error

echo "🚀 Iniciando deployment a producción..."

cd "$(dirname "$0")"

# Agregar secrets automáticamente
echo ""
echo "🔐 Configurando secrets..."

echo "   → FIREBASE_API_KEY"
echo "AIzaSyDxgiQEKpbty-w3ZVbVw5XJXO91aB9MEN4" | wrangler secret put FIREBASE_API_KEY --env production 2>/dev/null || true

echo "   → GOOGLE_CLIENT_SECRET"
echo "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" | wrangler secret put GOOGLE_CLIENT_SECRET --env production 2>/dev/null || true

echo "   → JWT_SECRET"
echo "hyper-hause-jwt-secret-2026-prod-key-secure!" | wrangler secret put JWT_SECRET --env production 2>/dev/null || true

echo ""
echo "📦 Deployando a Cloudflare Workers..."
wrangler deploy --env production

echo ""
echo "✅ ¡Deployment completado!"
echo ""
echo "🌐 Backend disponible en:"
echo "   https://hyper-hause-backend.misystemsoft.workers.dev"
