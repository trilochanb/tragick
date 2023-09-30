import React, { useEffect, useState } from 'react';
import '../styles/navbar.css';
// import { FaUser } from 'react-icons/fa';
import { useAuthStore } from '../store/auth.js';
import useAxios from '../utils/useAxios.js';

export default function ShowBalance() {
    const [balance, setBalance] = useState(0);
    const [isLoading, setIsLoading] = useState(true); // Add loading state
    const [isLoggedIn, user] = useAuthStore((state) => [state.isLoggedIn, state.user, []]);

    const api = useAxios();

    useEffect(() => {
        if (isLoggedIn) { // Check if the user is logged in
            const getBalance = async () => {
                try {
                    const response = await api.get(`users/${user().user_id}`);
                    setBalance(response.data['balance']);
                    setIsLoading(false); // Set loading state to false once data is fetched
                } catch (error) {
                    console.error('Error fetching balance:', error);
                    setIsLoading(false); // Set loading state to false in case of an error
                }
            };
            getBalance();
        }
    }, [user().user_id, isLoggedIn]); // Add dependencies

    return (
        <div className="status">
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div className="status d-flex justify-content-end align-items-start">
                    <h2>
                        <span className="display-4">{balance}</span>ℏ
                    </h2>
                </div>
            )}
        </div>
    );
}
