from flask import Blueprint, request, jsonify
import base64
import requests
import json

bp = Blueprint('genre', __name__)

CLIENT_ID = "your_spotify_client_id"
CLIENT_SECRET = "your_spotify_client_secret"

@bp.route('/genre', methods=['POST'])
def genre():
    # 1. Obtain a token from Spotify API
    token_url = "https://accounts.spotify.com/api/token"
    token_data = {
        "grant_type": "client_credentials"
    }
    client_creds = f"{CLIENT_ID}:{CLIENT_SECRET}"
    client_creds_b64 = base64.b64encode(client_creds.encode())
    token_headers = {
        "Authorization": f"Basic {client_creds_b64.decode()}"
    }
    r = requests.post(token_url, data=token_data, headers=token_headers)
    token_response_data = r.json()
    access_token = token_response_data['access_token']

    # 2. Use this token to call the Spotify API
    headers = {
        "Authorization": f"Bearer {access_token}"
    }
    endpoint = "https://api.spotify.com/v1/browse/new-releases" # change this to the actual Spotify endpoint you want
    data = requests.get(endpoint, headers=headers).json()

    return jsonify(data)
