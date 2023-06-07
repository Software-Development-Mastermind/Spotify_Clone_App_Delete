from flask import Flask
from routes import login, register

app = Flask(__name__)
app.register_blueprint(login.bp)
app.register_blueprint(register.bp)

if __name___ == "__main__":
    app.run(debug=True)

from myapp import routes
