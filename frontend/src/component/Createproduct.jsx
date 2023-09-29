import React, { useState } from 'react';
import { useAuthStore } from '../store/auth';
import useAxios from '../utils/useAxios';

export default function Createproduct() {
  const [name, setName] = useState('');
  const [isLoggedIn, user] = useAuthStore((state) => [
    state.isLoggedIn,
    state.user,
  ]);

  const api = useAxios(); // Create an Axios instance using the useAxios function

  const handleCreateProduct = async (e) => {
    e.preventDefault();

    const postData = {
      owner: user().user_id,
      name: name,
    };

    try {
      const response = await api.post(
        'products/', // You don't need to specify the full URL here, as it's already configured in axiosInstance
        postData
      );

      console.log(response.data);
    } catch (error) {
      console.error('Error creating product:', error);
    }
  }

  return (
    <>
      <div className="container-fluid">
        <div className="create-product-form col-md-6">
          <h2 className="display-6">Create Product</h2>
          <form
            className="row g-3 needs-validation d-flex justify-content-center align-items-center flex-column w-100"
            noValidate
          >
            <div className="col-md-10 mt-5">
              <label htmlFor="validationCustom01" className="form-label">
                Product Name
              </label>
              <input
                type="text"
                name="productName"
                className="form-control"
                id="validationCustom01"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
              <div className="valid-feedback">Looks good!</div>
            </div>

            <div className="col-10">
              <button
                className="btn btn-primary mt-3"
                onClick={handleCreateProduct} // Corrected the function name here
              >
                Create Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
