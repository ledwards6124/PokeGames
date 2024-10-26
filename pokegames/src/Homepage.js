import React from 'react';
import Navbar from './NavMenu';
import NavMenu from './NavMenu';
import { useEffect, useState } from 'react';

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
            <div>
                <NavMenu name={'Home'}></NavMenu>
                <p>Homepage</p>
                <img src={this.state.sprite} alt='Pokemon Sprite'></img>

            </div>
        )
    }
}

export default Homepage;