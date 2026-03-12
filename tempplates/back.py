from flask import Flask, request, jsonify
from flask_cors import CORS
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests

app = Flask(__name__)
CORS(app)  # Para que el frontend pueda comunicarse

CLIENT_ID = "PEGA_AQUI_TU_CLIENT_ID"  # El mismo que usaste en el HTML

@app.route("/login", methods=["POST"])
def login():
    # 1. Recibe el token del frontend
    data = request.get_json()
    token = data.get("idToken")

    if not token:
        return jsonify({"error": "No token"}), 400

    try:
        # 2. Le pregunta a Google si el token es válido
        info = id_token.verify_oauth2_token(
            token,
            google_requests.Request(),
            CLIENT_ID
        )

        # 3. Si llega aquí = token válido, extrae los datos
        email  = info["email"]
        nombre = info["name"]
        foto   = info["picture"]

        # 4. Devuelve los datos al frontend
        return jsonify({
            "ok": True,
            "email":  email,
            "nombre": nombre,
            "foto":   foto
        })

    except Exception as e:
        # Token inválido o expirado
        return jsonify({"error": "Token inválido", "detalle": str(e)}), 401


if __name__ == "__main__":
    app.run(port=8000, debug=True)