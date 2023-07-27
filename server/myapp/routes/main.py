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
    print("Response: ", response)
    print("Response JSON: ", response.json())
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
    
def get_song_id(auth_token, song_name):
    headers = {
        'Authorization': f'Bearer {auth_token}',
    }

    params = {
        'q': song_name,
        'type': 'track',
    }

    response = requests.get('https://api.spotify.com/v1/search', headers=headers, params=params)

    results = response.json()

    if results['tracks'] and results['tracks']['items']:
        finalResults = results['tracks']['items'][0]['id']
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

def get_song_image(auth_token, song_name):
    headers = {
        'Authorization': f'Bearer {auth_token}',
    }
    params = {
        'q': song_name,
        'type': 'track',
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

    tracks = results.get('tracks')
    if tracks is not None:
        items = tracks.get('items')
        if items is not None:
            for track in items:
                images = track.get('images')
                if images is not None and len(images) > 0:
                    name = clean_string(track['name'])
                    image_url = clean_string(images[0]['url'])
                    if name is not None and image_url is not None:
                        name_to_image[name] = image_url

    return name_to_image

def get_top_track(auth_token, artist_id):
    headers = {
        'Authorization': f'Bearer {auth_token}',
    }
    params = {
        'market': 'US', 
    }

    response = requests.get(f'https://api.spotify.com/v1/artists/{artist_id}/top-tracks', headers=headers, params=params)
    response.raise_for_status()  
    results = response.json()

    if results.get('tracks'):
        first_track = results.get('tracks')[0]

        track_name = first_track.get('name')
        track_image = first_track['album']['images'][0]['url'] if first_track['album']['images'] else None

        return {
            "track_name": track_name,
            "track_image": track_image,
        }
    else:
        return None


def get_artist_page(auth_token, artist_id):
    headers = {
        'Authorization': f'Bearer {auth_token}',
    }

    response = requests.get(f'https://api.spotify.com/v1/artists/{artist_id}', headers=headers)
    response.raise_for_status()  
    results = response.json()

    artist_page = results.get('external_urls', {}).get('spotify', '') 

    return {
            "artist_page": artist_page
        }

def get_top_song(auth_token, song_id):
    headers = {
        'Authorization': f'Bearer {auth_token}',
    }

    response = requests.get(f'https://api.spotify.com/v1/tracks/{song_id}', headers=headers)
    response.raise_for_status()  
    results = response.json()
    
    if results.get('tracks'):
        popularity = results.get("popularity")
        track_name = results.get("tracks")[0].get("name")
        track_image = results.get("tracks")[0].get("album").get(
        "images", [])[0].get("url")
        song_page = results.get("tracks")[0].get("external_urls").get("spotify")
        if popularity == max(results.get("popularity")):
            return {"track_name": track_name, "track_image": track_image, "song_page": song_page}
        
def get_song_page(auth_token, song_id):
    headers = {
        'Authorization': f'Bearer {auth_token}',
    }

    response = requests.get(f'https://api.spotify.com/v1/artists/{song_id}', headers=headers)
    response.raise_for_status()  
    results = response.json()

    song_page = results.get('external_urls', {}).get('spotify', '') 

    return {
            "song_page": song_page
        }


def get_album(auth_token, album_id):
    headers = {
        'Authorization': f'Bearer {auth_token}',
    }

    response = requests.get(f"https://api.spotify.com/v1/albums/{album_id}", headers=headers)
    response.raise_for_status()  
    results = response.json()

    album_name = results.get("name")
    album_image = results.get("images", [])[0].get("url")

    return {"album_name": album_name, "album_image": album_image}

def get_album_id(auth_token, album_name):
    headers = {
        'Authorization': f'Bearer {auth_token}',
    }
    params = (
        ('q', album_name),
        ('type', 'album'),
    )
    response = requests.get('https://api.spotify.com/v1/search', headers=headers, params=params)
    response.raise_for_status()
    results = response.json()
    album_id = results['albums']['items'][0]['id']
    return album_id

def get_album_image(auth_token, album_id):
    headers = {
        'Authorization': f'Bearer {auth_token}',
    }
    response = requests.get(f'https://api.spotify.com/v1/albums/{album_id}', headers=headers)
    response.raise_for_status()
    results = response.json()
    image_link = results['images'][0]['url']
    return image_link

def get_album_page(auth_token, album_id):
    headers = {
        'Authorization': f'Bearer {auth_token}',
    }
    response = requests.get(f'https://api.spotify.com/v1/albums/{album_id}', headers=headers)
    response.raise_for_status()
    results = response.json()
    album_page = results['external_urls']['spotify']
    return album_page


@app.route('/artist', methods=['GET'])
def get_artist_info():
    auth_token = get_auth_token()
    artist_name = request.args.get('artist_name', default='', type=str)
    artist_id = get_artist_id(auth_token, artist_name)
    artist_name_to_image = get_artist_image(auth_token, artist_name)
    top_track = get_top_track(auth_token, artist_id)
    
    image_link = artist_name_to_image.get(artist_name)

    artist_page = get_artist_page(auth_token, artist_id)

    if not artist_id or not image_link:
        return {"error": f"No artist found for name '{artist_name}'."}, 404

    return jsonify({
        "name": artist_name,
        "image": image_link,
        "top_track": top_track,
        "artist_page": artist_page
    })


@app.route('/song', methods=['GET'])
def get_song_info():
    auth_token = get_auth_token()
    print("auth_token", auth_token)
    song_name = request.args.get('song_name', default='', type=str)
    song_id = get_song_id(auth_token, song_name)
    song_name_to_image = get_song_image(auth_token, song_name)
    
    image_link = song_name_to_image.get(song_name)

    song_page = get_song_page(auth_token, song_id)

    if not song_id or not image_link:
        return {"error": f"No artist found for name '{song_name}'."}, 404

    return jsonify({
        "name": image_link,
        "image": song_name,
        "song_page": song_page
    })


@app.route('/album', methods=['GET'])
def get_album_info():
    auth_token = get_auth_token()
    album_name = request.args.get('album_name', default='', type=str)
    album_id = get_album_id(auth_token, album_name)
    album_name_to_image = get_album_image(auth_token, album_name)
    
    image_link = album_name_to_image.get(album_name)

    album_page = get_album_page(auth_token, album_id)

    if not album_id or not image_link:
        return {"error": f"No album found for name '{album_name}'."}, 404

    return jsonify({
        "name": image_link,
        "image": album_name,
        "album_page": album_page
    })



if __name__ == "__main__":
    app.run(debug=True)
