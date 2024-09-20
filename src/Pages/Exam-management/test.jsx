
import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import { useNavigate } from "react-router-dom"; // useNavigate ko import karein

const Scanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // useNavigate ko initialize karein

  const handleScan = (data) => {
    if (data) {
      setScanResult(data); // Set the scanned result
      const studentId = data.match(/studentId:\s*"([^"]+)"/)[1]; // Extract the studentId
      navigate(`/student-data/${studentId}`); // Navigate to StudentData with studentId in URL
    }
  };

  const handleError = (err) => {
    setErrorMessage("Error occurred: " + err);
    console.error(err); // Log any error that happens during scanning
  };

  return (
    <div>
      <h1>QR Code Scanner</h1>
      <div style={{ margin: "20px auto", width: "300px" }}>
        <QrReader
          delay={300}
          constraints={{ facingMode: "environment" }} // Use back camera
          onError={handleError}
          onScan={handleScan}
          style={{ width: "100%" }}
        />
      </div>

      {scanResult ? (
        <div>
          <h2>Scanned QR Code Data:</h2>
          <p>{scanResult}</p>
        </div>
      ) : (
        <p>No QR code scanned yet.</p>
      )}

      {errorMessage && (
        <div>
          <h3 style={{ color: "red" }}>{errorMessage}</h3>
        </div>
      )}
    </div>
  );
};

export default Scanner;
