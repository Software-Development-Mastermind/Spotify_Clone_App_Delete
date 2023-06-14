from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash
from flask_cors import CORS

register = Flask(__name__)
CORS(register)

@register.route('/register', methods=['POST'])
def register_user():
    return {"message": "Hello from the server!"}, 200
