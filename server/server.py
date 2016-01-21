import json
from flask import Flask
import pynsweeper

app = Flask(__name__)

@app.route("/board")
def index():
    return json.dumps(pynsweeper.create_board(10, 20))

if __name__ == "__main__":
    app.run(debug=True)
