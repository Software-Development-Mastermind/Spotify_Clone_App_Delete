from flask import Flask, request, jsonify
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

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

sp = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials(client_id='ede4392a5dfa4b2a96e1a2333ae406ef', client_secret='30880e79886848928681f17d1ac21f9e'))

@app.route('/artist', methods=['GET'])
def get_artist_info():
    artist_id = request.args.get('artist_id', default = '', type = str) 
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
