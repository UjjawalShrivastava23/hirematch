from flask import Flask ,jsonify,request
from flask_cors import CORS
from parser import extract_text
from analyzer import match_score , get_matched_skills


app = Flask(__name__)
CORS(app)
@app.route('/health')
def health():
    return jsonify({"status" :"ok"}) 


@app.route('/analyze' , methods=['POST'])
def analyze():
    resume_file = request.files['resume']
    job_description = request.form['job_description']

    file_bytes = resume_file.read()
    resume_text = extract_text(file_bytes)

    score = match_score(resume_text,job_description)
    matched, missing = get_matched_skills(resume_text, job_description)
    return jsonify({
    "score": score,
    "matched_skills": matched,
    "missing_skills": missing
   })
if __name__ =='__main__':
    app.run(port=5001,debug=True)