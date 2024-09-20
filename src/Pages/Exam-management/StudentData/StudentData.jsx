import React from "react";
import { useParams } from "react-router-dom"; // Import useParams

const StudentData = () => {
  const { id } = useParams(); // Get the studentId from URL params
  console.log("id:=====>>", id);
  return (
    <div>
      <h1>StudentData</h1>
      <div>Get Student id: {id || "no id found"}</div>{" "}
      {/* Print the studentId */}
    </div>
  );
};

export default StudentData;
