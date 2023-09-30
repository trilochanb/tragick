import React, { useState } from 'react';
import { useAuthStore } from '../store/auth';
import useAxios from '../utils/useAxios';

export default function CreateProduct() {
  const [name, setName] = useState('');
  const [isLoggedIn, user] = useAuthStore((state) => [
    state.isLoggedIn,
    state.user,
  ]);

  const api = useAxios();

  const handleCreateProduct = async (e) => {
    e.preventDefault();

    const postData = {
      owner: user().user_id,
      name: name,
    };

    try {
      const response = await api.post('products/', postData);

      console.log(response.data);
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4">
            <h2 className="text-center mb-4">Create Product</h2>
            <form onSubmit={handleCreateProduct}>
              <div className="mb-3">
                <label htmlFor="productName" className="form-label">
                  Product Name
                </label>
                <input
                  type="text"
                  name="productName"
                  className="form-control"
                  id="productName"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
                <div className="valid-feedback">Looks good!</div>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg mt-3"
                >
                  Create Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
