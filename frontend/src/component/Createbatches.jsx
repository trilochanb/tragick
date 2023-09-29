import React, {useEffect, useState} from 'react';
import useAxios from '../utils/useAxios';
import { useAuthStore } from '../store/auth';

export default function Createbatches() {
    const [isLoggedIn, user] = useAuthStore((state) => [
        state.isLoggedIn,
        state.user,
      ]);

      const  [products , setProducts] = useState([]);
      const [price , setPrice] = useState(1);
      const [quantity , setQuantity] = useState(0);
      const api = useAxios(); 
      useEffect(()=>{
        const  getProducts = async()=>{

            const response = await api.get('products/');
            setProducts(response.data.data);
        }
        getProducts();

      },[])
      const [product, setProduct] = useState(products[0]);
      
      const handleChange = (e) => {
        console.log("Product Selected!!");
        setProduct(e.target.value);
        // console.log(e.target.value);
      };

      const handelCreateBatch = async(e) =>{
        e.preventDefault();

        const postData = {
            product : product,
            quantity : quantity, 
            price : 5
        }

        const response = await api.post('batches/' , postData);
        console.log(response.data.data);

      }

    return (
        <>
            <div className="create-batches-form col-md-6">
                <h2 className="display-6 mb-5">Create Batches</h2>

                <form
                    className="row g-3 needs-validation d-flex justify-content-center align-items-center flex-column w-100"
                    noValidate
                >
                    <select
                        className="form-select col-md-10"
                        aria-label="Default select example"
                        id="product-selection"
                        value={product}
                        onChange={handleChange}
                    >
                        {
                            products.map((currentElement) =>{
                                return(
                                    <option value={currentElement.id} key={currentElement.id}>{currentElement.name} </option>
                                )
                            })
                        }

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
                            onChange={(e) => setQuantity(e.target.value)}
                            value={quantity}
                            required
                        />
                        <div className="valid-feedback">Looks good!</div>
                    </div>
                    <div className="col-md-10 mt-5">
                        <label
                            htmlFor="validationCustom01"
                            className="form-label"
                        >
                            Price
                        </label>
                        <input
                            type="number"
                            name="productName"
                            className="form-control"
                            id="validationCustom01"
                            onChange={(e) => setPrice(e.target.value)}
                            value={price}
                            required
                        />
                        <div className="valid-feedback">Looks good!</div>
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
        </>
    );
}
