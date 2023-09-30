import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import QRCode from 'qrcode.react';

function MyVerticallyCenteredModal(props) {
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
                <QRCode className='mt-3 mb-5' value={JSON.stringify(props.content)} size={400}></QRCode>
            </Modal.Body>
        </Modal>
    );
}

function ModalButton({ modalContent }) {
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <Button variant="primary" onClick={() => setModalShow(true)}>
                View
            </Button>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                content={modalContent}
            />
        </>
    );
}

export default ModalButton;
