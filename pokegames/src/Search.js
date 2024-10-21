import React from 'react';
import { Label, Modal, ModalBody, Input, Button, ModalFooter, ModalHeader } from 'reactstrap';
import SearchResults from './SearchResults';



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
            results: Object(),
            resNames: []


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
            query += `type=${this.state.pType}&`;
        }
        if (this.state.sType) {
            query += `type=${this.state.sType}&`;
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

        fetch(`http://localhost:5000/dex?${query}`, {
            method: 'GET'
        }).then(response => {
            if (response.status === 200) {
                return response.json();
            }
        }).then(jData => {
            if (jData) {
                this.setState({
                    results: jData
                })
                this.updateResults();
            }
            })

    }

    submit = () => {
        if (this.state.dex || this.state.name || this.state.generation || this.state.pType || this.state.sType || this.state.color) {
            this.search();
            this.clear();
            this.showModal();
        }
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    updateResults = () => {
        let dex = [];
        let colors = [];
        let legendaries = [];
        let mythicals = [];
        let babies = [];
        let generations = [];

        if (this.state.results.length > 0) {
            this.state.results.forEach((item) => {
                this.state.resNames.push(item.name);
                dex.push(item.id);
                colors.push(item.color);
                legendaries.push(item.legendary);
                mythicals.push(item.mythical);
                babies.push(item.baby);
                generations.push(item.generation);
            })
        }

        console.log(this.state.resNames)
    }

    render() {





        return (
            <>
            <div>
                <Button classname='search-button' onClick={this.showModal}>Search</Button>

                <Modal isOpen={this.state.open} toggle={this.showModal} className={this.props.className}>
                    <ModalHeader className='modal-header'>Enter Pokemon details here:</ModalHeader>
                    <ModalBody>
                        <Input type='number' min={1} max={1025} name='dex' placeholder='Dex Number' value={this.state.dex} onChange={this.handleInputChange} />
                        <Input type='text' name='name' placeholder='Name' value={this.state.name} onChange={this.handleInputChange} />
                        <Input type='number' min={1} max={9} name='generation' placeholder='Generation' value={this.state.generation} onChange={this.handleInputChange} />
                        <Input type='text' name='pType' placeholder='Primary Type' value={this.state.pType} onChange={this.handleInputChange} />
                        <Input type='text' name='sType' placeholder='Secondary Type' value={this.state.sType} onChange={this.handleInputChange}/>
                        <Input type='text' name='color' placeholder='Color' value={this.state.color} onChange={this.handleInputChange} />

                        <Label>
                            <Input type='checkbox' defaultChecked={false} name='legendary' placeholder='Legendary' value={this.state.legendary} onChange={this.handleInputChange} />
                            Legendary
                        </Label>
                        <Label>
                            <Input type='checkbox' defaultChecked={false} name='mythical' placeholder='Mythical' value={this.state.mythical} onChange={this.handleInputChange} />
                            Mythical
                        </Label>
                        <Label>
                            <Input type='checkbox' defaultChecked={false} name='baby' placeholder='Baby' value={this.state.baby} onChange={this.handleInputChange} />
                            Baby
                        </Label>
                        <ModalFooter>
                            <Button color="primary" onClick={this.submit}>Submit</Button>
                            <Button color="secondary" onClick={this.showModal}>Cancel</Button>
                        </ModalFooter>
                    </ModalBody>
                </Modal>
            </div>

            <div>
                
                <SearchResults names={this.state.resNames}></SearchResults>
            </div>
            </>
        )
    }
}

export default Search;