import {QrScanner} from '@yudiel/react-qr-scanner';
import Sidebar from './Sidebar';
import ShowBalance from './Balance';
import React, {useState, useRef} from 'react';
import BuyModal from './BuyInstance';
import Balance from "./Balance.jsx";

export const CreateAcknowledgement = () => {
    const [scanResult, setScanResult] = useState(null);
    const [error, setError] = useState(null);
    const qrScannerRef = useRef(null);

    const handleScan = (result) => {
        if (result) {
            setScanResult(result);

            // // Stop the video stream
            // if (qrScannerRef.current) {
            //     const mediaStream = qrScannerRef.current.getMediaStream();
            //     if (mediaStream) {
            //         const tracks = mediaStream.getTracks();
            //         tracks.forEach((track) => {
            //             track.stop();
            //         });
            //     }
            // }
        }
    };

    const handleCloseModal = () => {
        setScanResult(null);
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <Sidebar/>
                </div>
                <div className="col-md-10 d-flex flex-column">
                    <Balance className="align-self-start"/>
                    {scanResult ? (
                        <BuyModal
                            modalContent={scanResult}
                            onClose={handleCloseModal}
                        />
                    ) : (
                        <div className="container parent">
                            <div className="container child">
                                <QrScanner
                                    onDecode={handleScan}
                                    onError={(error) => setError(error?.message)}
                                    ref={qrScannerRef}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
