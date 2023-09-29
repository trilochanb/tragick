import React from 'react';
import '../styles/navbar.css';
import {FaUser} from 'react-icons/fa';

export default function Navbar() {
    return (
        <>
            

            <nav className="navbar navbar-expand-lg bg-body-tertiary " id='nav-container'>
                <div className="container-fluid d-flex justify-content-between align-items-center">
                    <a className="navbar-brand" href="#" id="logo">
                        Tragick
                    </a>
                    <div className="navLinks">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-center justify-content-between ml-5" id='nav-items-container'>
                            <li className="nav-item fs-5" id='balance'>
                               $ {0}
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link active"
                                    aria-current="page"
                                    href="/"
                                >
                                   <FaUser size={25}/>
                                </a>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}
