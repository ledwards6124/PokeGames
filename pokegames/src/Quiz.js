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

    sortGuessed = () => {
        console.log(this.state.guessed);
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
        fetch('https://ledwards6124.pythonanywhere.com/quiz', {
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

        fetch('https://ledwards6124.pythonanywhere.com/quiz', {
            method: 'GET'
        }).then(response => {
            if (response.status === 200) {
                return response.json()
            }
        }).then(jData => {
            this.setState({
                guessed: jData.guessed.map(el => ({...el})),
                score: jData.score
            })
        })
        
    }

    guess = () => {
        if (this.state.textBox) {
            this.sortGuessed();
            fetch('https://ledwards6124.pythonanywhere.com/quiz?name=' + this.state.textBox, {
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

    componentDidUpdate(prevProps, prevState) {
        if (this.state.guessed.length !== prevState.guessed.length) {
            this.updateGuessed();
        }
    }



    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.guess();
        }
    }

    render() {
        return (
        <>
                    <div className='quiz-nav'>
                    <NavMenu className='homepage-nav-menu'></NavMenu>
            </div>
        <div className='quiz'>
            

            <p className='score'>Score: {this.state.score}</p>

            <div className="quiz-util">
                <input className="reset-button" onClick={this.beginQuiz} type="button" value="Reset Quiz"/>
                <input className='quiz-text' onKeyDown={this.handleKeyPress} name='textBox' type="text" placeholder='Guess a Pokemon!' value={this.state.textBox} onChange={this.handleInputChange} />
                <input className='guess-button' onKeyDown={this.handleKeyPress} type="button" value="Guess" onClick={this.guess} />
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