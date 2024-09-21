
import React, { useRef, useState, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import { useNavigate, useLocation } from "react-router-dom";

const videoConstraints = {
  facingMode: "user", // Use front camera
};

const FaceDetection = () => {
  const navigate = useNavigate(); 
  const location = useLocation();
  const studentImage = location.state?.studentImage; 
  const studentId = location.state?.studentId;
  const studentRollno = location.state?.studentRollno; 

  const webcamRef = useRef(null);
  const [photo1Url, setPhoto1] = useState(studentImage); // Database image as photo1
  const [photo2, setPhoto2] = useState(null); // Captured image as photo2

  // Capture image for photo2
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPhoto2(imageSrc); // Set the captured image
  }, [webcamRef]);

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
        await updateStudentStatus();
      } else {
        navigate("/management");
      }
    } catch (error) {
      console.error("Error comparing images:", error);
    }
  };

  // Function to update student status based on similarity result
  const updateStudentStatus = async () => {
    try {
      const response = await fetch(
        `https://fi26pmpfb5.execute-api.ap-south-1.amazonaws.com/dev/v1/students/updateStatus`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studentId: studentId,
            rollNo: studentRollno,
            status: "present",
          }),
        }
      );

      const result = await response.json();
      if (result.statusCode === 200) {
        alert("Student status updated successfully.");
        navigate("/management"); // Navigate after updating the status
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

      {/* Action Buttons */}
      <div style={buttonContainerStyle}>
        <button onClick={capture} style={buttonStyle}>
          Capture Image
        </button>
      </div>

      {/* Captured Image Preview */}
      <div style={previewContainerStyle}>
        {photo1Url && (
          <div>
            <h2>Student Image</h2>
            <img src={photo1Url} alt="Student" style={previewImageStyle1} />
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

const previewImageStyle1 = {
  width: "200px",
  height: "200px", 
  border: "5px solid green",
  objectFit: "cover",
};

export default FaceDetection;
