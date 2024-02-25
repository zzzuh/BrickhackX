from flask import Flask, jsonify, request
from flask_cors import CORS
from ai import Ai

app = Flask(__name__)
ai = Ai()
CORS(app)  # This enables CORS for all routes

@app.route('/api/test')
def get_data():
    return jsonify({'data': 'Hello from Flask!'})

@app.route('/api/classify', methods=['POST'])
def classify_image():
    if 'file' not in request.files:
        return jsonify(error='file not provided'), 400
    
    file = request.files['file']
    if file:
        image_blob = file.read()
        predictions = ai.classify_image(image_blob)
        predictions = ai.test_classify_image()
        return jsonify(predictions=predictions)
    else:
        return jsonify(error='an error occurred'), 500

if __name__ == '__main__':
    app.run(debug=True)