from flask import Flask

app = Flask(__name__)


@app.route('/login')
def login():
    return {'status': 'Login Successful'}

@app.route('/register')
def register():
    return {'status': 'Registration Successful'}

@app.route('/songs')
def songs():
    return {
        "data": [
            {"name": "song1",
             "artist": "artist1"},
            {"name": "song2"}
        ]
    }

if "__name__" == "__main__":
    app.run(debug=True)
