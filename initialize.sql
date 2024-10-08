DROP TABLE IF EXISTS types;

CREATE TABLE IF NOT EXISTS types
(
    id serial NOT NULL,
    type VARCHAR(10) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "types_pkey" PRIMARY KEY (id)
);

INSERT INTO types (type) VALUES
('Normal'), ('Fire'), ('Water'), 
('Electric'), ('Grass'), ('Ice'), 
('Fighting'), ('Poison'), ('Ground'), 
('Flying'), ('Psychic'), ('Bug'), 
('Rock'), ('Ghost'), ('Dragon'), 
('Steel'), ('Dark'), ('Fairy');


DROP TABLE IF EXISTS generations;

CREATE TABLE IF NOT EXISTS generations
(
    id integer NOT NULL,
    region VARCHAR(20) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "generations_pkey" PRIMARY KEY (id)
);

INSERT INTO generations (id, region) VALUES
(1, 'Kanto'), (2, 'Johto'), (3, 'Hoenn'),
(4, 'Sinnoh'), (5, 'Unova'), (6, 'Kalos'), 
(7, 'Alola'), (8, 'Galar'), (9, 'Paldea');

DROP TABLE IF EXISTS pokemon;

CREATE TABLE IF NOT EXISTS pokemon
(
    id integer NOT NULL,
    name VARCHAR(25) COLLATE pg_catalog."default" NOT NULL,
    type_id integer[] NOT NULL,
    region_id integer NOT NULL,
    color VARCHAR(25) NOT NULL,
    is_baby boolean NOT NULL,
    is_legendary boolean NOT NULL,
    is_mythical boolean NOT NULL,
    CONSTRAINT "pokemon_pkey" PRIMARY KEY (id)
);



