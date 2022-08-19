# using flask_restful
from http import server
from flask import redirect , request
from db import *
import json
from flask import  jsonify, request
from flask_restful import Resource, Api
from random import choice
from bson import json_util
import string


  
# making a class for a particular resource
# the get, post methods correspond to get and post requests
# they are automatically mapped by flask_restful.
# other methods include put, delete, etc.
class Shortlinks(Resource):
  
    # corresponds to the GET request.
    # this function is called whenever there
    # is a GET request for this resource
    def get(self):
        all  = get_data()
        if (len(list(get_data())) == 0):
            return []

        return json.loads(json_util.dumps(all))
  
    # Corresponds to POST request
    def post(self):
        
        data = request.get_json()
        #data1 = json.load(data)
        try:
            slug = data['slug']
            
            if(len(list(filter({'slug':slug}))) == 1):
                return {'Error': "change the slug"},400 #bad request
           
        except:

            slug = ''.join(choice(string.ascii_letters+string.digits) for _ in range(6))

        try:
            ios = data['ios']
            android = data['android']
            web = data['web']
        except:
            return {'Error': "please add ios,android,web"}, 400 #bad request

        insert_data({"slug":slug,"ios":ios,"android":android,"web":web})
        
        #slug = ''.join(choice(string.ascii_letters+string.digits) for _ in range(6))
        return jsonify({'data': data})
  
  
class ShortlinksSlug(Resource):
    
    def put(self, slug):
        data = request.get_json()
        if(len(list(filter({'slug':slug}))) == 0):
            return jsonify({'error': "slug doesn't found"})
        return_data = {}
        for prim_key in data:
            if prim_key == "slug":
                if data[str(prim_key)] != slug:
                    return {'Error': "the slug is readonly once it’s been created, this means it can’t be update."},400 #bad request

            return_data = find_and_update(
                {"slug":slug},
                {"$set":{prim_key:data[str(prim_key)]}}
            )

        return_data = json.loads(json_util.dumps(return_data))
        del return_data["_id"]
        return jsonify(return_data)


class Slug(Resource):
    
    def get(self, slug):
        data = find_one({'slug':slug})
        print(data)
        url = data['web']
        agent = request.headers.get('User-Agent')

        if "android" in agent.lower():
            if data['android']['primary']:
                url = data['android']['primary']
            else:
                url = data['android']['fallback']

        if "iphone" in agent.lower():
            if data['ios']['primary']:
                url = data['ios']['primary']
            else:
                url = data['ios']['fallback']

        return redirect(url, code=302)


  
