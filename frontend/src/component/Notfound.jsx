import React from 'react'
import Balance from './Balance.jsx'
import Dashboard from './Sidebar.jsx'
import '../styles/notfound.css';
import { useNavigate } from 'react-router-dom';

export default function Notfound() {
    const navigate = useNavigate();
  return (
    <>
      <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <Dashboard/>
            </div>
            <div className="col-md-10 d-flex flex-column ">
                <Balance className="align-self-start"/>
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
