import React from 'react';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import '../styles/product.css';
import Createproduct from './Createproduct';
import Createbatches from './Createbatches';
import Showproduct from './Showproduct';

export default function Product() {
    return (
        <>
            <div className="container-fluid">
                <Navbar />  
                <div className="row" id="product-container">
                    <div className="col-md-2 shadow">
                        <Dashboard />
                    </div>
                    <div className="col-md-10 ">
                        <div className="container-fluid row">
                            <div className="col-md-6"><Createproduct/></div>
                            <div className="col-md-6"><Createbatches/></div>
                        </div>
                        <div className="col-12"><Showproduct/></div>
                    </div>
                </div>
            </div>
        </>
    );
}
