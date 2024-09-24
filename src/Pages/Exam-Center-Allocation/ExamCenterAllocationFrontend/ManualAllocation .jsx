
import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import * as XLSX from "xlsx";
import axios from "axios";

const AllocateExamCenters = () => {
  const [students, setStudents] = useState([]);
  const [examCenters, setExamCenters] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all students with pagination
  const fetchAllStudents = async () => {
    let allStudents = [];
    let currentPage = 1;
    let totalPages = 1;

    setLoading(true);

    try {
      while (currentPage <= totalPages) {
        const response = await axios.get(
          `https://fi26pmpfb5.execute-api.ap-south-1.amazonaws.com/dev/v1/students?page=${currentPage}`
        );
        const { students, totalPages: pages } = response.data;
        allStudents = [...allStudents, ...students];
        totalPages = pages;
        currentPage++;
      }
      setStudents(allStudents);
    } catch (error) {
      console.error("Error fetching students data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch exam centers
  const fetchExamCenters = async () => {
    try {
      const response = await axios.get(
        "https://fi26pmpfb5.execute-api.ap-south-1.amazonaws.com/dev/v1/examCenter"
      );
      setExamCenters(response.data.examCenters);
    } catch (error) {
      console.error("Error fetching exam centers data:", error);
    }
  };

  // Fetch students and exam centers on component mount
  useEffect(() => {
    fetchAllStudents();
    fetchExamCenters();
  }, []);

  console.log("students:", students);
  console.log("examCenters:", examCenters);

  const allocateExamCenters = (students, examCenters) => {
    const allocatedStudents = [];
    const shifts = ["Shift 1", "Shift 2", "Shift 3"];
    const examDates = ["2024-12-01", "2024-12-02", "2024-12-03"];
    let currentDateIndex = 0;

    examCenters.forEach((center) => {
      center.allotedSeats = { Shift1: 0, Shift2: 0, Shift3: 0 };
    });

    students.forEach((student) => {
      const studentDivisionCenters = examCenters.filter(
        (center) => center.division === student.division
      );
      let allocated = false;

      // Try allocating across all shifts
      for (
        let shiftIndex = 0;
        shiftIndex < shifts.length && !allocated;
        shiftIndex++
      ) {
        studentDivisionCenters.forEach((center) => {
          const currentShift = `Shift${shiftIndex + 1}`;
          if (
            center.allotedSeats[currentShift] < center.seating_capacity_max &&
            !allocated
          ) {
            center.allotedSeats[currentShift]++;
            allocatedStudents.push({
              StudentId: student.StudentId,
              rollNo: student.rollNo,
              name: student.name,
              shift: shifts[shiftIndex],
              examDate: examDates[currentDateIndex],
              center_id: center.center_id,
              center_name: center.center_name,
              center_address: center.center_address,
              city: center.city,
              district: center.district,
              division: center.division,
              state: center.state,
            });
            allocated = true;
          }
        });

        // If no allocation in all shifts, move to next date
        if (shiftIndex === shifts.length - 1 && !allocated) {
          currentDateIndex++;
        }
      }
    });

    return allocatedStudents;
  };

  const exportToExcel = (data) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Allocated Students");
    XLSX.writeFile(wb, "allocated_students.xlsx");
  };

  const handleAllocation = () => {
    if (students.length > 0 && examCenters.length > 0) {
      const allocated = allocateExamCenters(students, examCenters);
      exportToExcel(allocated);
    } else {
      console.error("Data not loaded");
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={handleAllocation}
          sx={{ marginTop: "40px" }}
        >
          Allocate Exam Center
        </Button>
      )}
    </div>
  );
};

export default AllocateExamCenters;
