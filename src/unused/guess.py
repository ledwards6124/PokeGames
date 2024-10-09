from src.unused.pokemon import get_random_pokemon, get_pokemon_by_name

class Guess:
    
    __slots__ = ['__tries', '__choice', '__guessed']

    def __init__(self):
        self.__tries = 0
        self.__choice = get_random_pokemon()
        self.__guessed = set()

    @property
    def choice(self):
        return self.__choice

    @property
    def tries(self):
        return self.__tries
    

    
    def guess(self, guess):
        if guess and isinstance(guess, str):
            p = get_pokemon_by_name(guess)
            print(p)
            if p:
                if p == self.choice:
                    print('The answer was ' + self.choice + '!')
                    quit()
                elif p not in self.__guessed:
                    self.__guessed.add(p)
                    self.__tries += 1
                    print('You Guessed: ' + str(p))
                    return p
                else:
                    print('You already guessed ' + p.name + '!')
        return None
            

def main():
    guess = Guess()
    while True:
        print('Current Tries: ' + str(guess.tries))
        g = input('Enter your next guess: ')
        guess.guess(g)
    
    
main()