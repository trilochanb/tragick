import React, { useState } from 'react';
import Webcam from 'react-webcam';

export default function Ackno() {
    const [scanResult, setScanResult] = useState(null);
    const webcamRef = React.useRef(null);

    const handleTakePhoto = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        const blob = dataURItoBlob(imageSrc);
        handleFileUpload(blob);
    };

    const handleFileUpload = async (file) => {
        let formData = new FormData();
        formData.append('file', file);

        try {
            let response = await fetch(
                'https://api.qrserver.com/v1/read-qr-code/',
                {
                    method: 'POST',
                    body: formData,
                }
            );

            let result = await response.json();

            result = result[0]?.symbol[0]?.data || null;

            setScanResult(result);
        } catch (error) {
            console.error('Error:', error);
            setScanResult(null);
        }
    };

    const dataURItoBlob = (dataURI) => {
        const byteString = atob(dataURI.split(',')[1]);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: 'image/jpeg' });
    };
    return (
        <>
            <div className="App">
                <h1>QR Code Scanner</h1>

                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                />

                <button onClick={handleTakePhoto}>Take Photo</button>

                {scanResult && (
                    <div>
                        <p>Scan Result:</p>
                        <textarea value={scanResult} readOnly></textarea>
                        <button
                            onClick={() =>
                                navigator.clipboard.writeText(scanResult)
                            }
                        >
                            Copy
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
