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
            <Modal.Body className='d-flex justify-content-center align-items-center'>
                <button className='btn btn-success' onClick={handleBuyProduct}>Buy</button>
            </Modal.Body>
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
