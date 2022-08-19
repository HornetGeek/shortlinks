# using flask_restful
import json
from flask import Flask, jsonify, request
from flask_restful import Resource, Api
from flask_pymongo import PyMongo
from random import choice
from bson import json_util
import string
# creating the flask app
app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb+srv://moataz:102030@cluster0.wbr56a4.mongodb.net/shortlinks"
mongo = PyMongo(app)
# creating an API object
api = Api(app)
  
# making a class for a particular resource
# the get, post methods correspond to get and post requests
# they are automatically mapped by flask_restful.
# other methods include put, delete, etc.
class shortlinks(Resource):
  
    # corresponds to the GET request.
    # this function is called whenever there
    # is a GET request for this resource
    def get(self):
        all  = list(mongo.db.shortlinks.find())
        if (len(list(mongo.db.shortlinks.find())) == 0):
            return jsonify({'data': []})
        
        return json.loads(json_util.dumps(all))
  
    # Corresponds to POST request
    def post(self):
        
        data = request.get_json()
        #data1 = json.load(data)
        try:
            slug = data['slug']
            
            if(len(list(mongo.db.shortlinks.find({'slug':slug}))) == 1):
                return jsonify({'Error': "change the slug"})
           
        except:

            slug = ''.join(choice(string.ascii_letters+string.digits) for _ in range(6))

        try:
            ios = data['ios']
            android = data['android']
            web = data['web']
        except:
            return jsonify({'Error': "please add ios,android,web"})

        mongo.db.shortlinks.insert_one({"slug":slug,"ios":ios,"android":android,"web":web})
        
        #slug = ''.join(choice(string.ascii_letters+string.digits) for _ in range(6))
        return jsonify({'data': data})
  
  
# another resource to calculate the square of a number
class shortlinks_slug(Resource):
    
    def put(self, slug):
        data = request.get_json()
        if(len(list(mongo.db.shortlinks.find({'slug':slug}))) == 0):
            return jsonify({'error': "slug doesn't found"})
        return_data = {}
        for d in data:
            if d == "slug":
                if data[str(d)] != slug:
                    return jsonify({'Error': "the slug is readonly once it’s been created, this means it can’t be update."})

            return_data = mongo.db.shortlinks.find_one_and_update(
                {"slug":slug},
                {"$set":{d:data[str(d)]}}
            )
        return_data = json.loads(json_util.dumps(return_data))
        del return_data["_id"]
        return jsonify(return_data)

# adding the defined resources along with their corresponding urls
api.add_resource(shortlinks, '/shortlinks/')
api.add_resource(shortlinks_slug, '/shortlinks/<slug>')
  
  
# driver function
if __name__ == '__main__':
  
    app.run(debug = True)