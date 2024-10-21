import React from 'react';

class Guessed extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            guessed: this.props.guessed
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.guessed !== this.state.guessed) {
            this.handleNewGuess()
        }
    }


    handleNewGuess = (event) => {
        this.render();
    }
    render() {
        return <>
            <div>
                {Object.keys(this.state.guessed).map((key) => {
                    return <p key={key}>{key}. {this.state.guessed[key]}</p>
                })}
            </div>
        </>
    }
}

export default Guessed;