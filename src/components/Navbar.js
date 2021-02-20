import React from 'react';
import '../styles/navbar.scss';

function Navbar() {
    return (
        <>
            <nav className="navbar navbar-dark default-color">
                <form className="form-inline my-2 my-lg-0 ml-auto">
                    <input className="form-control" type="search" placeholder="Search" aria-label="Search" />
                    <button className="search btn btn-outline-white btn-md my-2 my-sm-0 ml-3" type="submit">Search</button>
                </form>
            </nav>
        </>
    )
}

export default Navbar