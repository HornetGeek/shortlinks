from flask_pymongo import PyMongo
from curses import init_color
from app import app
import os
  
app.config["MONGO_URI"] = os.environ['MONGO_URI']
mongo = PyMongo(app)

def get_data():
    return mongo.db.shortlinks.find()


def filter(filter):
    return mongo.db.shortlinks.find(filter)

def find_one(filter):    
    return mongo.db.shortlinks.find_one(filter)
    
def insert_data(data):
    mongo.db.shortlinks.insert_one(data)


def find_and_update(key, data):
    return mongo.db.shortlinks.find_one_and_update(key,data)