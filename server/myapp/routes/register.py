from flask import Flask, requests

app = Flask(__name__)


@app.route('/login')
def login():
    return {'status': 'Login Successful'}

@app.route('/register')
def register():
    return {'status': 'Registration Successful'}

@app.route('/songs')
def songs():

    url = "spotify.com/songs"
    response = requests.get(url)

    return response.data

if "__name__" == "__main__":
    app.run(debug=True)
