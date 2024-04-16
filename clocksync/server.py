# server.py
from flask import Flask, jsonify
from flask_cors import CORS
import time

app = Flask(__name__)
CORS(app)

@app.route('/time')
def get_time():
    server_time = time.time()  # Get current server time
    return jsonify({'time': server_time})

if __name__ == '__main__':
    app.run(debug=True)
