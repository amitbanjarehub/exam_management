

import React, { useEffect, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

const QRscanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const config = {
      fps: 10,
      qrbox: { width: 250, height: 250 }, // Set exact pixel values instead of string percentages
    };

    const scanWithBackCamera = async () => {
      try {
        const devices = await Html5Qrcode.getCameras();
        if (devices && devices.length) {
          const backCamera =
            devices.find((device) =>
              device.label.toLowerCase().includes("back")
            ) || devices[0];

          const scanner = new Html5Qrcode("reader");

          scanner.start(
            backCamera.id,
            config,
            (decodedText) => {
              setScanResult(decodedText); // Successfully scanned QR code
              scanner.stop(); // Stop the scanner after one successful scan
            },
            (error) => {
              // Log the error or handle it in a user-friendly way
              console.log("QR Code scanning failed. Error: " + error);
            }
          );
        } else {
          setErrorMessage("No cameras found");
        }
      } catch (error) {
        console.error("Error starting the QR scanner:", error);
        setErrorMessage("Error initializing the QR scanner: " + error.message);
      }
    };

    // Start scanning on component mount
    scanWithBackCamera();

    // Cleanup when the component is unmounted
    return () => {
      if (Html5Qrcode.getCameras()) {
        Html5Qrcode.stop(); // Stop the camera scanning
      }
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        flexDirection: "column",
        backgroundColor: "#f4f4f4",
        // border: "2px solid green",
      }}
    >
      {errorMessage && (
        <div>
          <h3 style={{ color: "red", display: "none" }}>{errorMessage}</h3>
        </div>
      )}
      {!scanResult && (
        <div
          id="reader"
          style={{
            width: "250px",
            height: "250px",
            border: "2px solid #7434eb", // Scanner border
            borderRadius: "10px",
            boxSizing: "border-box",
            position: "relative",
            overflow: "hidden", // This will prevent the video feed from overflowing the container
          }}
        ></div>
      )}
      {scanResult && (
        <div style={{overflow: "hidden",}}>
          <h2 style={{ textAlign: "center" }}>Scanned QR Code Data:</h2>
          <p style={{ textAlign: "justify" }}>{scanResult}</p>
        </div>
      )}
    </div>
  );
};

export default QRscanner;
