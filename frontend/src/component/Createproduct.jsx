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
        <div className="container my-5 bg-white p-5 rounded-4">
            <div className="d-flex row justify-content-start">
                <form onSubmit={handleCreateProduct}>
                    <div className="mb-5">
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

                    {/* Dummy Image Upload Field */}
                    <div className="mb-3">
                        <label htmlFor="productImage" className="form-label">
                            Product Image
                        </label>
                        <input
                            type="file"
                            name="productImage"
                            className="form-control"
                            id="productImage"
                            accept="image/*"
                        />
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
    );
}
