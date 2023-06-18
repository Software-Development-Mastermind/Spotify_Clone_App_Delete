from flask import Flask, request, jsonify, spotipy

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

@app.route('/artist_info', methods=['GET'])
def get_artist_info(artist_id):
    artist = spotipy.artist(artist_id)
    return {
        "name": artist["name"],
        "image": artist["images"][0]["url"],
    }

artist_info = get_artist_info("36g923P69tXd5X8c41tE8r")

print(artist_info)


if __name__ == "__main__":
    app.run(debug=True)
