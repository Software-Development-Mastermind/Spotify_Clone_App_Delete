# __init__.py
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/register')
def register():
    data = request.args.get("username")

    # email = data.get('email')
    # userName = data.get('userName')
    # password = data.get('password')

    # Print out the received data
    # print(f"Email: {email}, Username: {userName}, Password: {password}")

    return {"username": data}

if __name__ == "__main__":
    app.run(debug=True)
