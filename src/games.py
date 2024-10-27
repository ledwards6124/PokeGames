

import json
from flask import jsonify

def sanitize_name(name):
    name = name.lower().capitalize()
    if ' ' in name:
        name = name.split(' ')
        for i in range(len(name)):
            name[i] = name[i].capitalize()
        name = ' '.join(name)
    return name

with open('data\pokedex.json', 'r') as f:
    POKEDEX = json.load(f)

class GuessingGame:
    def __init__(self):
        self.guessed = set()
        self.score = 0
    
    def guess(self, name):
        if name:
            name = sanitize_name(name)
            for p in POKEDEX:
                if p['name'] == name and name not in self.guessed:
                    self.guessed.add((p['dex'], name))
                    self.score = len(self.guessed)
                    return p
            else:
                return jsonify('Already guessed {}!'.format(name))
        else:
            return 'Invalid name!'
        
    def reset(self):
        self.guessed = set()
        self.score = 0
        return jsonify('Quiz reset!')
        
    def get_score(self):
        return self.score
    
    def get_guessed(self):
        return self.guessed