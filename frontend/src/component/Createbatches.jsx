import React, { useEffect, useState } from 'react';
import useAxios from '../utils/useAxios';
import { useAuthStore } from '../store/auth';

export default function CreateBatches() {
  const [isLoggedIn, user] = useAuthStore((state) => [
    state.isLoggedIn,
    state.user,
  ]);

  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState(1);
  const [quantity, setQuantity] = useState(0);
  const api = useAxios();

  useEffect(() => {
    const getProducts = async () => {
      const response = await api.get('products/');
      setProducts(response.data.data);
    };
    getProducts();
  }, []);

  const [product, setProduct] = useState(products[0]);

  const handleChange = (e) => {
    setProduct(e.target.value);
  };

  const handleCreateBatch = async (e) => {
    e.preventDefault();

    const postData = {
      product: product,
      quantity: quantity,
      price: price,
    };

    const response = await api.post('batches/', postData);
    console.log(response.data.data);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4">
            <h2 className="card-title text-center mb-4">Create Batches</h2>
            <form onSubmit={handleCreateBatch}>
              <div className="mb-3">
                <label htmlFor="productSelection" className="form-label">
                  Product
                </label>
                <select
                  className="form-select"
                  id="productSelection"
                  value={product}
                  onChange={handleChange}
                >
                  {products.map((currentElement) => (
                    <option
                      value={currentElement.id}
                      key={currentElement.id}
                    >
                      {currentElement.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="quantity" className="form-label">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  className="form-control"
                  id="quantity"
                  onChange={(e) => setQuantity(e.target.value)}
                  value={quantity}
                  required
                />
                <div className="valid-feedback">Looks good!</div>
              </div>

              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  className="form-control"
                  id="price"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  required
                />
                <div className="valid-feedback">Looks good!</div>
              </div>

              <div className="text-center">
                <button type="submit" className="btn btn-primary btn-lg">
                  Create Batches
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
