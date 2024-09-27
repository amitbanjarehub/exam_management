// import React, { useState, useEffect } from "react";
// import { Button, Stack, Typography } from "@mui/material";
// import * as XLSX from "xlsx";
// import axios from "axios";

// const AllocateExamCenters = () => {
//   const [students, setStudents] = useState([]);
//   const [examCenters, setExamCenters] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Fetch all students with pagination
//   const fetchAllStudents = async () => {
//     let allStudents = [];
//     let currentPage = 1;
//     let totalPages = 1;

//     setLoading(true);

//     try {
//       while (currentPage <= totalPages) {
//         const response = await axios.get(
//           `https://fi26pmpfb5.execute-api.ap-south-1.amazonaws.com/dev/v1/students?page=${currentPage}`
//         );
//         const { students, totalPages: pages } = response.data;
//         allStudents = [...allStudents, ...students];
//         totalPages = pages;
//         currentPage++;
//       }
//       setStudents(allStudents);
//     } catch (error) {
//       console.error("Error fetching students data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch exam centers
//   const fetchExamCenters = async () => {
//     try {
//       const response = await axios.get(
//         "https://fi26pmpfb5.execute-api.ap-south-1.amazonaws.com/dev/v1/examCenter"
//       );
//       setExamCenters(response.data.examCenters);
//     } catch (error) {
//       console.error("Error fetching exam centers data:", error);
//     }
//   };

//   // Fetch students and exam centers on component mount
//   useEffect(() => {
//     fetchAllStudents();
//     fetchExamCenters();
//   }, []);

//   console.log("students:", students);
//   console.log("examCenters:", examCenters);

//   const allocateExamCenters = (students, examCenters) => {
//     const allocatedStudents = [];
//     const shifts = ["Shift 1", "Shift 2", "Shift 3"];
//     const examDates = ["2024-12-01", "2024-12-02", "2024-12-03"];
//     let currentDateIndex = 0;

//     examCenters.forEach((center) => {
//       center.allotedSeats = { Shift1: 0, Shift2: 0, Shift3: 0 };
//     });

//     students.forEach((student) => {
//       const studentDivisionCenters = examCenters.filter(
//         (center) => center.division === student.division
//       );
//       let allocated = false;

//       // Try allocating across all shifts
//       for (
//         let shiftIndex = 0;
//         shiftIndex < shifts.length && !allocated;
//         shiftIndex++
//       ) {
//         studentDivisionCenters.forEach((center) => {
//           const currentShift = `Shift${shiftIndex + 1}`;
//           if (
//             center.allotedSeats[currentShift] < center.seating_capacity_max &&
//             !allocated
//           ) {
//             center.allotedSeats[currentShift]++;
//             allocatedStudents.push({
//               StudentId: student.StudentId,
//               rollNo: student.rollNo,
//               name: student.name,
//               shift: shifts[shiftIndex],
//               examDate: examDates[currentDateIndex],
//               center_id: center.center_id,
//               center_name: center.center_name,
//               center_address: center.center_address,
//               city: center.city,
//               district: center.district,
//               division: center.division,
//               state: center.state,
//             });
//             allocated = true;
//           }
//         });

//         // If no allocation in all shifts, move to next date
//         if (shiftIndex === shifts.length - 1 && !allocated) {
//           currentDateIndex++;
//         }
//       }
//     });

//     return allocatedStudents;
//   };

//   const exportToExcel = (data) => {
//     const ws = XLSX.utils.json_to_sheet(data);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Allocated Students");
//     XLSX.writeFile(wb, "allocated_students.xlsx");
//   };

//   const handleAllocation = () => {
//     if (students.length > 0 && examCenters.length > 0) {
//       const allocated = allocateExamCenters(students, examCenters);
//       exportToExcel(allocated);
//     } else {
//       console.error("Data not loaded");
//     }
//   };

//   return (
//     <>
//       <Typography sx={{ fontSize: "20px" }}>
//         Welcome District Admin !
//       </Typography>
//       <div>
//         {loading ? (
//           <p>Loading data...</p>
//         ) : (
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleAllocation}
//             sx={{ marginTop: "40px" }}
//           >
//             Allocate Exam Center
//           </Button>
//         )}
//       </div>
//       <Stack sx={{ marginTop: "40px" }}>
//         <Typography>Excel File Here...!</Typography>
//       </Stack>
//     </>
//   );
// };

// export default AllocateExamCenters;

import React, { useState, useEffect } from "react";
import {
  Button,
  Stack,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import * as XLSX from "xlsx";
import axios from "axios";

const AllocateExamCenters = () => {
  const [students, setStudents] = useState([]);
  const [examCenters, setExamCenters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allocatedData, setAllocatedData] = useState([]); // To store allocated data

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
      setAllocatedData(allocated); // Store the allocated data
      exportToExcel(allocated);
    } else {
      console.error("Data not loaded");
    }
  };

  return (
    <>
      <Typography sx={{ fontSize: "20px" }}>
        Allocate Student Exam Center
      </Typography>
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
            Allocate Automtic Exam Center
          </Button>
        )}
      </div>

      <Stack sx={{ marginTop: "40px" }}>
        <Typography
          textAlign={"center"}
          sx={{ marginBottom: "40px", fontSize: "bold" }}
        >
         Allocated Exam Center To Student Data
        </Typography>

        {/* Display Allocated Data */}
        {allocatedData.length > 0 && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student ID</TableCell>
                  <TableCell>Roll No</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Shift</TableCell>
                  <TableCell>Exam Date</TableCell>
                  <TableCell>Center Name</TableCell>
                  <TableCell>Center Address</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>District</TableCell>
                  <TableCell>Division</TableCell>
                  <TableCell>State</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allocatedData.map((student, index) => (
                  <TableRow key={index}>
                    <TableCell>{student.StudentId}</TableCell>
                    <TableCell>{student.rollNo}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.shift}</TableCell>
                    <TableCell>{student.examDate}</TableCell>
                    <TableCell>{student.center_name}</TableCell>
                    <TableCell>{student.center_address}</TableCell>
                    <TableCell>{student.city}</TableCell>
                    <TableCell>{student.district}</TableCell>
                    <TableCell>{student.division}</TableCell>
                    <TableCell>{student.state}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Stack>
    </>
  );
};

export default AllocateExamCenters;
