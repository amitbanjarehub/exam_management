// import React, { useRef, useState, useCallback, useEffect } from "react";
// import Webcam from "react-webcam";
// import { useLocation } from "react-router-dom";
import React, { useRef, useState, useCallback, useEffect } from "react"; // Correct import
import Webcam from "react-webcam";
import { useLocation } from "react-router-dom";

const videoConstraints = {
  facingMode: "user", // Use front camera
};

const FaceDetection = () => {
  const location = useLocation();
  const studentImage = location.state?.studentImage; // Access the passed image from navigation state
  const studentId = location.state?.studentId; // Assume student ID is passed as well

  const webcamRef = useRef(null);
  const [photo1Url, setPhoto1] = useState(studentImage); // Database image as photo1
  const [photo2, setPhoto2] = useState(null); // Captured image as photo2

  // Capture image for photo2
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPhoto2(imageSrc); // Set the captured image
  }, [webcamRef]);

  // useEffect to trigger the comparison automatically after photo2 is set
  useEffect(() => {
    if (photo2 !== null) {
      compareWithDatabase();
    }
  }, [photo2]);

  // Helper function to remove the base64 prefix and return pure base64
  const extractBase64 = (dataURI) => {
    if (!dataURI.includes(",")) {
      throw new Error("Invalid base64 data.");
    }
    return dataURI.split(",")[1]; // Only return the base64 part
  };

  // Convert base64 to Blob
  const base64ToBlob = (base64Data, mimeType) => {
    const byteString = atob(base64Data); // Decode base64
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
      alert("Please capture both images for comparison!");
      return;
    }

    console.log("photo1Url:", photo1Url);
    console.log("photo2:", photo2);

    try {
      const base64Photo2 = extractBase64(photo2); // Remove the prefix from captured image
      const blobPhoto2 = base64ToBlob(base64Photo2, "image/jpeg"); // captured image

      const formData = new FormData();
      formData.append("photo2", blobPhoto2, "photo2.jpg");

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

      // If similarity is greater than 90, update the student status
      if (result.similarity > 90) {
        await updateStudentStatus(studentId, "Verified");
      }
    } catch (error) {
      console.error("Error comparing images:", error);
    }
  };

  // Function to update student status based on similarity result
  const updateStudentStatus = async (studentId, status) => {
    try {
      const response = await fetch(
        `https://api.yourserver.com/updateStudentStatus`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ studentId, status }),
        }
      );

      const result = await response.json();
      if (result.success) {
        alert("Student status updated successfully.");
      } else {
        alert("Failed to update student status.");
      }
    } catch (error) {
      console.error("Error updating student status:", error);
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

      {/* Capture Button */}
      <div style={buttonContainerStyle}>
        <button onClick={capture} style={buttonStyle}>
          Capture Image for Comparison
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
