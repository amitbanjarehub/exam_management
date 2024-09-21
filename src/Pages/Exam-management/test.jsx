import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import { useLocation } from "react-router-dom";

const videoConstraints = {
  facingMode: "user", // Use front camera
};

const FaceDetection = () => {
  const location = useLocation();
  const photo1Url = new URLSearchParams(location.search).get("photo1Url"); // Extract photo1Url from query params

  const webcamRef = useRef(null);
  const [photo2, setPhoto2] = useState(null); // Captured image as photo2

  // Capture image for photo2
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPhoto2(imageSrc); // Set the captured image
  }, [webcamRef]);

  // Convert base64 to Blob
  const base64ToBlob = (base64Data, mimeType) => {
    const byteString = atob(base64Data.split(",")[1]); // Decode base64
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeType });
  };

  // Compare the captured image with the student image from the database
  const compareWithDatabase = async () => {
    if (!photo1Url || !photo2) {
      alert("Please capture the image for comparison!");
      return;
    }

    try {
      const blobPhoto2 = base64ToBlob(photo2, "image/jpeg"); // captured image

      const formData = new FormData();
      formData.append("photo2", blobPhoto2, "photo2.jpg");

      // Send request with the photo1Url as a query parameter and photo2 in the body
      const response = await fetch(
        `https://whatsappapi.vertexsuite.in/v1/vs/compareFaces2?photo1Url=${encodeURIComponent(
          photo1Url
        )}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      alert(`Message: ${result.message}, Similarity: ${result.similarity}%`);
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
          Capture Image for Comparison
        </button>
        <button onClick={compareWithDatabase} style={buttonStyle}>
          Compare
        </button>
      </div>

      {/* Captured Image Preview */}
      <div style={previewContainerStyle}>
        {photo1Url && (
          <div>
            <h2>Student Image</h2>
            <img src={photo1Url} alt="Student" style={previewImageStyle} />
          </div>
        )}
        {photo2 && (
          <div>
            <h2>Captured Image</h2>
            <img src={photo2} alt="Captured" style={previewImageStyle} />
          </div>
        )}
      </div>
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

export default FaceDetection;
