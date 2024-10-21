from flask import jsonify, request
import json
from flask_restful import Resource
import requests

from games import GuessingGame


with open('data\pokedex.json', 'r') as f:
    POKEDEX = json.load(f)
    
TYPES = [
    'Normal',
    'Fire',
    'Water',
    'Electric',
    'Grass',
    'Ice',
    'Fighting',
    'Poison',
    'Ground',
    'Flying',
    'Psychic',
    'Bug',
    'Rock',
    'Ghost',
    'Dragon',
    'Steel',
    'Dark',
    'Fairy'
]

def sanitize_name(name):
    name = name.lower().capitalize()
    if ' ' in name:
        name = name.split(' ')
        for i in range(len(name)):
            name[i] = name[i].capitalize()
        name = ' '.join(name)
    return name
            
class NamingQuiz(Resource):
    
    quiz = GuessingGame()
    
    def get(self):
        stats = {
            'score': NamingQuiz.quiz.get_score(),
            'guessed': list(NamingQuiz.quiz.get_guessed())
        }
        return jsonify(stats)
    
    def delete(self):
        return NamingQuiz.quiz.reset()
    
    def post(self):
        name = request.args.get('name')
        return NamingQuiz.quiz.guess(name)
            

class Init(Resource):
    def get(self):

        return jsonify('Hello World!')
    
class Dex(Resource):
    def __get_by_name(self, name):
        """
        Returns a Pokemon dictionary matching the given name
        Parameters:
            name (str): The name to filter by
        Returns:
            A Pokemon dictionary or a json object with an error message
        """
        name = name.lower().capitalize()
        if ' ' in name:
            name = name.split(' ')
            for i in range(len(name)):
                name[i] = name[i].capitalize()
            name = ' '.join(name)
        for p in POKEDEX:
            if p['name'] == name:
                return p
        return jsonify('Pokemon not found!')

    def __get_by_number(self, number):
        
        """
        Returns a Pokemon by number or all Pokemon if given 0
        Parameters:
            number (int): The number of the Pokemon to return
        Returns:
            A Pokemon dictionary or a json object with an error message
        """
        number = int(number)
        if number == 0:
            return POKEDEX
        elif number and number < 1026:
            return POKEDEX[number - 1]
        else:
            return jsonify('Pokemon not found!')
    
    def __get_by_type(self, type):
        
        """
        Returns a list of Pokemon matching the given type(s)

        Parameters:
            type (str or list): The type(s) to filter by

        Returns:
            A list of Pokemon dictionaries or a json object with an error message
        """
        if type:
            filtered = []
            if ' ' in type:
                type = type.split(' ')
                for i in range(len(type)):
                    type[i] = type[i].capitalize()
            else:
                type = type.lower().capitalize()
                
            for p in POKEDEX:
                if len(type) == 2 and type[0] in p['type'] and type[1] in p['type']:
                    filtered.append(p)
                elif isinstance(type, str) and type in p['type']:
                    filtered.append(p)
        return filtered if len(filtered) > 0 else jsonify('Invalid type!')
        

    def get(self):
        """
        Returns a Pokemon from the pokedex by id, name, or type
        Parameters:
            id (int): The id of the Pokemon
            name (str): The name of the Pokemon
            type (str): The type of the Pokemon
        Returns:
            A Pokemon object or a json object with an error message
        """
        number = request.args.get('id')
        name = request.args.get('name')
        type = request.args.get('type')
        if number:
            return self.__get_by_number(number)
        elif name:
            return self.__get_by_name(name)
        elif type:
            return self.__get_by_type(type)
        else:
            return jsonify('Pokemon not found!')
