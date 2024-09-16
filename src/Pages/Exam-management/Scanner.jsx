// import { Button, Typography } from "@mui/material";
// import React, { useState } from "react";
// import { QrReader } from "react-qr-reader";

// const Scanner = () => {
//   const [result, setResult] = useState("");
//   const [scan, setScan] = useState(false);
//   const [error, setError] = useState("");

//   const handleScan = (data) => {
//     if (data) {
//       setResult(data);
//       setScan(false);
//     }
//   };

//   const handleError = (err) => {
//     console.error(err);
//     setError("Error accessing camera. Please check your permissions.");
//   };

//   const startScan = () => {
//     if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//       navigator.mediaDevices
//         .getUserMedia({ video: true })
//         .then(() => {
//           setScan(true);
//           setError(""); // Reset error message
//         })
//         .catch((err) => {
//           console.error(err);
//           setError("Unable to access camera. Please allow camera permissions.");
//         });
//     } else {
//       setError("getUserMedia is not supported in this browser.");
//     }
//   };

//   return (
//     <div>
//       <Typography variant="h5">QR Code Scanner</Typography>
//       {error && <Typography color="error">{error}</Typography>}
//       {scan && (
//         <QrReader
//           delay={300}
//           onError={handleError}
//           onScan={handleScan}
//           style={{ width: "100%" }}
//         />
//       )}
//       <Button variant="contained" color="primary" onClick={startScan}>
//         Scan QR Code
//       </Button>

//       {result && (
//         <Typography variant="body1">Scanned result: {result}</Typography>
//       )}
//     </div>
//   );
// };

// export default Scanner;

import React, { useState } from "react";
import { QrReader } from "react-qr-reader";

const Scanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleScan = (data) => {
    if (data) {
      setScanResult(data); // Set the scanned result
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
