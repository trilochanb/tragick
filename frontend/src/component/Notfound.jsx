import React from 'react'
import Navbar from './Navbar'
import Dashboard from './Dashboard'
import '../styles/notfound.css';
import { useNavigate } from 'react-router-dom';

export default function Notfound() {
    const navigate = useNavigate();
  return (
    <>
      <div className="container-fluid">
        <Navbar/>
        <div className="row">
            <div className="col-md-2">
                <Dashboard/>
            </div>
            <div className="col-md-10">
                <div className="container-fluid" id='notfound-container'>
                    <h2 id='notfound-text'>404! Page Notfound</h2>
                    <button className='btn btn-primary' onClick={()=> navigate("/")}>Go Back</button>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}
