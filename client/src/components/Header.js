import React from 'react';
import { Link } from 'react-router-dom';
import decode from "jwt-decode"


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
        <div>
            {SignedIn() ? (
                <>
                <button onClick={logout}>logout</button>
                </>
            ) : (
                <>
                <Link to="/">login</Link>
                </>
            )}
        </div>
        </>
       
    );
};

export default Header;