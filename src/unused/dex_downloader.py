import src.unused.pokemon as pokemon
import os

def main():
    cooldown = input("""Enter the cooldown time in seconds (default 30). 
    Note: It is recommended to use a cooldown time of at least 30 seconds. 
    You can also use the default value of 30 seconds.
    Cooldown time may can not be less than 20 seconds due to resource limitations: """)
    print('Thank you to https://pokeapi.co/ for providing all of the data!!')
    
    pokemon.write_persistent(int(cooldown)) 
    print(f"""Writing complete! JSON can be found at {os.getcwd()}\pokemon.json. Thank you for using dex_downloader!""")
    
if __name__ == '__main__':
    main()