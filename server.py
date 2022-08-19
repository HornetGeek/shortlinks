from flask_restful import Resource, Api
from handlers import Shortlinks,ShortlinksSlug,Slug
from app import app




api = Api(app)


# adding the defined resources along with their corresponding urls
api.add_resource(Shortlinks, '/shortlinks/')
api.add_resource(ShortlinksSlug, '/shortlinks/<slug>')
api.add_resource(Slug, '/<slug>/')



# driver function
if __name__ == '__main__':
  
    app.run(debug = True)
