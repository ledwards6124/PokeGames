import React from 'react';

class StatBar extends React.Component {

    maxValues = {
        hp: 255,
        attack: 170,
        defense: 250,
        specialattack: 145,
        specialdefense: 250,
        speed: 145
    }

    percentiles = {
        f: .1,
        d: .3,
        c: .5, 
        b: .7,
        a: 0.9
    }

    constructor(props) {
        super(props);
    }

    

    render() {

        const category = this.props.stat.replace(' ', '').toLowerCase();
        const maxValue = this.maxValues[category];
        const stat = this.props.value;
        const scale = (stat / maxValue);


        console.log(typeof category);

        let formattedCategory = '';
        
        switch (category) {
            case 'hp':
                formattedCategory = 'HP';
                break;
            case 'attack':
                formattedCategory = 'Attack';
                break;
            case 'defense':
                formattedCategory = 'Defense';
                break;
            case 'specialattack':
                formattedCategory = 'Sp. Atk';
                break;
            case 'specialdefense':
                formattedCategory = 'Sp. Def';
                break;
            default:
                formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);

        }

        

        return (

            <>
            <div className='stat-container'>
                {formattedCategory}: {stat}
                <progress style={{
                    maxWidth: "75%"}} value={scale}/>
            </div>
            </>
        )
    }
}

export default StatBar;