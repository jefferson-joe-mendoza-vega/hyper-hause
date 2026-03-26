$ErrorActionPreference = 'Stop'

Set-Location (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location ..

if (-not (Test-Path '.dev.vars')) {
  throw 'No existe .dev.vars en backend/. Crea ese archivo con FIREBASE_API_KEY e IMGBB_API_KEY.'
}

$vars = @{}
Get-Content '.dev.vars' | ForEach-Object {
  $line = $_.Trim()
  if ([string]::IsNullOrWhiteSpace($line)) { return }
  if ($line.StartsWith('#')) { return }
  $parts = $line.Split('=', 2)
  if ($parts.Count -eq 2) {
    $key = $parts[0].Trim()
    $val = $parts[1].Trim()
    $vars[$key] = $val
  }
}

$required = @('FIREBASE_API_KEY', 'IMGBB_API_KEY')
$missing = $required | Where-Object { -not $vars.ContainsKey($_) -or [string]::IsNullOrWhiteSpace($vars[$_]) }
if ($missing.Count -gt 0) {
  throw ("Faltan variables en .dev.vars: " + ($missing -join ', '))
}

Write-Host 'Subiendo secrets a Cloudflare (production)...'
$vars['FIREBASE_API_KEY'] | wrangler secret put FIREBASE_API_KEY --env production | Out-Host
$vars['IMGBB_API_KEY'] | wrangler secret put IMGBB_API_KEY --env production | Out-Host

Write-Host 'Desplegando backend en production...'
wrangler deploy --env production | Out-Host

Write-Host ''
Write-Host 'Listo. URLs para consultar backend:'
Write-Host 'Health:       https://hyper-hause-backend-production.aqualive.workers.dev/api'
Write-Host 'Propiedades:  https://hyper-hause-backend-production.aqualive.workers.dev/api/propiedades'
Write-Host 'Recomendadas: https://hyper-hause-backend-production.aqualive.workers.dev/api/propiedades/recomendadas?limit=10'
