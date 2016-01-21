import json
from flask import Flask
import pynsweeper

app = Flask(__name__)

@app.route("/board/<int:board_size>/<int:bomb_count>")
def index(board_size, bomb_count):
    return json.dumps(pynsweeper.create_board(board_size, bomb_count))

if __name__ == "__main__":
    app.run(debug=True)
