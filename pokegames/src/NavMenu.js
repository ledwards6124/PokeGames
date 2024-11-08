import React from 'react';
import { Navbar, Nav, NavbarBrand, NavLink } from 'reactstrap';

class NavMenu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
            <Navbar className='nav'>
                    <NavbarBrand href='/'>{this.props.name}</NavbarBrand>
                    <Nav className="me-auto">
                        <NavLink href="/">Home</NavLink>
                        <NavLink href="quiz">Quiz</NavLink>
                        <NavLink href="search">Search</NavLink>
                    </Nav>
            </Navbar>
            </>
        );
    }
}   

export default NavMenu;