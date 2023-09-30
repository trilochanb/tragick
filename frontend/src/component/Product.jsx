import React from 'react';
import Navbar from './Balance.jsx';
import Dashboard from './Sidebar.jsx';
import '../styles/product.css';
import Createproduct from './Createproduct';
import Createbatches from './Createbatches';
import Showproduct from './Showproduct';
import Balance from "./Balance.jsx";
import CreateProduct from "./Createproduct";
import CreateBatches from "./Createbatches";

export default function Product() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <Dashboard />
                </div>
                <div className="col-md-10">
                    <Balance className="align-self-start" />
                    <div className="container my-5 mt-3">
                        <div className="p-3 bg-body-tertiary rounded-3 row mt-3 p-5">
                            {/* Create Product */}
                            <div className="col-6 mb-4">
                                <CreateProduct />
                            </div>

                            {/* Create Batches */}
                            <div className="col-6 mb-4">
                                <CreateBatches />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
