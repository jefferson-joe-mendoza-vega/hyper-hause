import { UploadController } from './upload.controller.js';
import { requireAdmin } from '../../core/middleware/admin.middleware.js';
import { FirestoreClient } from '../../infrastructure/database/connection.js';

export function registerUploadRoutes(router, env) {
  const ctrl = new UploadController(env);
  const jwtSecret = env.JWT_SECRET || 'tu-secret-key-desarrollo';
  const db = new FirestoreClient(env);

  // ⭐ POST /api/upload/image - Sube una imagen (ADMIN ONLY)
  router.post('/api/upload/image', async (req) => {
    // Verificar que sea admin
    const authResult = await requireAdmin(req, jwtSecret, db);
    if (authResult instanceof Response) {
      return authResult;
    }
    return ctrl.uploadToImgbb(req);
  });
}

export { UploadController };
