import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Nav, NavItem } from 'react-bootstrap';
import '../styles/dashboard.css';

export default function Sidebar() {
    const location = useLocation();

    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary z-3" style={{ minHeight: '100vh' }}>
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                <a className="navbar-brand" href="#" id="logo">
                    Tragick
                </a>
            </a>
            <hr />
            <Nav className="flex-column mb-auto">
                <NavItem>
                    <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                        <svg className="bi pe-none me-2" width="16" height="16">
                            <use xlinkHref="#home" />
                        </svg>
                        Create Acknowledgement
                    </Link>
                </NavItem>
                <NavItem>
                    <Link to="/product" className={`nav-link ${location.pathname === '/product' ? 'active' : ''}`}>
                        <svg className="bi pe-none me-2" width="16" height="16">
                            <use xlinkHref="#speedometer2" />
                        </svg>
                        Product
                    </Link>
                </NavItem>
                <NavItem>
                    <Link to="/all-products" className={`nav-link ${location.pathname === '/all-products' ? 'active' : ''}`}>
                        <svg className="bi pe-none me-2" width="16" height="16">
                            <use xlinkHref="#table" />
                        </svg>
                        Show Product
                    </Link>
                </NavItem>
                <NavItem>
                    <Link to="/all-instances" className={`nav-link ${location.pathname === '/all-instances' ? 'active' : ''}`}>
                        <svg className="bi pe-none me-2" width="16" height="16">
                            <use xlinkHref="#grid" />
                        </svg>
                        Show Instances
                    </Link>
                </NavItem>
            </Nav>
            <hr />
            <div className="dropdown">
                <a href="#" className="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
                    <strong>mdo</strong>
                </a>
                <ul className="dropdown-menu text-small shadow">
                    <li>
                        <Link to="/logout" className="dropdown-item">
                            Sign out
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
