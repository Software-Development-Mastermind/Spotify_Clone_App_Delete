from flask import Flask, request, jsonify
import base64
import requests
from spotipy.oauth2 import SpotifyClientCredentials, SpotifyOAuth
import pdb
import random
import logging
import time

app = Flask(__name__)

logging.basicConfig(level=logging.DEBUG)

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

    response = requests.get(f'https://api.spotify.com/v1/search', headers=headers, params=params)
    
    
    results = response.json()
    import json
    print(json.dumps(results, indent=4))

    if results.get('artists').get('items'):
        finalResults = results.get('artists').get('items')[0].get('id')
        return finalResults
    else:
        return None


def get_artist_image(auth_token, artist_id):
    headers = {
        'Authorization': f'Bearer {auth_token}',
    }

    response = requests.get(f'https://api.spotify.com/v1/artists/{artist_id}', headers=headers)
    print("Status Code:", response.status_code)
    artist = response.json()

    def clean_string(s):
        try:
            return s.encode('utf-8').decode('utf-8')
        except UnicodeEncodeError:
            return None

    images = artist.get('images', [])
    if images:
        image_url = images[0].get('url', '')

        name = clean_string(artist.get('name', None))
        image_url = clean_string(image_url)
        if name and image_url:
            return {name: image_url}
    return {}


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
        

def get_song_id(auth_token, song_name):
    headers = {
        'Authorization': f'Bearer {auth_token}',
    }

    params = {
        'q': song_name,
        'type': 'track',
    }

    response = requests.get(f'https://api.spotify.com/v1/search', headers=headers, params=params)
    print(response)
    results = response.json()
    print("result", results)
    
    if results['tracks'] and results['tracks']['items']:
        finalResults = results['tracks']['items'][0]['id']
        print("finalResults", finalResults)
        return finalResults
    
    else:
        return None

def get_song_image(auth_token, song_id):
    headers = {
        'Authorization': f'Bearer {auth_token}',
    }

    response = requests.get(f'https://api.spotify.com/v1/tracks/{song_id}', headers=headers)
    print("Status Code:", response.status_code)
    track = response.json()

    def clean_string(s):
        try:
            return s.encode('utf-8').decode('utf-8')
        except UnicodeEncodeError:
            return None

    album = track.get('album', {})
    images = album.get('images', [])
    if images:
        image_url = images[0].get('url', '')
        print("image_url", image_url)

        name = clean_string(track.get('name', None))
        image_url = clean_string(image_url)
        if name and image_url:
            return {name: image_url}
    return {}



def get_song_page(auth_token, song_id):
    headers = {
        'Authorization': f'Bearer {auth_token}',
    }

    response = requests.get(f'https://api.spotify.com/v1/tracks/{song_id}', headers=headers)
    response.raise_for_status()  
    results = response.json()

    song_page = results.get('external_urls', {}).get('spotify', '') 

    return {
            "song_page": song_page
        }


def get_album_id(auth_token, album_name):
    headers = {
        'Authorization': f'Bearer {auth_token}',
    }
    params = {
        'q': album_name,
        'type': 'album',
    }
    response = requests.get(f'https://api.spotify.com/v1/search', headers=headers, params=params)
    response.raise_for_status()
    results = response.json()
    
    if len(results['albums']['items']) > 0:
        album_id = results['albums']['items'][0]['id']
        print(album_id)
        return album_id
    else:
        print("No album found for the search term.")
        return None


def get_album_image(auth_token, album_id):
    headers = {
        'Authorization': f'Bearer {auth_token}',
    }
    response = requests.get(f'https://api.spotify.com/v1/albums/{album_id}', headers=headers)
    print("Status Code:", response.status_code)
    album = response.json()

    def clean_string(s):
        try:
            return s.encode('utf-8').decode('utf-8')
        except UnicodeEncodeError:
            return None

    images = album.get('images', [])
    if images:
        image_url = images[0].get('url', '')
        print("image_url", image_url)

        name = clean_string(album.get('name', None))
        image_url = clean_string(image_url)
        if name and image_url:
            return {name: image_url}
    return {}


def get_album_page(auth_token, album_id):
    headers = {
        'Authorization': f'Bearer {auth_token}',
    }
    response = requests.get(f'https://api.spotify.com/v1/albums/{album_id}', headers=headers)
    response.raise_for_status()
    results = response.json()
    
    album_page = results.get('external_urls', {}).get('spotify')
    if album_page:
        print("album_page", album_page)
        return { 
            "album_page": album_page 
            }
    else:
        print("No external Spotify page found for this album.")
        return None

