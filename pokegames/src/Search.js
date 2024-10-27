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
        console.log(this.state.open);
        this.setState({ open: !this.state.open });
    }

    getQuery = () => {
        let query = '';
        if (this.state.dex) {
            query += `id=${this.state.dex}&`;
        }
        if (this.state.name) {
            query += `name=${this.state.name}&`;
        }
        if (this.state.generation) {
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
        if (this.state.legendary === true) {
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
        fetch(`http://localhost:5000/dex?${query}`, {
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
            <div className='search-container'>
                <h1>Results:</h1>
                    <Modal isOpen={this.state.open} toggle={this.showModal} className='search-modal'>
                        <ModalHeader className='modal-header'>Enter Pokemon details here:</ModalHeader>
                        <ModalBody className='modal-body'>
                            
                            <Label>
                                Dex Number:
                                <Input className='modal-field' type='number' min={1} max={1025} name='dex' placeholder='Dex Number' value={this.state.dex} onChange={this.handleInputChange} />
                            </Label>
                            <Label>
                                Name:
                                <Input className='modal-field' type='text' name='name' placeholder='Name' value={this.state.name} onChange={this.handleInputChange} />
                            </Label>
                            <Label>
                                Generation:
                                <Input className='modal-field' type='number' min={1} max={9} name='generation' placeholder='Generation' value={this.state.generation} onChange={this.handleInputChange} />
                            </Label>
                            <Label>
                                Primary Type:
                                <Input className='modal-field' type='text' name='pType' placeholder='Primary Type' value={this.state.pType} onChange={this.handleInputChange} />
                            </Label>
                            <Label>
                                Secondary Type:
                                <Input className='modal-field' type='text' name='sType' placeholder='Secondary Type' value={this.state.sType} onChange={this.handleInputChange}/>
                            </Label>
                            <Label>
                                Color:
                                <Input className='modal-field' type='text' name='color' placeholder='Color' value={this.state.color} onChange={this.handleInputChange} />
                            </Label>

                            <Label className='check-label'>
                                <Input type='checkbox' defaultChecked={false} name='legendary' placeholder='Legendary' value={this.state.legendary} onChange={this.handleCheckbox} />
                                Legendary
                            </Label>
                            <Label className='check-label'>
                                <Input type='checkbox' defaultChecked={false} name='mythical' placeholder='Mythical' value={this.state.mythical} onChange={this.handleCheckbox} />
                                Mythical
                            </Label>
                            <Label className='check-label'>
                                <Input type='checkbox' defaultChecked={false} name='baby' placeholder='Baby' value={this.state.baby} onChange={this.handleCheckbox} />
                                Baby
                            </Label>
                            <ModalFooter className='modal-footer'>
                                <Button color="footer-confirm" onClick={this.submit}>Submit</Button>
                                <Button color="footer-cancel" onClick={this.showModal}>Cancel</Button>
                            </ModalFooter>
                        </ModalBody>
                    </Modal>

                <div className='results-div'>
                    {this.state.results.length > 0 ? this.renderSearch() : <h1 style={{backgroundColor: '#aaaaaa', color: 'black'}}>No Pokemon found with the specified criteria!</h1>}
                </div>
                <div className='search-button-div'>
                    <Button className='search-button' onClick={this.showModal}>Search</Button>
                    <Button className='reset-button' onClick={this.resetResults}>Reset</Button>
                </div>


            </div>

            <div className='quiz-nav'>
                    <NavMenu className='homepage-nav-menu'></NavMenu>
            </div>
            </>
        )
    }
}

export default Search;