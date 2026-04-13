import { UploadController } from './upload.controller.js';

export function registerUploadRoutes(router, env) {
  const ctrl = new UploadController(env);

  // POST /api/upload/image - Sube una imagen a ImgBB
  router.post('/api/upload/image', async (req) => {
    return ctrl.uploadToImgbb(req);
  });
}

export { UploadController };
