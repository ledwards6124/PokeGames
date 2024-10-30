import React from 'react';

class QuizSprite extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sprite: null
        }
    }


    getSprite = () => {
        const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.props.dex}.png`
        console.log(url);
        fetch(url, {
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


    componentDidMount() {
        this.getSprite();
    }

    render() {
        return (
            <>
                <div className='small-q-sprite'>
                    <img src={this.state.sprite} alt='Pokemon Sprite'></img>
                    <p>{this.props.dex}. {this.props.name}</p>
                </div>
            </>
        )
    }

}

export default QuizSprite;