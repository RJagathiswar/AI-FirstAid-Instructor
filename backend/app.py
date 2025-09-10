from flask import Flask, request, jsonify
from flask_cors import CORS
import json, difflib, os

app = Flask(__name__)
CORS(app)

with open("knowledge_base.json", "r") as f:
    KB = json.load(f)

KB_KEYS = list(KB.keys())

def find_best_match(query, cutoff=0.5):
    if not query:
        return None
    q = query.lower().strip()
    for key in KB_KEYS:
        if q in key:
            return key
    matches = difflib.get_close_matches(q, KB_KEYS, n=1, cutoff=cutoff)
    if matches:
        return matches[0]
    words = q.split()
    best = None
    best_score = 0
    for key in KB_KEYS:
        score = sum(1 for w in words if w in key)
        if score > best_score:
            best_score = score
            best = key
    return best if best_score > 0 else None

@app.route("/api/lookup", methods=["POST"])
def lookup():
    data = request.get_json() or {}
    q = data.get("q", "").strip()
    if not q:
        return jsonify({"message":"Empty query"}), 400
    match = find_best_match(q)
    if match:
        return jsonify({"match": match, "steps": KB[match]})
    return jsonify({"message":"No match found in local knowledge base"}), 404

@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"ok": True, "status": "backend running (offline KB)"})

if __name__ == "__main__":
    host = os.environ.get("HOST", "0.0.0.0")
    port = int(os.environ.get("PORT", 5000))
    app.run(host=host, port=port)
