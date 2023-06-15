from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    email = data.get('email')
    userName = data.get('userName')
    password = data.get('password')

    # Instead of storing the data in a database, print it to console
    print(f"Email: {email}, Username: {userName}, Password: {password}")

    return jsonify(message="Data received successfully"), 201
