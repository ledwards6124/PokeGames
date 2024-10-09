import json
from flask import Flask, jsonify, request
from flask_restful import Api, Resource, reqparse

app = Flask(__name__)
api = Api(app)

with open('data\pokedex.json', 'r') as f:
    POKEDEX = json.load(f)

class Quiz(Resource):
    
    __slots__ = ['__guessed', '__tries', '__elligible', '__region']
    def __init__(self, region=-1):
        self.__region = region
        if region == -1:
            self.__elligible = [p['name'] for p in POKEDEX]
        else:
            self.__elligible = [p['name'] for p in POKEDEX if p['generation'] == region ]
        self.__guessed = set()
        self.__tries = 0
        
    def __guess(self, guess):
        if isinstance(guess, str):
            guess = guess.lower().capitalize()
            if guess in self.__guessed:
                return None
            elif guess in self.__elligible:
                self.__guessed.add(guess)
                self.__tries += 1
                return guess
            
    def post(self, region):
        self.__init__(region)
        return jsonify(f'Welcome to the guessing game, you chose region {self.__region}!')
            

class Init(Resource):
    def get(self):

        return jsonify('Hello World!')
    
class Dex(Resource):
    def get(self):
        return POKEDEX
    
    
api.add_resource(Init, '/')
api.add_resource(Dex, '/dex')
api.add_resource(Quiz, '/quiz/<int:region>')

    
def main():
    app.run(debug=True)
    
if __name__ == '__main__':
    main()
