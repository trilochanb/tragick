import React, { useState } from 'react';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import '../styles/product.css';
import axios from 'axios';

export default function Product() {
    const [productName, setProductName] = useState('');
    const [quantity, setQuantity] = useState(0);

    const handelCreateProduct = async (e) => {
        e.preventDefault();
        const postData = {
            owner: owner.id,
            name: productName,
        };

        await axios.post('http://localhost:8000/api/v1/products/', postData);
    };
    const handelCreateBatch = (e) => {
        e.preventDefault();
    };
    return (
        <>
            <div className="container-fluid">
                <Navbar />
                <div className="row" id="product-container">
                    <div className="col-md-2">
                        <Dashboard />
                    </div>
                    <div className="col-md-10 ">
                        <div className="container-fluid" id='product-form-container'>
                            <div id="product-form" className="row">
                                <div className="create-product-form col-md-6">
                                    <h2 className='display-6'>Create Product</h2>
                                    <form
                                        className="row g-3 needs-validation d-flex justify-content-center align-items-center flex-column w-100"
                                        noValidate
                                    >
                                        <div className="col-md-10 mt-5">
                                            <label
                                                htmlFor="validationCustom01"
                                                className="form-label"
                                            >
                                                Product Name
                                            </label>
                                            <input
                                                type="text"
                                                name="productName"
                                                className="form-control"
                                                id="validationCustom01"
                                                onChange={(e) =>
                                                    setProductName(
                                                        e.target.value
                                                    )
                                                }
                                                value={productName}
                                                required
                                            />
                                            <div className="valid-feedback">
                                                Looks good!
                                            </div>
                                        </div>

                                        <div className="col-10">
                                            <button
                                                className="btn btn-primary mt-3"
                                                onClick={handelCreateProduct}
                                            >
                                                Create Proudct
                                            </button>
                                        </div>
                                    </form>
                                </div>

                                

                                {/* create batches */}

                                <div className="create-batches-form col-md-6">
                                <h2 className='display-6 mb-5'>Create Batches</h2>

                                    <form
                                        className="row g-3 needs-validation d-flex justify-content-center align-items-center flex-column w-100"
                                        noValidate
                                    >
                                        <select
                                            className="form-select col-md-10"
                                            aria-label="Default select example"
                                            id='product-selection'
                                        >
                                            <option selected>
                                                Open this select menu
                                            </option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                        <div className="col-md-10 mt-5">
                                            <label
                                                htmlFor="validationCustom01"
                                                className="form-label"
                                            >
                                                Quantity
                                            </label>
                                            <input
                                                type="number"
                                                name="productName"
                                                className="form-control"
                                                id="validationCustom01"
                                                onChange={(e) =>
                                                    setQuantity(e.target.value)
                                                }
                                                value={quantity}
                                                required
                                            />
                                            <div className="valid-feedback">
                                                Looks good!
                                            </div>
                                        </div>

                                        <div className="col-10">
                                            <button
                                                className="btn btn-primary mt-3"
                                                onClick={handelCreateBatch}
                                            >
                                                Create Batches
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div id="showdata">

                            <h2 className='display-6 mb-4'>Show Instances</h2>

                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">First</th>
                                            <th scope="col">Last</th>
                                            <th scope="col">Handle</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td>@fat</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>Larry</td>
                                            <td>the Bird</td>
                                            <td>@twitter</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

        

        // <>
        //     <div className="container-fluid">
        //         <Navbar/>
        //         <div className="row">
        //             <div id="dashboard" className='col-md-2'><Dashboard/></div>
        //             <div id="product-container" className='col-md-10'>
        //                 {/* Add proudct  */}
                        
        //             </div>
        //         </div>
        //     </div>

        // </>
    );
}
