import numpy as np

import sqlalchemy
from sqlalchemy import create_engine, func

from flask import Flask, jsonify
import json
import decimal, datetime


#################################################
# Database Setup
#################################################
db_string = 'postgresql://postgres:0827@localhost:5432/housing_data_db'
db = create_engine(db_string)


state_data = db.execute("SELECT * FROM state_table")  
state_combined_data = db.execute("SELECT * FROM state_combined")  


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
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/citydata<br/>"
    )

@app.route("/api/citydata")
def names():

    city_data = db.execute("SELECT * FROM city_table")
    print(city_data)

    return json.dumps([dict(r) for r in city_data], default=alchemyencoder)

if __name__ == '__main__':
    app.run(debug=True)
