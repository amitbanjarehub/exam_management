// import React, { useEffect, useState } from "react";
// import { Html5Qrcode, Html5QrcodeScanner } from "html5-qrcode";

// const QRscanner = () => {
//   const [scanResult, setScanResult] = useState(null);

//   useEffect(() => {
//     const scanner = new Html5QrcodeScanner("reader", {
//       qrbox: {
//         width: 250,
//         height: 250,
//       },
//       fps: 5,
//     });

//     scanner.render(success, error);

//     function success(result) {
//       scanner.clear();
//       setScanResult(result);
//     }

//     function error(err) {
//       console.warn(err);
//     }
//   }, []);

//   return (
//     <div>
//       <div>QRscanner</div>
//       {scanResult ? (
//         <div>
//           Success: <a href={scanResult}>{scanResult}</a>
//         </div>
//       ) : (
//         <div id="reader"></div>
//       )}
//     </div>
//   );
// };

// export default QRscanner;

import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const QRscanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader", 
      { fps: 10, qrbox: { width: 250, height: 250 } }, 
      false
    );

    scanner.render(
      (result) => {
        setScanResult(result); // Successfully scanned result
        scanner.clear();
      },
      (error) => {
        setErrorMessage("QR Code scanning failed. Error: " + error);
      }
    );

    // Cleanup function to stop scanning when component is unmounted
    return () => {
      scanner.clear().catch((error) => {
        console.error("Failed to clear scanner. Error:", error);
      });
    };
  }, []);

  return (
    <div>
      <h1>QR Code Scanner</h1>

      {errorMessage && (
        <div>
          <h3 style={{ color: "red" }}>{errorMessage}</h3>
        </div>
      )}

      {!scanResult && <div id="reader" style={{ width: "300px" }}></div>}

      {scanResult && (
        <div>
          <h2>Scanned QR Code Data:</h2>
          <p>{scanResult}</p>
        </div>
      )}
    </div>
  );
};

export default QRscanner;

