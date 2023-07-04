from flask import Flask, request, jsonify
import base64
import requests
from spotipy.oauth2 import SpotifyClientCredentials, SpotifyOAuth
import pdb

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
    client_id = 'ede4392a5dfa4b2a96e1a2333ae406ef'
    client_secret = '30880e79886848928681f17d1ac21f9e'

    auth_header = base64.b64encode(f'{client_id}:{client_secret}'.encode('ascii')).decode('ascii')

    auth_options = {
        'url': 'https://accounts.spotify.com/api/token',
        'headers': {
            'Authorization': 'Basic ' + auth_header,
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
    return token


def get_artist_id(auth_token, artist_name):
    headers = {
        'Authorization': f'Bearer {auth_token}',
    }
    
    params = {
        'q': artist_name,
        'type': 'artist',
    }

    response = requests.get('https://api.spotify.com/v1/search', headers=headers, params=params)
    
    
    results = response.json()
    import json
    print(json.dumps(results, indent=4))


    if results.get('artists').get('items'):
        finalResults = results.get('artists').get('items')[0].get('id')
        return finalResults
    else:
        return None

def get_artist_image(auth_token, artist_name):
    headers = {
        'Authorization': f'Bearer {auth_token}',
    }
    params = {
        'q': artist_name,
        'type': 'artist',
    }

    response = requests.get('https://api.spotify.com/v1/search', headers=headers, params=params)
    print("Status Code:", response.status_code)
    results = response.json()
    name_to_image = {}
    
    def clean_string(s):
        try:
            return s.encode('utf-8').decode('utf-8')
        except UnicodeEncodeError:
            return None

    for artist in results.get('artists').get('items'):
        images = artist.get('images')
        if images is not None and len(images) > 0:
            name = clean_string(artist['name'])
            image_url = clean_string(images[0]['url'])
            if name is not None and image_url is not None:
                name_to_image[name] = image_url

    import json
    with open("artists.json", "w") as outfile:
        json.dump(name_to_image, outfile)
        

    return name_to_image
    

@app.route('/artist', methods=['GET'])
def get_artist_info():
    auth_token = get_auth_token()
    artist_name = request.args.get('artist_name', default='', type=str)
    artist_id = get_artist_id(auth_token, artist_name)
    artist_name_to_image = get_artist_image(auth_token, artist_name)
    
    image_link = artist_name_to_image.get(artist_name)

    if not artist_id or not image_link:
        return {"error": f"No artist found for name '{artist_name}'."}, 404

    return jsonify({
        "name": artist_name,
        "image": image_link,
    })


if __name__ == "__main__":
    app.run(debug=True)
