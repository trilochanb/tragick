import React, {useState, useEffect} from 'react';
import {useAuthStore} from '../store/auth';
import useAxios from '../utils/useAxios';
import Dashboard from "./Sidebar.jsx";
import Balance from "./Balance.jsx";

export default function ShowProduct() {
    const [isLoggedIn, user] = useAuthStore((state) => [
        state.isLoggedIn,
        state.user,
    ]);

    const [products, setProducts] = useState([]);
    const api = useAxios();

    useEffect(() => {
        const getProducts = async () => {
            const response = await api.get('products/');
            setProducts(response.data.data);
        };
        getProducts();
    }, []);

    const handleOnClick = () => {
        // Handle button click here
    };

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <Dashboard/>
                    </div>
                    <div className="col-md-10 d-flex flex-column ">
                        <Balance className="align-self-start"/>
                        <div className="container mt-5">
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Owner</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Token Id</th>
                                    <th scope="col">Created At</th>
                                    <th scope="col">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {products.map((element, index) => (
                                    <tr key={index}>
                                        <th scope="row">{element.id}</th>
                                        <td>{element.owner}</td>
                                        <td>{element.name}</td>
                                        <td>{element.token_id}</td>
                                        <td>{element.created_at}</td>
                                        <td>
                                            <button
                                                className="btn btn-primary"
                                                onClick={handleOnClick}
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}
