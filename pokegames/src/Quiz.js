import React from 'react';
import Guessed from './Guessed';

class Quiz extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            textBox: '',
            guessedNames: {},
            guessedDex: new Set()
        }
    }

    handleInputChange = (event) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    }

    clear = () => {
        this.setState({
            textBox: ''
        })
    }


    beginQuiz = ()  => {
        fetch('http://localhost:5000/quiz', {
            method: 'DELETE'
        }).then(response => {
            if (response.status === 200) {
                return response.json()
            }
        }).then(jData => {
        })
    }

    guess = () => {
        let g = this.state.textBox;
        if (g) {
            g = g.charAt(0).toUpperCase() + g.slice(1);
            fetch(`http://localhost:5000/quiz?name=${g}`, {
                method: 'POST'
            }).then(response => {
                if (response.status === 200) {
                    return response.json()
                }
            }).then(jData => {
                const guessedInfo = [jData['dex'], jData['name']];
                this.state.guessedDex.add(guessedInfo[0]);
                if (!this.state.guessedNames.hasOwnProperty(guessedInfo[0])) {
                    let gn = this.state.guessedNames;
                    gn[guessedInfo[0]] = guessedInfo[1];
                    this.setState({
                        guessedNames: gn
                    })
                }
                
            })
        } else {
            window.alert(`${g} is an invalid guess!`)
        }
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.guess();
            this.clear();
        }
    }

    render() {
        this.beginQuiz();
        return (
        <>
        <div className="overlay">
                <button className="reset-quiz" onClick={this.beginQuiz}>Reset Quiz</button>
        </div>
        <div className="guess">
            <input onKeyDown={this.handleKeyPress} name='textBox' type="text" placeholder='Guess a Pokemon!' value={this.state.textBox} onChange={this.handleInputChange} />
            <input onKeyDown={this.handleKeyPress} type="button" value="Guess" onClick={this.guess} />
        </div>
        <div className='guessed'>
            <Guessed guessed={this.state.guessedNames}></Guessed>
        </div>
        </>
        )
    }
}

export default Quiz;