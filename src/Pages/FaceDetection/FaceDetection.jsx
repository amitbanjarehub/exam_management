// import { useRef, useEffect, useState } from "react";
// import * as faceapi from "face-api.js";
// import Image from "./firstImage.jpg"; // Your target image path

// function FaceDetection() {
//   const videoRef = useRef();
//   const canvasRef = useRef();
//   const [matchPercentage, setMatchPercentage] = useState(null); // For showing match percentage
//   const [matchMessage, setMatchMessage] = useState(""); // For showing match message
//   const [targetImageDescriptor, setTargetImageDescriptor] = useState(null); // For storing the target image descriptor

//   useEffect(() => {
//     startVideo();
//     loadModels();
//   }, []);

//   // OPEN YOUR WEBCAM
//   const startVideo = () => {
//     navigator.mediaDevices
//       .getUserMedia({ video: true })
//       .then((currentStream) => {
//         videoRef.current.srcObject = currentStream;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   // LOAD MODELS FROM FACE API
//   const loadModels = async () => {
//     await Promise.all([
//       // Load all necessary face-api.js models
//       faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
//       faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
//       faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
//       faceapi.nets.faceExpressionNet.loadFromUri("/models"),
//       faceapi.nets.ssdMobilenetv1.loadFromUri("/models"), // Load SsdMobilenetv1 model
//     ]).then(() => {
//       faceMyDetect();
//       loadTargetImage(); // Load target image after models are loaded
//     });
//   };

//   // Load and process the target image (the image you want to compare with)
//   const loadTargetImage = async () => {
//     const img = await faceapi.fetchImage(Image); // Path to the image you want to compare
//     const detection = await faceapi
//       .detectSingleFace(img)
//       .withFaceLandmarks()
//       .withFaceDescriptor();
//     if (detection) {
//       setTargetImageDescriptor(detection.descriptor); // Store the descriptor of the target image
//     } else {
//       console.error("No face detected in the target image.");
//     }
//   };

//   const faceMyDetect = () => {
//     setInterval(async () => {
//       const detections = await faceapi
//         .detectAllFaces(videoRef.current, new faceapi.SsdMobilenetv1Options()) // Use SsdMobilenetv1 for detection
//         .withFaceLandmarks()
//         .withFaceDescriptors();

//       // DRAW YOU FACE IN WEBCAM
//       const canvas = faceapi.createCanvasFromMedia(videoRef.current);
//       canvasRef.current.innerHTML = "";
//       canvasRef.current.appendChild(canvas);
//       const { width, height } = canvasRef.current.getBoundingClientRect();

//       faceapi.matchDimensions(canvas, { width, height });
//       const resized = faceapi.resizeResults(detections, { width, height });
//       faceapi.draw.drawDetections(canvas, resized);
//       faceapi.draw.drawFaceLandmarks(canvas, resized);

//       if (detections.length > 0 && targetImageDescriptor) {
//         // Match the detected face with the target image descriptor
//         const faceMatcher = new faceapi.FaceMatcher([
//           new faceapi.LabeledFaceDescriptors("Target", [targetImageDescriptor]),
//         ]);
//         const bestMatch = faceMatcher.findBestMatch(detections[0].descriptor);
//         const matchDistance = bestMatch.distance;

//         if (matchDistance < 0.6) {
//           // Threshold for a good match
//           const percentageMatch = (1 - matchDistance) * 100; // Calculate match percentage
//           setMatchPercentage(percentageMatch.toFixed(2));
//           setMatchMessage(`Matched with ${percentageMatch}%`);
//         } else {
//           setMatchPercentage(null);
//           setMatchMessage("Image Not Matched"); // If the match distance is greater than threshold, display no match
//         }
//       } else {
//         setMatchMessage("No face detected in webcam.");
//       }
//     }, 1000);
//   };

//   const containerStyle = {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: "10px",
//     width: "100%",
//     height: "100vh",
//     boxSizing: "border-box",
//   };

