from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash
from users import users  # replace with your actual database module

bp = Blueprint('register', __name__)

@bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    if username in users:
        return jsonify({'error': 'User already exists'}), 400

    users[username] = generate_password_hash(password)
    return jsonify({'success': 'User created successfully'}), 201
