// import React, { useState, useRef } from 'react'; // Import useRef
// import Webcam from 'react-webcam';
// import useAxios from '../utils/useAxios';
// import { useAuthStore } from '../store/auth';
// import Sidebar from './Sidebar';
// import Balance from './Balance';

// export default function CreateAcknowledgement() {
//     const [scanResult, setScanResult] = useState(null);
//     const webcamRef = useRef(null);

//     const handleTakePhoto = () => {
//         const imageSrc = webcamRef.current.getScreenshot();
//         const blob = dataURItoBlob(imageSrc);
//         handleFileUpload(blob);
//     };

//     const handleFileUpload = async (file) => {
//         let formData = new FormData();
//         formData.append('file', file);

//         try {
//             let response = await fetch(
//                 'https://api.qrserver.com/v1/read-qr-code/',
//                 {
//                     method: 'POST',
//                     body: formData,
//                 }
//             );

//             if (response.ok) {
//                 let result = await response.json();

//                 result = result[0]?.symbol[0]?.data || null;

//                 setScanResult(result);
//             } else {
//                 console.error('Error:', response.status);
//                 setScanResult(null);
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             setScanResult(null);
//         }
//     };

//     const dataURItoBlob = (dataURI) => {
//         const byteString = atob(dataURI.split(',')[1]);
//         const ab = new ArrayBuffer(byteString.length);
//         const ia = new Uint8Array(ab);
//         for (let i = 0; i < byteString.length; i++) {
//             ia[i] = byteString.charCodeAt(i);
//         }
//         return new Blob([ab], { type: 'image/jpeg' });
//     };

//     return (
//         <>
//             <div className="container-fluid">
//                 <div className="row">
//                     <div className="col-md-2">
//                         <Sidebar />
//                     </div>
//                     <div className="col-md-10 d-flex flex-column ">
//                         <Balance className="align-self-start" />

//                         <div className=" d-flex flex-column w-70 h-70 justify-content-center align-items-center">
//                             <div className="d-flex flex-column">
//                                 <h1 className='mb-5'>QR Code Scanner</h1>

//                                 <Webcam
//                                     audio={false}
//                                     ref={webcamRef}
//                                     screenshotFormat="image/jpeg"
//                                 />

//                                 <button onClick={handleTakePhoto} className='btn btn-primary'>
//                                     Scan QR
//                                 </button>

//                                 {scanResult && (
//                                     <div>
//                                         <p>Scan Result:</p>
//                                         <textarea
//                                             value={scanResult}
//                                             readOnly
//                                         ></textarea>
//                                         <button
//                                             onClick={() =>
//                                                 navigator.clipboard.writeText(
//                                                     scanResult
//                                                 )
//                                             }
//                                         >
//                                             Copy
//                                         </button>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

import { QrScanner } from '@yudiel/react-qr-scanner';
import Sidebar from './Sidebar';
import ShowBalance from './Balance';
import React, { useState, useRef } from 'react';
import BuyModal from './BuyInstance';

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
                    <Sidebar />
                </div>
                <div className="col-md-10 d-flex flex-column">
                    <ShowBalance className="align-self-start" />
                    {scanResult ? (
                        <BuyModal
                            modalContent={scanResult}
                            onClose={handleCloseModal}
                        />
                    ) : (
                        <div className="container" style={{ width: '100%' }}>
                            <QrScanner
                                className="w-100"
                                onDecode={handleScan}
                                onError={(error) => setError(error?.message)}
                                ref={qrScannerRef}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
