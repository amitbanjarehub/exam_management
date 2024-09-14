import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginCard from "./Pages/Login/Login";
import Management from "./Pages/Exam-management/Management";



const App = () => {
  return (
    <BrowserRouter>
      <Routes>       
        <Route path="/" element={<LoginCard />} />
        <Route path="/management" element={<Management />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
