import React from 'react';

class Type extends React.Component {

    colors = {
        normal: '#aaaa99',
        fire: '#ff4422',
        water: '#3399ff',
        electric: '#eed535',
        grass: '#7bcc50',
        ice: '#66ccff',
        fighting: '#b94f52',
        poison: '#b567ce',
        ground: '#ddcc77',
        flying: '#89cff0',
        psychic: '#ea5d60',
        bug: '#aabb22',
        rock: '#bbaa66',
        ghost: '#6666cc',
        dragon: '#7766cc',
        dark: '#775544',
        steel: '#aaaaaa',
        fairy: '#ee99ee'

    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
            <div style={{
                backgroundColor: this.colors[this.props.type],
                borderRadius: '10% 10% 10% 10%',
                height: '115%',
                width: '70%',
                minWidth: '100%',
                border: '2px solid black',
                textAlign: 'center',
                color: 'white',
                textShadow: '2px 2px 2px black',
                textAlign: 'center',


            }}>{this.props.type.toUpperCase()}</div>
            </>
        )
    }
}

export default Type;