my_favorite_artists = {
    "Kendrick_Lamar" : "2YZyLoL8N0Wb9xBt1NhZWg",
    "Felukah" : "0nmukaO2zzwRPEevPJph1F",
    "El_Rass" : "70JnprmV5bM5nyZ8YeZbDc", 
    "Jhené_Aiko" : "5ZS223C6JyBfXasXxrRqOk",
    "Sea_Power" : "5zhn89Em2jWUUWdpcLO3YL"
}

def get_random_artist_track(auth_token, fav_artists):
    headers = {
        'Authorization': f'Bearer {auth_token}',
    }
    
    artist_id = random.choice(list(fav_artists.values()))
    print("aritst_id", artist_id)

    response_albums = requests.get(f'https://api.spotify.com/v1/artists/{artist_id}/albums', headers=headers)
    albums_data = response_albums.json()
    if not albums_data['items']:
        return {"error": f"No albums found for artist '{artist_id}'."}, 404

    print("albums_data", albums_data)

    random_album = random.choice(albums_data['items'])
    print("random_album", random_album)

    response_tracks = requests.get(f'https://api.spotify.com/v1/albums/{random_album["id"]}/tracks', headers=headers)
    tracks_data = response_tracks.json()
    if not tracks_data['items']:
        return {"error": f"No tracks found for album '{random_album['id']}'."}, 404
    print("tracks_data", tracks_data)

    random_track = random.choice(tracks_data['items'])
    print("random_track", random_track)

    images_data = random_album['images'][0]['url']
    print("images_data", images_data)

    response_name = random_track.get("name", "")
    print("response_name", response_name)

    response_link = random_track.get('external_urls', {}).get('spotify')
    print("response_link", response_link)

    if not random_track:
        raise Exception("No track found by name of '{response_track}")
    if not response_name:
        raise Exception("No track found by name of '{response_track}")
    if not response_link:
        raise Exception("No track found by name of '{response_track}")

    return {
        "random_track": random_track,
        "response_image": images_data,
        "response_name": response_name,
        "response_link": response_link
    }

def get_five_random_tracks(auth_token, fav_artists):
    tracks = []
    for _ in range(5):
        track_info = get_random_artist_track(auth_token, fav_artists)
        
        if 'error' in track_info:
            continue
        
        tracks.append(track_info)
        artist_id = track_info["random_track"]['artists'][0]['id']
        if artist_id in fav_artists.values():
            fav_artists = {k: v for k, v in fav_artists.items() if v != artist_id}
        
        if not fav_artists:
            break

    return tracks



@app.route('/artist', methods=['GET'])
def get_artist_info():
    auth_token = get_auth_token()
    artist_name = request.args.get('artist_name', default='', type=str)
    artist_id = get_artist_id(auth_token, artist_name)
    artist_name_to_image = get_artist_image(auth_token, artist_id)
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
    song_name_to_image = get_song_image(auth_token, song_id)
    print("song_name_to_image", song_name_to_image)
    image_link = song_name_to_image.get(song_name)
    print("image_link", image_link)
    song_page = get_song_page(auth_token, song_id)
    print("song_page", song_page)
    
    if not song_id or not image_link:
        return {"error": f"No artist found for name '{song_name}'."}, 404

    return jsonify({
        "name": song_name,
        "image": image_link,
        "song_page": song_page
    })


@app.route('/album', methods=['GET'])
def get_album_info():
    auth_token = get_auth_token()
    album_name = request.args.get('album_name', default='', type=str)
    album_id = get_album_id(auth_token, album_name)
    album_name_to_image = get_album_image(auth_token, album_id)

    print("album_name_to_image", album_name_to_image)
    image_link = album_name_to_image.get(album_name)
    print("image_link", image_link)

    album_page = get_album_page(auth_token, album_id)


    if not album_id or not image_link:
        return {"error": f"No album found for name '{album_name}'."}, 404

    return jsonify({
        "name": album_name ,
        "image": image_link,
        "album_page": album_page
    })

@app.route('/randomArtists', methods=['GET'])
def get_random_artists_info():
    logging.debug('/randomArtists')
    logging.debug('Processing /randomArtists request...')
    auth_token = get_auth_token()
    random_artist_track_info = get_five_random_tracks(auth_token, my_favorite_artists)
    print("random_artist_track_info", random_artist_track_info)

    return random_artist_track_info
if __name__ == "__main__":
    app.run(debug=True)
