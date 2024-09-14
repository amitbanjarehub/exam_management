import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginCard from "./Pages/Login/Login";



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
       
        <Route path="/" element={<LoginCard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
