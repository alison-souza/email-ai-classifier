# app.py
from dotenv import load_dotenv
load_dotenv()

from flask import Flask, request, jsonify
from flask_cors import CORS
from services.classifier import classify_email
from services.responder import generate_response
from services.file_reader import read_file
from services.nlp_processor import preprocess_text

app = Flask(__name__)
CORS(app)

@app.route("/process", methods=["POST"])
def process_email():
    # aceita JSON ou form-data
    if request.is_json:
        text = request.json.get("text", "").strip()
    else:
        text = request.form.get("text", "").strip()

    if "file" in request.files:
        file = request.files["file"]
        text = read_file(file)

    if not text:
        return jsonify({"error": "O arquivo não contém texto válido."}), 400

    processed_text = preprocess_text(text)

    try:
        category = classify_email(processed_text)
        response_text = generate_response(processed_text, category)
    except Exception as e:
        return jsonify({"error": "Erro ao processar o email", "details": str(e)}), 500

    return jsonify({
        "category": category,
        "response": response_text
    })

if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 5000))  # porta dinâmica
    app.run(host="0.0.0.0", port=port)
