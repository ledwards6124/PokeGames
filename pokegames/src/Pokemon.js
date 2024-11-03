import React from 'react';
import axios from 'axios';
import Type from './Type';
import StatBar from './StatBar';

class Pokemon extends React.Component {
    

    constructor(props) {
        super(props);
        this.state = {
            sprite: null,
            shiny: null,
            stats: {
                'HP': 0,
                'Attack': 0,
                'Defense': 0,
                'Special Attack': 0,
                'Special Defense': 0,
                'Speed': 0
            }
        }
    }


    getSprite = () => {
        fetch(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.props.dex}.png`, {
            method: 'GET'
        }).then(response => {
            if (response.status === 200) {
                return response.blob();
            }
        }).then(blob => {
            const sprite = URL.createObjectURL(blob);
            this.setState({ sprite: sprite})
        })
    }

    getShiny = () => {
        fetch(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${this.props.dex}.png`, {
            method: 'GET'
        }).then(response => {
            if (response.status === 200) {
                return response.blob();
            }
        }).then(blob => {
            const sprite = URL.createObjectURL(blob);
            this.setState({ shiny: sprite})
        })
    }

    getStats = () => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${this.props.dex}`, {
            method: 'GET'
        }).then(response => {
            if (response.status === 200) {
                return response.json();
            }
        }).then(jData => {
            const stats = jData.stats;
            const newStats = {
                'HP': stats[0].base_stat,
                'Attack': stats[1].base_stat,
                'Defense': stats[2].base_stat,
                'Special Attack': stats[3].base_stat,
                'Special Defense': stats[4].base_stat,
                'Speed': stats[5].base_stat
            }
            this.setState({ stats: newStats })
        })
    }

    componentDidMount() {
        this.getSprite();
        this.getShiny();
        this.getStats();
    }


    getStyle(mlb) {
        if (mlb) {
            return {
                backgroundColor: '#009420',
                color: 'white',
                padding: '5%',
                borderRadius: '15px',
                fontWeight: 'bold',
                boxShadow: '0px 0px 2px 2px rgba(0, 0, 0, 1)'



            }
        } else {
            return {
                backgroundColor: '#FF0000',
                color: 'white',
                padding: '5%',
                borderRadius: '15px',
                fontWeight: 'bold',
                boxShadow: '0px 0px 2px 2px rgba(0, 0, 0, 1)'
            }
        }
    }


    render() {


        return (
            <div className='pokemon-container'>
                <div className='sprite-container'>
                    <img src={this.state.sprite} alt='Pokemon Sprite'></img>
                    <img src={this.state.shiny} alt='Shiny Pokemon Sprite'></img>
                </div>

            <div className='info-container'>
                <a target='_blank' href={"https://www.pokemon.com/us/pokedex/" + this.props.name}>
                    <h1 style={{color: '#3d3d3d'}}>{this.props.dex}. {this.props.name}</h1>
                </a>
                <div className='type-container'>
                    <p className='pokemon-info'>Type:</p> {this.props.type.map(t => {
                    return <Type type={t.toLowerCase()}></Type>
                })}
                </div>
                
                <div className='stat-div'>
                    {Object.keys(this.state.stats).map((key) => {
                    return <StatBar key={key} stat={key} value={this.state.stats[key]}></StatBar>
                })}
                </div>
                <p style={this.getStyle(this.props.legendary)} className='pokemon-info'>Legendary: {this.props.legendary ? 'Yes' : 'No'}</p>
                <p style={this.getStyle(this.props.mythical)} className='pokemon-info'>Mythical: {this.props.mythical ? 'Yes' : 'No'}</p>
                <p style={this.getStyle(this.props.baby)} className='pokemon-info'>Baby: {this.props.baby ? 'Yes' : 'No'}</p>
            </div>
            </div>
        )
    }
}

export default Pokemon;