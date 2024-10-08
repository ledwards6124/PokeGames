from flask import Flask, jsonify
from flask_restful import Api, Resource

app = Flask(__name__)
api = Api(app)


class Init(Resource):
    def get(self):
        return jsonify('Hello World!')
    
    
api.add_resource(Init, '/')

    
def main():
    app.run(debug=True)
    
if __name__ == '__main__':
    main()
