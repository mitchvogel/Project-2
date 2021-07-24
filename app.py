import numpy as np

import sqlalchemy
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template
import json
import decimal, datetime


#################################################
# Database Setup
#################################################
db_string = 'postgresql://postgres:0827@localhost:5432/housing_data_db'
db = create_engine(db_string)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################

def alchemyencoder(obj):
    """JSON encoder function for SQLAlchemy special classes."""
    if isinstance(obj, datetime.date):
        return obj.isoformat()
    elif isinstance(obj, decimal.Decimal):
        return float(obj)

@app.route("/")
def landing_page():
    return render_template("index.html")

@app.route("/api/citydata")
def city():

    city_data = db.execute("SELECT * FROM city_table")

    return json.dumps([dict(r) for r in city_data], default=alchemyencoder)

@app.route("/api/statedata")
def state():

    state_data = db.execute("SELECT * FROM state_table")

    return json.dumps([dict(r) for r in state_data], default=alchemyencoder)

@app.route("/api/statecombineddata")
def state_combined():

    state_combined_data = db.execute("SELECT * FROM state_combined")

    return json.dumps([dict(r) for r in state_combined_data], default=alchemyencoder)

if __name__ == '__main__':
    app.run(debug=True)
