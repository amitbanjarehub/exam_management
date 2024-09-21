import React, { useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  facingMode: "user", // Use front camera
};

const FaceDetection = () => {
  const webcamRef = useRef(null);
  const [photo1, setPhoto1] = useState(null);
  const [photo2, setPhoto2] = useState(null);

  // Capture image for photo1 and photo2
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPhoto1(imageSrc);
    setPhoto2(imageSrc);
    // if (!photo1) {
    //   setPhoto1(imageSrc);
    // } else {
    //   setPhoto2(imageSrc);
    // }
  }, [webcamRef, photo1, photo2]);

  // Compare image with API
  const compareWithDatabase = async () => {
    if (!photo1 || !photo2) {
      alert("Please capture both images for comparison!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("photo1", dataURItoBlob(photo1), "photo1.jpg");
      formData.append("photo2", dataURItoBlob(photo2), "photo2.jpg");

      const response = await fetch(
        "https://whatsappapi.vertexsuite.in/v1/vs/compareFaces",
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

  // Helper function to convert base64 image to blob
  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
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
          {photo1 ? "Capture Second Image" : "Capture First Image"}
        </button>
        <button onClick={compareWithDatabase} style={buttonStyle}>
          Compare
        </button>
      </div>

      {/* Captured Image Preview */}
      <div style={previewContainerStyle}>
        {photo1 && (
          <div>
            <h2>First Image</h2>
            <img src={photo1} alt="First" style={previewImageStyle} />
          </div>
        )}
        {photo2 && (
          <div>
            <h2>Second Image</h2>
            <img src={photo2} alt="Second" style={previewImageStyle} />
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
