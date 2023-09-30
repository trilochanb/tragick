import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body className="d-flex justify-content-center align-items-center"></Modal.Body>
        </Modal>
    );
}

function ModalButton({ modalContent }) {
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <div class="card" style="width: 18rem;" onClick={() => setModalShow(true)}>
                <img class="card-img-top" src="..." alt="Card image cap" />
                <div class="card-body">
                    <h5 class="card-title">Card title</h5>
                    <p class="card-text">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                    </p>
                    <a href="#" class="btn btn-primary">
                        Go somewhere
                    </a>
                </div>
            </div>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                content={modalContent}
            />
        </>
    );
}

export default ModalButton;
