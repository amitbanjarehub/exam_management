import { useRef, useEffect, useState } from "react";
import "./style.css";
import * as faceapi from "face-api.js";
import Image from "./firstImage.jpg"

function FaceDetection() {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [matchPercentage, setMatchPercentage] = useState(null); // For showing match percentage
  const [targetImageDescriptor, setTargetImageDescriptor] = useState(null); // For storing the target image descriptor

  useEffect(() => {
    startVideo();
    loadModels();
  }, []);

  // OPEN YOUR WEBCAM
  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((currentStream) => {
        videoRef.current.srcObject = currentStream;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // LOAD MODELS FROM FACE API
  const loadModels = async () => {
    await Promise.all([
      // THIS FOR FACE DETECT AND LOAD FROM YOU PUBLIC/MODELS DIRECTORY
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    ]).then(() => {
      faceMyDetect();
      loadTargetImage(); // Load target image after models are loaded
    });
  };

  // Load and process the target image (the image you want to compare with)
  const loadTargetImage = async () => {
    const img = await faceapi.fetchImage(Image); // Path to the image you want to compare
    const detection = await faceapi
      .detectSingleFace(img)
      .withFaceLandmarks()
      .withFaceDescriptor();
    if (detection) {
      setTargetImageDescriptor(detection.descriptor); // Store the descriptor of the target image
    } else {
      console.error("No face detected in the target image.");
    }
  };

  const faceMyDetect = () => {
    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceDescriptors(); // Get face descriptors for matching

      // DRAW YOU FACE IN WEBCAM
      canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(
        videoRef.current
      );
      faceapi.matchDimensions(canvasRef.current, {
        width: 940,
        height: 650,
      });

      const resized = faceapi.resizeResults(detections, {
        width: 940,
        height: 650,
      });

      faceapi.draw.drawDetections(canvasRef.current, resized);
      faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);

      if (detections.length > 0 && targetImageDescriptor) {
        // Match the detected face with the target image descriptor
        const bestMatch = new faceapi.FaceMatcher([
          new faceapi.LabeledFaceDescriptors("Target", [targetImageDescriptor]),
        ]).findBestMatch(detections[0].descriptor);
        const matchDistance = bestMatch.distance;
        const percentageMatch = (1 - matchDistance) * 100; // Calculate match percentage
        setMatchPercentage(percentageMatch.toFixed(2));
      }
    }, 1000);
  };

  return (
    <div className="myapp">
      <h1>Face Detection</h1>
      <div className="appvide">
        <video crossOrigin="anonymous" ref={videoRef} autoPlay></video>
      </div>
      <canvas ref={canvasRef} width="940" height="650" className="appcanvas" />
      {matchPercentage && (
        <div className="match-info">
          <h2>Match Percentage: {matchPercentage}%</h2>
        </div>
      )}
    </div>
  );
}

export default FaceDetection;
