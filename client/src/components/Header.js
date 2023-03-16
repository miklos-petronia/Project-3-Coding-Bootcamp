import React from 'react';
import { Link } from 'react-router-dom';
import decode from "jwt-decode"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const Header = () => {
    const logout = (event) => {
        event.preventDefault();
        localStorage.removeItem("tokenId")
        window.location.reload()
        window.location.assign("/")

    };

    const SignedIn = () => {
        const tokenId = localStorage.getItem("tokenId")
        if (!tokenId) {
            return false
        }
        let notExpired;
        switch (true) {
            case (decode(tokenId).exp > Date.now() / 1000):
                notExpired = true;
                break
            default:
                localStorage.removeItem("tokenId")
                notExpired = false;
        }

        return tokenId && notExpired
    }
    return (

        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">Code Tracker</Navbar.Brand>
                    <Nav className="d-flex justify-contents-end">
                    {SignedIn() ? (
                        <Nav.Link onClick={logout}>Logout</Nav.Link>
                ) : (
                    <div className='d-flex gap-3'>
                        <Link style={{textDecoration: "none", color: "#ffffff"}} to="/">Login</Link>
                        <Link style={{textDecoration: "none", color: "#ffffff"}} to="/signup">Signup</Link>
                    </div>
                )} 
                    </Nav>
                </Container>
            </Navbar>
            
        </>

    );
};

export default Header;