import React from 'react';
import NavMenu from './NavMenu';
import Pokemon from './Pokemon';
import QuizSprite from './QuizSprite';

class Quiz extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            textBox: '',
            guessed: [],
            score: 0
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
        }).then(jData => {})
        this.setState({
            guessed: [],
            textBox: '',
            score: 0
        })
    }

    updateGuessed = () => {

        fetch('http://localhost:5000/quiz', {
            method: 'GET'
        }).then(response => {
            if (response.status === 200) {
                return response.json()
            }
        }).then(jData => {
            console.log(jData.score);
            this.setState({
                guessed: jData.guessed.map(el => ({...el})),
                score: jData.score
            })
        })
        
    }

    guess = () => {
        if (this.state.textBox) {
            fetch('http://localhost:5000/quiz?name=' + this.state.textBox, {
                method: 'POST',
            }).then(response => {
                if (response.status === 200) {
                    return response.json();
                }
            }).then(jData => {
                this.updateGuessed();
            })
            this.clear();
        }
    }

    componentDidMount() {
        this.beginQuiz();
    }



    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.guess();
        }
    }

    render() {
        return (
        <>
        <div className='quiz'>
            <div className="quiz-util">
                    <button className="reset-quiz" onClick={this.beginQuiz}>Reset Quiz</button>
                <input className='quiz-text' onKeyDown={this.handleKeyPress} name='textBox' type="text" placeholder='Guess a Pokemon!' value={this.state.textBox} onChange={this.handleInputChange} />
                <input className='guess-button' onKeyDown={this.handleKeyPress} type="button" value="Guess" onClick={this.guess} />
            </div>

                <p className='score'>Score: {this.state.score}</p>

            <div className='quiz-nav'>
                    <NavMenu className='homepage-nav-menu'></NavMenu>
            </div>
                <div className='guessed-sprite'>
                {this.state.guessed.map(res => {
                    return <QuizSprite key={res[0]} name={res[1]} dex={res[0]}></QuizSprite>
                })}
                </div>
        </div>
        </>
        )
    }
}

export default Quiz;