//   const videoCanvasContainerStyle = {
//     position: "relative",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     width: "100%",
//     maxWidth: "940px",
//     margin: "0 auto",
//   };

//   const videoStyle = {
//     width: "100%",
//     maxWidth: "100%",
//     height: "auto",
//     borderRadius: "10px",
//   };

//   const canvasStyle = {
//     position: "absolute",
//     top: "0",
//     left: "0",
//     width: "100%",
//     height: "auto",
//   };

//   const matchInfoStyle = {
//     marginTop: "30px", // Adjusted to place message 30px below webcam
//     fontSize: "18px",
//     fontWeight: "bold",
//     textAlign: "center",
//   };

//   const targetImageStyle = {
//     width: "60px",
//     height: "60px",
//     borderRadius: "50%",
//     marginBottom: "10px",
//     objectFit: "cover",
//     border: "2px solid #000", // Add a border for better visibility
//   };

//   return (
//     <div style={containerStyle}>
//       <h1>Face Detection</h1>
//       {/* Display the target image above the video */}
//       <img src={Image} alt="Target Face" style={targetImageStyle} />
//       <div style={videoCanvasContainerStyle}>
//         <video
//           crossOrigin="anonymous"
//           ref={videoRef}
//           autoPlay
//           style={videoStyle}
//         ></video>
//         <div ref={canvasRef} style={canvasStyle}></div>
//       </div>
//       <div style={matchInfoStyle}>
//         <h2 style={{ color: "black", fontSize: "24px", fontWeight: "bold" }}>
//           {matchMessage}
//         </h2>
//       </div>
//     </div>
//   );
// }

// export default FaceDetection;

import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  facingMode: "user", // Use front camera
};

const FaceDetection = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [compareResult, setCompareResult] = useState(null);

  // Capture image on button click
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc); // Save the captured image
  }, [webcamRef]);

  // Compare image with database API
  const compareWithDatabase = async () => {
    try {
      const response = await fetch("/api/compare-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ capturedImage }),
      });

      const result = await response.json();
      setCompareResult(result.match); // Assuming the API returns a "match" field for comparison result
    } catch (error) {
      console.error("Error comparing images:", error);
    }
  };

  return (
    <div style={containerStyle}>
      <h1>Image Capture</h1>

      {/* Webcam Feed */}
      <div style={ovalStyle}>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          style={videoStyle}
        />
      </div>

      {/* Action Buttons */}
      <div style={buttonContainerStyle}>
        <button onClick={capture} style={buttonStyle}>
          Capture Image
        </button>
        <button onClick={compareWithDatabase} style={buttonStyle}>
          Compare
        </button>
      </div>

      {/* Captured Image Preview */}
      {capturedImage && (
        <div style={previewContainerStyle}>
          <h2>Captured Image</h2>
          <img src={capturedImage} alt="Captured" style={previewImageStyle} />
        </div>
      )}

      {/* Comparison Result */}
      {compareResult && (
        <div style={compareResultStyle}>
          <h3>
            Comparison Result: {compareResult ? "Matched" : "Not Matched"}
          </h3>
        </div>
      )}
    </div>
  );
};

// Styles
const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
};

const ovalStyle = {
  position: "relative",
  width: "200px",
  height: "260px",
  borderRadius: "50%",
  border: "5px solid red",
  overflow: "hidden",
};

const videoStyle = {
  width: "100%",
  height: "100%",
};

const buttonContainerStyle = {
  marginTop: "20px",
  display: "flex",
  justifyContent: "space-around",
  width: "300px",
};

const buttonStyle = {
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  backgroundColor: "#6200ea",
  color: "white",
  cursor: "pointer",
};

const previewContainerStyle = {
  marginTop: "20px",
};

const previewImageStyle = {
  width: "200px",
  height: "260px",
  borderRadius: "50%",
  border: "5px solid green",
  objectFit: "cover",
};

const compareResultStyle = {
  marginTop: "20px",
  fontSize: "18px",
  fontWeight: "bold",
};

export default FaceDetection;
