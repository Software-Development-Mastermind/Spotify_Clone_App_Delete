from flask import Flask, request, jsonify
from flask_oauthlib import OAuth2Client
from werkzeug.security import generate_password_hash
from importlib import import_module
from flask_cors import CORS
import sys

register = Flask(__name__)
CORS(register)

@register.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()
    print(data)  # Print data to console for testing
    return {"User added succesfully"}
