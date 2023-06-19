from flask import Flask, request, jsonify
import base64
import requests
from spotipy.oauth2 import Spotify

app = Flask(__name__)
     
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    print('Received data:', data) # Log the received data

    email = data.get('email')
    userName = data.get('userName')
    password = data.get('password')

    print(f"Email: {email}, Username: {userName}, Password: {password}")

    response = jsonify(message="Data received successfully")
    print('Sending response:', response) # Log the response
    return response, 201

def get_auth_token():
    client_id = 'CLIENT_ID'
    client_secret = 'CLIENT_SECRET'

    auth_header = base64.b64encode(f'{client_id}:{client_secret}'.encode('ascii')).decode('ascii')

    auth_options = {
        'url': 'https://accounts.spotify.com/api/token',
        'headers': {
            'Authorization': f'Basic {auth_header}',
        },
        'data': {
            'grant_type': 'client_credentials',
        },
    }

    response = requests.post(**auth_options)
    response.raise_for_status()  # Raises a HTTPError if the status is 4xx, 5xx

    return response.json()['access_token']


def get_spotify_client():
    token = get_auth_token()
    return Spotify(auth=token)


def get_artist_id(sp, artist_name):
    results = sp.search(q=artist_name, type='artist')
    artist_items = results['artists']['items']
    if not artist_items:
        return None
    return artist_items[0]['id']


@app.route('/artist', methods=['GET'])
def get_artist_info():
    artist_name = request.args.get('artist_name', default='', type=str)
    sp = get_spotify_client()
    artist_id = get_artist_id(sp, artist_name)

    if not artist_id:
        return {"error": f"No artist found for name '{artist_name}'."}, 404

    artist = sp.artist(artist_id)

    # Error handling in case the artist has no images
    if not artist["images"]:
        return {"error": "No images found for this artist."}, 404

    return jsonify({
        "name": artist["name"],
        "image": artist["images"][0]["url"],
    })


if __name__ == "__main__":
    app.run(debug=True)