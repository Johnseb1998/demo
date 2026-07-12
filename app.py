from flask import Flask, request, jsonify, send_from_directory
import os

from flask import request, jsonify
import json
import datetime

@app.route('/api/save_assessment', methods=['POST'])
def save_assessment():
    try:
        data = request.json
        
        # Extract data from the frontend
        test_type = data.get('test_type')
        score = data.get('total_score')
        answers = data.get('raw_answers')
        
        # Save to a database or a secure JSON file
        # For this example, we append it to a local log file
        log_entry = {
            "timestamp": str(datetime.datetime.now()),
            "test_type": test_type,
            "score": score,
            "answers": answers
        }
        
        with open("patient_assessments.json", "a") as file:
            file.write(json.dumps(log_entry) + "\n")
            
        print(f"Saved {test_type} assessment with score {score}.")
        
        return jsonify({"status": "success", "message": "Assessment saved securely"}), 200
        
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

app = Flask(__name__, static_folder='.', static_url_path='')
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Serve HTML files
@app.route('/')
def home():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_files(path):
    return send_from_directory('.', path)

# Handle Form Upload
@app.route('/api/career', methods=['POST'])
def handle_career():
    name = request.form.get('name')
    cv_file = request.files.get('cv')
    
    if cv_file:
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], f"{name.replace(' ', '_')}_{cv_file.filename}")
        cv_file.save(filepath)
        return f"<h3>Application successful, {name}.</h3><a href='/index.html'>Go Home</a>"
    return "Error uploading file.", 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)