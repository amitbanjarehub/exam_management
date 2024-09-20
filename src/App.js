import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginCard from "./Pages/Login/Login";
import Management from "./Pages/Exam-management/Management";
import Scanner from "./Pages/Exam-management/Scanner";
import QRscanner from "./Pages/Exam-management/QRscanner/QRscanner";
import Layout from "./Pages/Layout/Layout";
import FaceDetection from "./Pages/FaceDetection/FaceDetection";
import StudentData from "./Pages/Exam-management/StudentData/StudentData";
import Student_details from "./Pages/Exam-management/StudentData/Student_details";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginCard />} />
        <Route path="/management" element={<Management />} />
        <Route path="/qr-scanner" element={<Scanner />} />
        <Route path="/scanner" element={<QRscanner />} />
        <Route path="/layout" element={<Layout />} />
        <Route path="/camera" element={<FaceDetection />} />
        <Route path="/student-data/:id" element={<StudentData />} />
        <Route path="/studentdata" element={<StudentData />} />
        <Route path="/student_details" element={<Student_details />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
