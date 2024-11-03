from flask import Flask
from flask_restful import Api
from endpoints import Init, Dex, NamingQuiz
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
api = Api(app)


    
    
api.add_resource(Init, '/')
api.add_resource(Dex, '/dex')
api.add_resource(NamingQuiz, '/quiz')


    
def main():
    app.run()
    
if __name__ == '__main__':
    main()
