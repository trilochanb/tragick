import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router v6
import { useAuthStore } from '../store/auth';
import useAxios from '../utils/useAxios';


function MyVerticallyCenteredModal(props) {
    const [isLoggedIn, user] = useAuthStore((state) => [
        state.isLoggedIn,
        state.user,
      ]);
      const data = JSON.parse(props.content)
      console.log(typeof(data))
      const api = useAxios();
      const handleBuyProduct = async (e) => {
        e.preventDefault();
    
        const postData = {
          owner: user().user_id,
          instance: data['id'],
        };
    
        const response = await api.post('acknowledgements/', postData);
        console.log(response.data.data);
      };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
            </Modal.Header>
            <div className="card">
                <div className="card-header">
                    Featured
                </div>
                <div className="card-body">
                    <h5 className="card-title">Special title treatment</h5>
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <a href="#" className="btn btn-primary" onClick={handleBuyProduct}>Buy</a>
                </div>
            </div>
        </Modal>
    );
}

function BuyModal({ modalContent }) {
    const [modalShow, setModalShow] = useState(true);
    const navigate = useNavigate();
    const handleCloseModal = () => {
        setModalShow(false);
        navigate('/acknowledgement'); 
    };

    return (
        <>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={handleCloseModal} 
                content={modalContent}
            />
        </>
    );
}

export default BuyModal;
