import os
import random
import requests
import json
import time
import src.sql_tools as sql_tools
from tqdm import tqdm

class Pokemon:
    __slots__ = ['__dex', '__name', '__type', '__generation', '__is_baby', '__is_legendary', '__is_mythical', '__color']
    
    def __init__(self, dex, name, type, generation, is_baby, is_legendary, is_mythical, color):
        self.__dex = dex
        self.__name = name
        self.__type = type
        self.__generation = generation
        self.__is_baby = is_baby
        self.__is_legendary = is_legendary
        self.__is_mythical = is_mythical
        self.__color = color
        
    @property
    def generation(self):
        return self.__generation
    
    @property
    def dex(self):
        return self.__dex
    
    @property
    def name(self):
        return self.__name
    
    @property
    def type(self):
        return self.__type
    
    @property
    def is_baby(self):
        return self.__is_baby
    
    @property
    def is_legendary(self):
        return self.__is_legendary
    
    @property
    def is_mythical(self):
        return self.__is_mythical
    
    @property
    def color(self):
        return self.__color
    
    
    def __eq__(self, other):
        if not isinstance(other, Pokemon):
            return False
        return (self.__dex == other.__dex and
                self.__name == other.__name and
                self.__type == other.__type and
                self.__generation == other.__generation and
                self.__is_baby == other.__is_baby and
                self.__is_legendary == other.__is_legendary and
                self.__is_mythical == other.__is_mythical and
                self.__color == other.__color)
    
    
    def __str__(self):
        return f'{self.name} ({self.dex})'    
    def __repr__(self):
        return f'Pokemon({self.dex}, {self.name}, {self.type}, {self.is_baby}, {self.is_legendary}, {self.is_mythical}, {self.color}, {self.generation})'
    
    
    def __hash__(self):
        return hash((self.__dex, self.__name, tuple(self.__type), self.__generation, self.__is_baby, self.__is_legendary, self.__is_mythical, self.__color))
    
    

def serialize(pokemon):
    return {
        'dex': pokemon.dex,
        'name': pokemon.name,
        'type': pokemon.type,
        'generation': pokemon.generation,
        'is_baby': pokemon.is_baby,
        'is_legendary': pokemon.is_legendary,
        'is_mythical': pokemon.is_mythical,
        'color': pokemon.color
        }

TYPES = {
    'Normal': 1,
    'Fire': 2,
    'Water': 3,
    'Electric': 4,
    'Grass': 5,
    'Ice': 6,
    'Fighting': 7,
    'Poison': 8,
    'Ground': 9,
    'Flying': 10,
    'Psychic': 11,
    'Bug': 12,
    'Rock': 13,
    'Ghost': 14,
    'Dragon': 15,
    'Steel': 16,
    'Dark': 17,
    'Fairy': 18
}

def get_pokemon_by_id(number):
    if number:
        url = f'https://pokeapi.co/api/v2/pokemon/{number}/'
        secondary_url = f'https://pokeapi.co/api/v2/pokemon-species/{number}/'
        first_json = requests.get(url).json()
        second_json = requests.get(secondary_url).json()
        name = first_json['name'].capitalize()
        types = get_types(first_json)
        is_baby = second_json['is_baby']
        is_legendary = second_json['is_legendary']
        is_mythical = second_json['is_mythical']
        generation = second_json['generation']['url'][-2]
        color = second_json['color']['name']
        return Pokemon(number, name, types, generation, is_baby, is_legendary, is_mythical, color)
    
def get_pokemon_by_name(name):
    if name:
        name = name.lower()
        url = f'https://pokeapi.co/api/v2/pokemon/{name}/'
        secondary_url = f'https://pokeapi.co/api/v2/pokemon-species/{name}/'
        first_json = requests.get(url).json()
        second_json = requests.get(secondary_url).json()
        number = first_json['id']
        name = first_json['name'].capitalize()
        types = get_types(first_json)
        is_baby = second_json['is_baby']
        is_legendary = second_json['is_legendary']
        is_mythical = second_json['is_mythical']
        generation = second_json['generation']['url'][-2]
        color = second_json['color']['name']
        return Pokemon(number, name, types, generation, is_baby, is_legendary, is_mythical, color)
    
def get_pokemon(search):
    if search:
        if isinstance(search, int):
            return get_pokemon_by_id(search)
        elif isinstance(search, str):
            return get_pokemon_by_name(search)
        else:
            return None
    
def get_types(json):
    if json:
        types = []
        for t in json['types']:
            types.append(t['type']['name'].capitalize())
        return types
    return []

def get_random_pokemon():
    number = random.randint(1, 1026)
    return get_pokemon_by_id(number)
            
        
def write_all_to_json(start_num):
    try:
        with open('pokemon.json', 'a') as f:
            if start_num == 1:
                f.write('[\r')
            last_written = 0
            for i in range(start_num, 1026):
                p = get_pokemon_by_id(i)
                print(f'Writing {p} to JSON...')
                f.write(f'\t{json.dumps(p, default=serialize)},\n')
                last_written = i
                time.sleep(1)
            f.write(']')
            f.close()
    except Exception as e:
        print('Exception occurred while writing to JSON: ' + str(e))
        print('Last written Pokemon was ' + str(last_written))
        return last_written

def write_persistent(cooldown=30):
    start_num = 1
    with open('pokemon.json', 'r') as f:
        current_length = len(f.readlines())
        while current_length < 1029:
            try:
                start_num = write_all_to_json(start_num) + 1
            except:
                current_length = len(f.readlines())
                print(f'Exception occurred while writing to JSON. Sleeping for {cooldown} seconds...')
                time.sleep(cooldown)
                write_persistent(cooldown)

                    
def write_hyphen_free_pokedex(input_file='pokemon.json', output_file='pokemon_hyphen_free.json'):
    with open(input_file, 'r') as f:
        data = json.load(f)
        for p in data:
            if '-' in p['name']:
                if p['name'] == 'Ho-oh' or p['name'] == 'Wo-chien' or p['name'] == 'Chien-pao' or p['name'] == 'Ting-lu' or p['name'] == 'Chi-yu' or p['name'] == 'Jangmo-o' or p['name'] == 'Hakamo-o' or p['name'] == 'Kommo-o' or p['name'] == 'Type-Null':
                    p['name'] = edit_hyphenated(p['name'])
                elif 'Tapu' in p['name']:
                    p['name'] = edit_name(p['name'])
                elif 'Iron' in p['name']:
                    p['name'] = edit_name(p['name'])
                elif 'ing' in p['name'] and p['dex'] > 900:
                    p['name'] = edit_name(p['name'])
                elif 'Brute' in p['name'] or 'Scream' in p['name'] or 'Flutter' in p['name'] or 'Sandy' in p['name'] or 'Great' in p['name']:
                    p['name'] = edit_name(p['name'])
                else:
                    p['name'] = p['name'].split('-')[0].capitalize()
        f.close()
    with open(output_file, 'w') as f:
        json.dump(data, f, indent=4)
                    
        
def edit_name(name):

    name = name.split('-')
    for i in range(len(name)):
        name[i] = name[i].capitalize()
    name = ' '.join(name)
    return name

def edit_hyphenated(name):

    name = name.split('-')
    for i in range(len(name)):
        name[i] = name[i].capitalize()
    name = '-'.join(name)
    return name



def remove_suffix(name):
    return name.split(' ')[0]

def main():
    write_hyphen_free_pokedex()
    
if __name__ == '__main__':
    main()