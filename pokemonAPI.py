import os
import requests
import json
import time
import src.sql_tools as sql_tools

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
        data = {}
        data.update({'id': number,'name': name, 'types': types, 'is_baby': is_baby, 'is_legendary': is_legendary, 'is_mythical': is_mythical, 'generation': generation, 'color': color})
        return data
    
def get_types(json):
    if json:
        types = []
        for t in json['types']:
            types.append(t['type']['name'])
        return types
    return []

def format_types(types):
    type_arr = []
    for t in types:
        type_arr.append(TYPES[t.capitalize()])
    return type_arr

def format_region(region):
    return region

def format_data(data):
    dex = data['id']
    name = data['name']
    types = format_types(data['types'])
    region = format_region(data['generation'])
    color = data['color']
    is_baby = data['is_baby']
    is_legendary = data['is_legendary']
    is_mythical = data['is_mythical']
    sql = f'({dex}, {name}, {types}, {region}, {color}, {is_baby}, {is_legendary}, {is_mythical})'
    return sql    
        
def get_all():
    with open('pokemon.sql', 'a') as sql_file:
        for i in range(1, 1026):
            data = get_pokemon_by_id(i)
            sql_file.write(format_data(data))
            time.sleep(5)
            
def get_image(name):
    r = requests.get(f'https://img.pokemondb.net/sprites/scarlet-violet/normal/1x/{name}.png')
    if r.status_code == 200:
        path = os.path.join('data\\images', f'{name}.png')
        with open(path, 'wb') as f:
            f.write(r.content)     
                
def get_images(index):
    try:
        with open('data/pokedex.json', 'r') as f:
            data = json.load(f)
            for index in range(1026):
                name = data[index]['name'].lower()
                get_image(name)
                index += 1
                time.sleep(1)
    except:
        return index
    

            
        


        
def main():
    index = 9
    try:
        index = get_images(index)
    except ConnectionError:
        print('Connection refused...')
        time.sleep(10)
        get_images(index)
        
    
if __name__ == '__main__':
    main()