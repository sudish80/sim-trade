from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/save-signup', methods=['POST'])
def save_signup():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    with open("login&sign up data collection..txt", "a") as f:
        f.write(f"Signup Email: {email}\nSignup Password: {password}\n")
    return {'status': 'success'}

@app.route('/check-login', methods=['POST'])
def check_login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    found = False
    with open("login&sign up data collection..txt", "r") as f:
        lines = f.readlines()
        for i in range(len(lines)):
            if lines[i].strip() == f"Signup Email: {email}":
                if i+1 < len(lines) and lines[i+1].strip() == f"Signup Password: {password}":
                    found = True
                    break
    if found:
        return jsonify({'status': 'success'})
    else:
        return jsonify({'status': 'fail'}), 401

@app.route('/forgot-password', methods=['POST'])
def forgot_password():
    data = request.json
    email = data.get('email')
    found = False
    with open("login&sign up data collection..txt", "r") as f:
        lines = f.readlines()
        for line in lines:
            if line.strip() == f"Signup Email: {email}":
                found = True
                break
    if found:
        # In a real app, send a reset link here
        return jsonify({'status': 'success', 'message': 'Reset link sent to your email.'})
    else:
        return jsonify({'status': 'fail', 'message': 'Email not found.'}), 404

if __name__ == '__main__':
    app.run(port=5000)