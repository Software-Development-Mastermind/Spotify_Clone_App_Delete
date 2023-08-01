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

    response = requests.get('https://api.spotify.com/v1/search', headers=headers, params=params)
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
    response = requests.get('https://api.spotify.com/v1/search', headers=headers, params=params)
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
    
}



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
    auth_token = get_auth_token()



if __name__ == "__main__":
    app.run(debug=True)
