import React from 'react';
import { Label, Modal, ModalBody, Input, Button, ModalFooter, ModalHeader } from 'reactstrap';
import Pokemon from './Pokemon';
import NavMenu from './NavMenu';


class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dex: '',
            name: '',
            generation: '',
            pType: '',
            sType: '',
            legendary: false,
            mythical: false,
            baby: false,
            color: '',
            open: false,
            results: []


        }
    }

    clear = () => {
        this.setState({
            dex: '',
            name: '',
            generation: '',
            pType: '',
            sType: '',
            legendary: false,
            mythical: false,
            baby: false,
            color: '',
        })
    }

    showModal = () => {
        this.setState({ open: !this.state.open });
    }

    getQuery = () => {
        let query = '';
        if (this.state.dex && this.state.dex > 0 && this.state.dex < 1027) {
            query += `id=${this.state.dex}&`;
        }
        if (this.state.name) {
            query += `name=${this.state.name}&`;
        }
        if (this.state.generation && this.state.generation > 0 && this.state.generation < 10) {
            query += `generation=${this.state.generation}&`;
        }
        if (this.state.pType) {
            query += `pType=${this.state.pType.charAt(0).toUpperCase() + this.state.pType.slice(1)}&`;
        }
        if (this.state.sType) {
            query += `sType=${this.state.sType.charAt(0).toUpperCase() + this.state.sType.slice(1)}&`;
        }
        if (this.state.color) {
            query += `color=${this.state.color}&`;
        }
        if (this.state.legendary) {
            query += `legendary=${this.state.legendary}&`;
        }
        if (this.state.mythical) {
            query += `mythical=${this.state.mythical}&`;
        }
        if (this.state.baby) {
            query += `baby=${this.state.baby}&`;
        }
        query = query.slice(0, query.length - 1);
        return query;
    }

    search = () => {
        const query = this.getQuery();
        fetch(`https://ledwards6124.pythonanywhere.com/dex?${query}`, {
            method: 'GET'
        }).then(response => {
            if (response.status === 200) {
                return response.json();
            }
        }).then(jData => {
            this.state.results = [];
            this.setState({
                resNames: []
            })
            this.state.results = jData;
            })

    }

    submit = () => {
        if (this.state.legendary  || this.state.mythical || this.state.baby || this.state.dex || this.state.name || this.state.generation || this.state.pType || this.state.sType || this.state.color) {
            this.search();
            this.clear();
            this.showModal();
        } else {
            window.alert('Need to specify criteria!')
        }
            
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    resetResults = () => {
        this.setState({
            results: []
        })
    }

    handleCheckbox = (event) => {
        const name = event.target.name;
        const value = event.target.checked;
        this.setState({
            [name]: value
        })
    }

    renderSearch = () => {
        return (
            this.state.results.map(res => (
                <Pokemon className='pokemon-res' key={res.dex} name={res.name} type={res.type} color={res.color} dex={res.dex} legendary={res.is_legendary} mythical={res.is_mythical} baby={res.is_baby}></Pokemon>
            ))
        )
    }


    render() {





        return (
            <>
            <div className='search-nav'>
                    <NavMenu className='homepage-nav-menu'></NavMenu>
            </div>
            <div className='search-container'>

                <h1>Results:</h1>
                <div className='search-button-div'>
                    <Button className='search-button' onClick={this.showModal}>Search</Button>
                    <Button className='reset-search-button' onClick={this.resetResults}>Reset</Button>
                </div>

                <div className='results-div'>
                    {this.state.results.length > 0 ? this.renderSearch() : <h1 style={{backgroundColor: '#3d3d3d', color: 'white'}}>No Pokemon found with the specified criteria!</h1>}
                </div>



            </div>

            <div className='modal-div'>
                       {this.state.open && (
                        <form className='search-modal'>
                        <h1 className='modal-title'>Enter Pokemon details here:</h1>
                        <label className='input-label'>Dex Number: <input placeholder='ex: 1' type='number'  name='dex' value={this.state.dex} onChange={this.handleInputChange}></input></label>
                        <label className='input-label'>Name: <input placeholder='ex: Bulbasaur' type='text' name='name' value={this.state.name} onChange={this.handleInputChange}></input></label>
                        <label className='input-label'>Primary Type: <input placeholder='ex: Grass' type='text' name='pType' value={this.state.pType} onChange={this.handleInputChange}></input></label>
                        <label className='input-label'>Secondary Type: <input placeholder='ex: Poison' type='text' name='sType' value={this.state.sType} onChange={this.handleInputChange}></input></label>
                        <label className='input-label'>Generation: <input placeholder='ex: 1' type='number' name='generation' value={this.state.generation} onChange={this.handleInputChange}></input></label>

                        <label className='check-label'>Legendary: <input type='checkbox' name='legendary' checked={this.state.legendary} onChange={this.handleCheckbox}></input></label>
                        <label className='check-label'>Mythical: <input type='checkbox' name='mythical' checked={this.state.mythical} onChange={this.handleCheckbox}></input></label>
                        <label className='check-label'>Baby: <input type='checkbox' name='baby' checked={this.state.baby} onChange={this.handleCheckbox}></input></label>
                        
                        <div className='footer'>
                            <input className='submit-button' type='button' onClick={this.submit} value='Submit'></input>
                            <input className='clear-button' type='button' onClick={this.showModal} value='Clear'></input>
                        </div>
                    </form> 
                       )}
                    </div>


            </>
        )
    }
}

export default Search;