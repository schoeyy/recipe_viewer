from flask import Flask, render_template, send_from_directory, jsonify
import json
import os

app = Flask(__name__)

# Configuration
IMAGE_FOLDER = "/app/static/images"
METADATA_FILE = "/app/static/metadata.json"

# Load metadata
def load_metadata():
    if os.path.exists(METADATA_FILE):
        with open(METADATA_FILE, "r") as f:
            return json.load(f)
    return {}

recipes = load_metadata()

@app.route("/")
def index():
    return render_template("index.html", recipes=recipes)

@app.route("/images/<filename>")
def images(filename):
    file_path = os.path.join(IMAGE_FOLDER, filename)
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}") 
    return send_from_directory(IMAGE_FOLDER, filename)

@app.route("/api/recipes")
def get_recipes():
    return jsonify(recipes)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
