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
    
    def __get_by_color(self, color):
        if color:
            filtered = []
            for p in POKEDEX:
                if color == p['color']:
                    filtered.append(p)
        return filtered if len(filtered) > 0 else jsonify('Invalid color!')
    
    def __get_by_legendary(self):
        filtered = []
        for p in POKEDEX:
            if p['is_legendary'] == True:
                filtered.append(p)
        return filtered
    
    def __get_by_mythical(self):
        filtered = []
        for p in POKEDEX:
            if p['is_mythical'] == True:
                filtered.append(p)
        return filtered

    def __get_by_baby(self):
        filtered = []
        for p in POKEDEX:
            if p['is_baby'] == True:
                filtered.append(p)
        return filtered
    
    def __get_by_generation(self, generation):
        filtered = []
        for p in POKEDEX:
            if p['generation'] == int(generation):
                filtered.append(p)
        return filtered
        
    def get(self):
        """
        Returns a list of all Pokemon that satisfy all criteria from the request query string if they exist

        Parameters:
            id (int): The id of the Pokemon
            name (str): The name of the Pokemon
            type (str): The type of the Pokemon
            color (str): The color of the Pokemon
            generation (str): The generation of the Pokemon
            legendary (str): The legendary status of the Pokemon
            mythical (str): The mythical status of the Pokemon
            baby (str): The baby status of the Pokemon

        Returns:
            A list of Pokemon objects or a json object with an error message
        """
        number = request.args.get('id')
        name = request.args.get('name')
        p_type = request.args.get('pType')
        s_type = request.args.get('sType')
        color = request.args.get('color')
        generation = request.args.get('generation')
        legendary = request.args.get('legendary')
        mythical = request.args.get('mythical')
        baby = request.args.get('baby')
        
        filtered = []
        for p in POKEDEX:
            if (
                (number is None or str(p['dex']) == number) and
                (name is None or name.lower() in p['name'].lower()) and
                (p_type is None or p_type.lower() in [t.lower() for t in p['type']]) and
                (s_type is None or s_type.lower() in [t.lower() for t in p['type']]) and
                (color is None or p['color'].lower() == color.lower()) and
                (generation is None or str(p['generation']) == generation) and
                (legendary is None or str(p['is_legendary']).lower() == legendary.lower()) and
                (mythical is None or str(p['is_mythical']).lower() == mythical.lower()) and
                (baby is None or str(p['is_baby']).lower() == baby.lower())
            ):
                filtered.append(p)
                
        return filtered if len(filtered) > 0 else jsonify('No Pokemon found with the specified criteria!')
            
            