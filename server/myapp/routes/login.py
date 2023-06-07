from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash
from your_database_module import users  # replace with your actual database module

bp = Blueprint('login', __name__)

@bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    if username in users and check_password_hash(users[username], password):
        return jsonify({'success': 'Logged in successfully'}), 200
    else:
        return jsonify({'error': 'Invalid username or password'}), 400
