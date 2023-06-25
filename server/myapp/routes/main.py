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

    # import json
    # with open("artistDetails.json", "w") as outfile:
    #     json.dump(response.json(), outfile)

    # print("Status Code:", response.status_code)
    # print("Response Body:", response.json())
    results = response.json()
    name_to_image = {}
    
    def clean_string(s):
        return s.replace('\u2215', '/').encode('utf-8', 'replace').decode('utf-8')

    for artist in results.get('artists').get('items'):
        images = artist.get('images')
    if images is not None and len(images) > 0:
        name = clean_string(artist['name'])
        image_url = clean_string(images[0]['url'])
        name_to_image[name] = image_url
        print(name_to_image)


    
    import json
    with open("artists.json", "w") as outfile:
        json.dump(name_to_image, outfile)
    return name_to_image

auth_token = get_auth_token()
artist_name_to_image = get_artist_id(auth_token, "P!nk")
image_link = artist_name_to_image.get('P!nk')


@app.route('/artist', methods=['GET'])
def get_artist_info():
    artist_name = request.args.get('artist_name', default='', type=str)
    sp = get_spotify_client()
    artist_id = get_artist_id(sp, artist_name)
    pdb.set_trace()

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
