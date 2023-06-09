from flask import Blueprint, request, jsonify
from flask_oauthlib import OAuth2Client
from werkzeug.security import generate_password_hash
from users import users  # replace with your actual database module

bp = Blueprint('register', __name__)

oauth = OAuth2Client('google')

@bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    if username in users:
        return jsonify({'error': 'User already exists'}), 400

    # Create a new user in the database
    users[username] = generate_password_hash(password)

    # Create a new Google OAuth 2 token for the user
    token = oauth.create_token(username, password)

    # Return the user's token
    return jsonify({'token': token}), 201
