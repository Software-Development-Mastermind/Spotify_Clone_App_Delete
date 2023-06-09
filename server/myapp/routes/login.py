from flask import Blueprint, request, jsonify
from flask_oauthlib import OAuth2Client
from werkzeug.security import check_password_hash
from importlib import import_module

users = import_module('users')

bp = Blueprint('login', __name__)

oauth = OAuth2Client('google')

@bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    # Get the user's Google OAuth 2 token
    token = oauth.get_access_token(username, password)

    # Check if the user exists in the database
    if username in users:
        # Check if the user's Google OAuth 2 token is valid
        if oauth.check_token(token):
            # Login the user
            return jsonify({'success': 'Logged in successfully'}), 200
        else:
            return jsonify({'error': 'Invalid Google OAuth 2 token'}), 400
    else:
        return jsonify({'error': 'Invalid username or password'}), 400
