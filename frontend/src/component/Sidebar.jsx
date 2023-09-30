import React from 'react';
import '../styles/dashboard.css';

export default function Sidebar() {
    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary z-3" style={{ minHeight: '100vh' }}>
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                <a className="navbar-brand" href="#" id="logo">
                    Tragick
                </a>
            </a>
            <hr/>
            <ul className="nav nav-pills flex-column mb-auto ">
                <li className="nav-item bg-light m-2">
                    <a href="/" className="nav-link active" aria-current="page">
                        <svg className="bi pe-none me-2" width="16" height="16">
                            <use xlinkHref="#home"/>
                        </svg>
                        Acknowledge
                    </a>
                </li>
                <li className="nav-item bg-light m-2">
                    <a href="/product" className="nav-link ">
                        <svg className="bi pe-none me-2" width="16" height="16">
                            <use xlinkHref="#speedometer2"/>
                        </svg>
                        Product
                    </a>
                </li>
                <li className="nav-item bg-light m-2">
                    <a href="/all-products" className="nav-link ">
                        <svg className="bi pe-none me-2" width="16" height="16">
                            <use xlinkHref="#table"/>
                        </svg>
                        Show Products
                    </a>
                </li>
                <li className="nav-item bg-light m-2">
                    <a href="/all-instances" className="nav-link ">
                        <svg className="bi pe-none me-2" width="16" height="16">
                            <use xlinkHref="#grid"/>
                        </svg>
                        Show Instances
                    </a>
                </li>
            </ul>
            <hr/>
            <div className="dropdown">
                <a href="#" className="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2"/>
                    <strong>mdo</strong>
                </a>
                <ul className="dropdown-menu text-small shadow">
                    <li><a className="dropdown-item" href="/logout">Sign out</a></li>
                </ul>
            </div>
        </div>
    );
}

