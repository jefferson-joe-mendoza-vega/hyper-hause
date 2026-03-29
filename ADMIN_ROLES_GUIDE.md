# Sistema de Protección de Roles - Hyper House Admin

## 📋 Índice
1. [Flujo de Autenticación](#flujo-de-autenticación)
2. [Protección en Frontend](#protección-en-frontend)
3. [Protección en Backend](#protección-en-backend)
4. [Cómo Hacer Admin a un Usuario](#cómo-hacer-admin-a-un-usuario)
5. [Testing](#testing)
6. [Seguridad](#seguridad)

---

## Flujo de Autenticación

### 1. **Login en Página de Perfil** (`/perfil`)
```
Usuario → Click "Sign in with Google" → Backend valida → 
Crea/Actualiza usuario en Firestore → Retorna token + rol
```

### 2. **Almacenamiento en Frontend** (`src/lib/stores/auth.js`)
```javascript
// Se guarda en localStorage:
- authToken  // JWT token del backend
- user       // Objeto con { nombre, email, foto, rol: 'admin' | 'normal' }
```

---

## 🛡️ Protección en Frontend

### 1. **Protección en `/admin`** (`src/routes/admin/+layout.js`)
```
Usuario intenta acceder → ¿Tiene token? 
  ├─ NO → Redirige a `/admin/login`
  ├─ SI → ¿Es admin (rol === 'admin')?
       ├─ SI → Permite acceso al panel
       └─ NO → Redirige a `/admin/acceso-denegado`
```

### 2. **Página de Perfil** (`/perfil`)
- Muestra información del usuario actual
- Si es **admin**: Muestra botón "Ir al Panel de Admin"
- Si es **normal**: Muestra mensaje informativo

### 3. **Página de Acceso Denegado** (`/admin/acceso-denegado`)
- Muestra cuando un usuario normal intenta acceder a `/admin`
- Permite cerrar sesión e intentar login de nuevo

---

## 🔐 Protección en Backend

### Middlewares Implementados

#### **auth.middleware.js** - Autenticación
```javascript
export async function extractAndVerifyToken(req, jwtSecret)
// Extrae y valida JWT token del header Authorization

export async function requireAuth(req, jwtSecret)
// Middleware que requiere un token válido
// Retorna 401 si no hay token
```

#### **admin.middleware.js** - Autorización
```javascript
export async function requireAdmin(req, jwtSecret)
// Middleware que requiere ser administrador
// Retorna 401 si no hay token válido
// Retorna 403 si el usuario no es admin
```

### Endpoints Protegidos

#### **Autenticación** (públicos)
- `POST /api/auth/login-google` - Login con Google ✅ PÚBLICO

#### **Administración de Usuarios** (admin only)
- `GET /api/admin/usuarios` - Listar usuarios 🔒 ADMIN
- `POST /api/admin/usuarios` - Crear usuario 🔒 ADMIN
- `PUT /api/admin/usuarios/:id/rol` - Actualizar rol 🔒 ADMIN
- `PUT /api/admin/usuarios/:id/estado` - Cambiar estado 🔒 ADMIN
- `DELETE /api/admin/usuarios/:id` - Eliminar usuario 🔒 ADMIN

#### **Propiedades** (mixtos)
- `GET /api/propiedades` - Listar propiedades ✅ PÚBLICO
- `GET /api/propiedades/:id` - Obtener propiedad ✅ PÚBLICO
- `GET /api/propiedades/slug/:slug` - Buscar por slug ✅ PÚBLICO
- `GET /api/propiedades/recomendadas` - Obtener recomendadas ✅ PÚBLICO
- `POST /api/propiedades` - Crear propiedad 🔒 ADMIN
- `PUT /api/propiedades/:id` - Actualizar propiedad 🔒 ADMIN
- `DELETE /api/propiedades/:id` - Eliminar propiedad 🔒 ADMIN

### Cómo Funciona la Validación

#### **Paso 1: Token en el Header**
El frontend debe enviar el token en el header `Authorization`:
```javascript
const response = await fetch('/api/admin/usuarios', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

#### **Paso 2: Verificación en Middleware**
```javascript
// En el handler:
const authResult = await requireAdmin(req, jwtSecret);
if (authResult instanceof Response) {
  return authResult; // Retorna error 401 o 403
}

// Si llegó aquí, el usuario es admin y podemos proceder
return handleRequest(req);
```

#### **Paso 3: Respuestas**

**✅ Éxito (200)**
```json
{
  "ok": true,
  "mensaje": "Rol actualizado",
  "resultado": {...}
}
```

**❌ Sin Token (401)**
```json
{
  "error": "No autorizado",
  "mensaje": "Token inválido o expirado. Por favor inicia sesión nuevamente."
}
```

**❌ No es Admin (403)**
```json
{
  "error": "Acceso denegado",
  "mensaje": "Solo los administradores pueden acceder a este recurso.",
  "userRol": "normal"
}
```

---

## Cómo Hacer Admin a un Usuario

### Opción 1: Firebase Console (Recomendado)
```
1. Ir a Firestore → colección "usuarios"
2. Buscar documento del usuario
3. Cambiar campo "rol" de "normal" a "admin"
4. Usuario debe cerrar sesión y login de nuevo para actualizar su token
```

### Opción 2: Con Firebase CLI
```bash
firebase firestore update usuarios/{userId} --update rol=admin
```

### Opción 3: Mediante Endpoint (Admin)
Solo un admin puede hacer esto:
```bash
curl -X PUT http://localhost:8787/api/admin/usuarios/{userId}/rol \
  -H "Authorization: Bearer {adminToken}" \
  -H "Content-Type: application/json" \
  -d '{"rol": "admin"}'
```

---

## Testing

### Testear con rol normal:
```
1. Google login con cuenta A (rol = normal)
2. Ver que aparece en /perfil con rol "Usuario Regular"
3. Ir a /admin → Debe redirigir a /admin/acceso-denegado
4. Intentar llamar POST /api/admin/usuarios → 403 Forbidden
```

### Testear con rol admin:
```
1. En Firebase, cambiar usuario A a rol: "admin"
2. Usuario cierra sesión
3. Login de nuevo con cuenta A
4. Ver en /perfil "Administrador" con botón "Ir al Panel de Admin"
5. Ir a /admin → Debe mostrar el dashboard
6. Llamar GET /api/admin/usuarios → 200 OK con lista de usuarios
```

### Testear sin token:
```javascript
// Intentar acceder sin Authorization header
const response = await fetch('/api/admin/usuarios');
// Debe retornar 401 Unauthorized
```

---

## Archivos Modificados

| Archivo | Cambio |
|---------|--------|
| `src/lib/stores/auth.js` | ✅ Agregué `isUserAdmin()` |
| `src/routes/admin/+layout.js` | ✅ Valida rol antes de permitir acceso |
| `src/routes/admin/acceso-denegado/+page.svelte` | ✅ Nueva página de error |
| `src/routes/perfil/+page.svelte` | ✅ Muestra rol e info de usuario |
| `src/core/middleware/auth.middleware.js` | ✅ Nuevo - Valida JWT token |
| `src/core/middleware/admin.middleware.js` | ✅ Nuevo - Valida rol admin |
| `src/modules/auth/index.js` | ✅ Añadí requireAdmin() a todos los endpoints admin |
| `src/modules/propiedades/propiedades.routes.js` | ✅ Protegí POST/PUT/DELETE |

---

## 🔒 Seguridad

### ✅ Lo que está implementado

- **Frontend**: Redirige usuarios no-admin fuera de `/admin`
- **Backend**: Valida JWT token en todos los endpoints admin
- **Backend**: Verifica rol **admin** en endpoints sensibles
- **JWT**: Incluye rol en el payload para fácil verificación
- **Logs**: Registra intentos fallidos de acceso

### ⚠️ Consideraciones adicionales

1. **Validación en ambos lados**: El frontend protege UX, el backend protege datos
2. **Token expiracion**: JWT expira en 7 días (verificar en `/api/auth/login-google`)
3. **Refresh tokens**: No implementado aún (los usuarios deben login nuevamente después de 7 días)
4. **Rate limiting**: No implementado (considerar para endpoints críticos)
5. **Audit logs**: No implementado (considerar para comandos destructivos como DELETE)

### 📝 Próximas Mejoras Recomendadas

```
[ ] Implementar refresh tokens para JWT
[ ] Añadir rate limiting en endpoints sensibles
[ ] Crear audit logs para cambios de admin
[ ] Validar CORS para endpoints públicos
[ ] Implementar 2FA para admin
[ ] Crear endpoint para revocar sesiones
```
