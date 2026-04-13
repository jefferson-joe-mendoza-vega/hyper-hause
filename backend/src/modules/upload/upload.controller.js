const CORS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS }
  });
}

function error(message, status = 500, extra = {}) {
  return json({ success: false, error: message, ...extra }, status);
}

export class UploadController {
  constructor(env) {
    this.env = env;
    this.imgbbApiKey = env.IMGBB_API_KEY;
  }

  async uploadToImgbb(request) {
    try {
      if (!this.imgbbApiKey) {
        throw new Error('IMGBB_API_KEY no configurado');
      }

      const formData = await request.formData();
      const file = formData.get('image');

      if (!file) {
        return error('Se requiere enviar un archivo con la clave "image"', 400);
      }

      // Validar que sea un archivo de imagen
      if (!file.type.startsWith('image/')) {
        return error('El archivo debe ser una imagen', 400);
      }

      // Validar tamaño (máx 32MB según ImgBB)
      if (file.size > 32 * 1024 * 1024) {
        return error('El archivo es demasiado grande (máx 32MB)', 413);
      }

      // Crear FormData para ImgBB
      const imgbbFormData = new FormData();
      imgbbFormData.append('image', file);
      imgbbFormData.append('key', this.imgbbApiKey);

      const response = await fetch('https://api.imgbb.com/1/upload', {
        method: 'POST',
        body: imgbbFormData
      });

      const data = await response.json();

      if (!data.success) {
        return error(data.error?.message || 'Error ImgBB', 400);
      }

      return json({
        success: true,
        data: {
          url: data.data.image.url,
          thumbUrl: data.data.thumb.url,
          deleteUrl: data.data.delete_url,
          etiqueta: file.name.replace(/\.[^/.]+$/, '')
        }
      });
    } catch (err) {
      console.error('❌ Error en uploadToImgbb:', err);
      return error(err.message, 500);
    }
  }
}
