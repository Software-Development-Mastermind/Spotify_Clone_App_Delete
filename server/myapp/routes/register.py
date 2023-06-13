from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash
from flask_cors import CORS

register = Flask(__name__)
CORS(register)

@register.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()
    print(data)  # Print data to console for testing
    return {"User added succesfully"}

if __name__ == "__main__":
    register.run(host='127.0.0.1', port=5000, debug=True)
