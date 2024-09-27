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
import Dashboard from "./Pages/Exam-Center-Allocation/Dashboard/Dashboard";
import CreateExam from "./Pages/Exam-Center-Allocation/AayogAdmin/CreateExam";
import CreateExamCenter from "./Pages/Exam-Center-Allocation/DistrictAdmin/CreateExamCenter";
import Layout2 from "./Pages/Exam-Center-Allocation/Layout/Layout";
import ExamCenterAllocation from "./Pages/Exam-Center-Allocation/AayogDirector/ExamCenterAllocation";
import ManualAllocation from "./Pages/Exam-Center-Allocation/ExamCenterAllocationFrontend/ManualAllocation ";
import CalculatingStudentExamCenterRatio from "./Pages/Exam-Center-Allocation/RatioStudentExamCenter/CalulatingStudentExamCenterRatio";
import ExamCenterForExam from "./Pages/ExamCenterForExam/ExamCenterForExam";
import ExamManagement from "./Pages/Exam-Center-Allocation/AayogAdmin/ExamManagement ";
import ExamCenterData from "./Pages/Exam-Center-Allocation/AayogAdmin/ExamCenterData";
import ExamCenterList from "./Pages/Exam-Center-Allocation/DistrictAdmin/ExamCenterList";
import CalucateStudCenterCapacity from "./Pages/Exam-Center-Allocation/AayogAdmin/CalucateStudCenterCapacity";

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
        {/* <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-exam" element={<CreateExam />} />
        <Route path="/create-exam-center" element={<CreateExamCenter />} /> */}

        <Route
          path="/dashboard"
          element={
            <Layout2>
              <Dashboard />
            </Layout2>
          }
        />
        <Route
          path="/create-exam"
          element={
            <Layout2>
              <CreateExam />
            </Layout2>
          }
        />
        <Route
          path="/create-exam-center"
          element={
            <Layout2>
              <CreateExamCenter />
            </Layout2>
          }
        />

        <Route
          path="/exam-center-allocation"
          element={
            <Layout2>
              <ExamCenterAllocation />
            </Layout2>
          }
        />

        <Route
          path="/manual-allocation"
          element={
            <Layout2>
              <ManualAllocation />
            </Layout2>
          }
        />

        <Route
          path="/examcenter-student-ratio-lsy"
          element={
            <Layout2>
              <CalculatingStudentExamCenterRatio />
            </Layout2>
          }
        />

        <Route
          path="/examcenter-allocatefor-exam-lsy"
          element={
            <Layout2>
              <ExamCenterForExam />
            </Layout2>
          }
        />

        <Route
          path="/exam-management-lsy"
          element={
            <Layout2>
              <ExamManagement />
            </Layout2>
          }
        />

        <Route
          path="/exam-centerFecthing"
          element={
            <Layout2>
              <ExamCenterData />
            </Layout2>
          }
        />
        <Route
          path="/exam-center-list"
          element={
            <Layout2>
              <ExamCenterList />
            </Layout2>
          }
        />

        <Route
          path="/calulate-exam-center-with-student-capacity"
          element={
            <Layout2>
              <CalucateStudCenterCapacity />
            </Layout2>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
