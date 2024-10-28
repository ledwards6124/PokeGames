import React from 'react';
import Navbar from './NavMenu';
import NavMenu from './NavMenu';
import { useEffect, useState } from 'react';
import { NavLink } from 'reactstrap';

class Homepage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sprite: ''
        }

    }

    getSprite = (dex) => {
        try {
            fetch(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dex}.png`, {
                method: 'GET'
            }).then(response => {
                if (response.status === 200) {
                    return response.blob();
                }
            }).then(blob => {
                const url = URL.createObjectURL(blob);
                this.setState({ sprite: url });

            })
        } catch {
            ;
        }
    }

    cycleSprite() {
        const i = Math.round(Math.random() * 1026);
        this.getSprite(i);
    }

    async componentDidMount() {
        this.cycleSprite();
        setInterval(() => {
            this.cycleSprite();
        }, 30000);
    }

    render() {
        return (
            <div className='homepage-div'>
                <div className='homepage-nav'>
                    <NavMenu className='homepage-nav-menu'></NavMenu>
                </div>
                <div className='homepage-sprite-container'>                    
                    <img className='homepage-sprite' src={this.state.sprite} alt='Pokemon Sprite'></img>
                </div>

                <div className='bio'>
                    <p>PokeGames: 2024</p>
                    <p>This website was created by Luke Edwards. All Pokemon and subsequent IP's belong to Nintendo and Game Freak.</p>
                    <p>This is a work in progress!!</p>
                </div>


            </div>
        )
    }
}

export default Homepage;