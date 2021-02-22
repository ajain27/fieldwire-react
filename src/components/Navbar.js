import React, { useRef, useState } from 'react';
import "../styles/navbar.scss";
import { FaLinkedin } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';

function Navbar({ setSearch }) {

    const [searchText, setSearchText] = useState('');
    const inputElement = useRef(null);

    function handleSearch(e) {
        e.preventDefault();
        setSearchText(setSearch);
    }

    return (
        <div>
            <div className="container">
                <nav className="search navbar mt-3">
                    <div className="col">
                       <span className="awesome-font">Ankit Jain</span>
                    </div>
                    <div className="col p-0">
                         <form className="form-inline my-2 my-lg-0 m-auto w-100" onSubmit={handleSearch}>
                        <input
                            className="searchInput form-control mr-sm-2"
                            type="search"
                            placeholder="Search"
                            ref={inputElement}
                            onChange={event => setSearchText(event.target.value)}
                            aria-label="Search" />
                        <button
                            className="btn searchbtn my-2 my-sm-0"
                            type="submit">Search</button>
                    </form>
                    </div>
                    <div className="col text-right">
                        <a href="https://www.linkedin.com/in/ankitjain86/">
                            <FaLinkedin className="fa-icons mr-4" />
                        </a>
                        <a href="https://github.com/ajain27">
                            <FaGithub className="fa-icons mr-3"/>
                        </a>                        
                    </div>                   
                </nav>
            </div>
        </div>
    )
}

export default Navbar
