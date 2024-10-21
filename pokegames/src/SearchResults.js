import React from 'react';

class SearchResults extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            names: this.props.names,
            dex: this.props.dex
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.results !== this.state.results) {
            this.handleNewSearch()
        }
    }


    handleNewSearch = (event) => {
        this.setState = {
            names: [],
            dex: []
        }
        this.render();
    }





    render() {

        return (
            <>
            {this.state.names.map((name, i) => {
                return <p key={i}>{name}</p>
            })}
            </>
        )
    }
}

export default SearchResults;