from flask import Flask, jsonify, request
from flask_cors import CORS
from ai import Ai

app = Flask(__name__)
ai = Ai()
CORS(app)  # This enables CORS for all routes
#CORS(app, resources={r"/api/*": {"origins": "http://reflick.co"}})

@app.route('/api/classify', methods=['POST'])
def classify_image():
    if 'image' not in request.files:
        return jsonify(error='file not provided'), 400
    file = request.files['image']
    location = request.form.get('location', '')
    if file:
        image_blob = file.read()
        prediction = ai.classify_image_gpt(image_blob)
        result = ai.generate_description_gpt(prediction, location)
        return jsonify(result=result)
    else:
        return jsonify(error='an error occurred'), 500

if __name__ == '__main__':
    app.run(debug=False)
