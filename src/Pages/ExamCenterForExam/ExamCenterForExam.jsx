// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Stack,
//   Button,
//   CircularProgress,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   Grid,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";

// const ExamCenterForExam = () => {

//   const [examCenters, setExamCenters] = useState([]);
//   const [centerByDivision, setCenterByDivision] = useState([]);

//   // Fetch exam centers
//   const fetchExamCenters = async () => {
//     try {
//       const response = await axios.get(
//         "https://fi26pmpfb5.execute-api.ap-south-1.amazonaws.com/dev/v1/examCenter"
//       );
//       const centers = response.data.examCenters;
//       setExamCenters(centers);
//       organizeCentersByDivision(centers); // Organize centers after fetching
//     } catch (error) {
//       console.error("Error fetching exam centers data:", error);
//     }
//   };

//   // Organize exam centers by division
//   const organizeCentersByDivision = (centers) => {
//     const divisionMap = {};

//     centers.forEach((center) => {
//       const division = center.division;

//       if (!divisionMap[division]) {
//         divisionMap[division] = [];
//       }

//       divisionMap[division].push({
//         center_name: center.center_name,
//         seating_capacity: center.seating_capacity_max,
//         center_status: center.center_status,
//       });
//     });

//     // Convert the divisionMap into an array of objects
//     const result = Object.keys(divisionMap).map((division) => ({
//       division,
//       centers: divisionMap[division],
//     }));

//     setCenterByDivision(result);
//   };

//   // Fetch students and exam centers on component mount
//   useEffect(() => {

//     fetchExamCenters();
//   }, []);

//  console.log("examCenters:", examCenters);
//  console.log("centerByDivision:", centerByDivision);

//   return (
//     <Stack spacing={3}>
//       <h3> exam center list</h3>

//     </Stack>
//   );
// };

// export default ExamCenterForExam;

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

const ExamCenterForExam = () => {
  const [examCenters, setExamCenters] = useState([]);
  const [centerByDivision, setCenterByDivision] = useState([]);

  // Fetch exam centers
  const fetchExamCenters = async () => {
    try {
      const response = await axios.get(
        "https://fi26pmpfb5.execute-api.ap-south-1.amazonaws.com/dev/v1/examCenter"
      );
      const centers = response.data.examCenters;
      setExamCenters(centers);
      organizeCentersByDivision(centers); // Organize centers after fetching
    } catch (error) {
      console.error("Error fetching exam centers data:", error);
    }
  };

  // Organize exam centers by division and filter for "Pending" status
  const organizeCentersByDivision = (centers) => {
    const divisionMap = {};

    centers.forEach((center) => {
      if (center.center_status === "Pending") {
        const division = center.division;

        if (!divisionMap[division]) {
          divisionMap[division] = [];
        }

        divisionMap[division].push({
          center_name: center.center_name,
          seating_capacity: center.seating_capacity_max,
          center_status: center.center_status,
        });
      }
    });

    // Convert the divisionMap into an array of objects
    const result = Object.keys(divisionMap).map((division) => ({
      division,
      centers: divisionMap[division],
    }));

    setCenterByDivision(result);
  };

  // Fetch exam centers on component mount
  useEffect(() => {
    fetchExamCenters();
  }, []);

  return (
    <Stack spacing={3}>
      <Typography variant="h4" gutterBottom>
        Exam Center List
      </Typography>

      {centerByDivision.length === 0 ? (
        <Typography>No pending centers available.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Division</TableCell>
                <TableCell align="center">Center Name</TableCell>
                <TableCell align="center">Center Status</TableCell>
                <TableCell align="center">Seating Capacity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {centerByDivision.map((divisionData, index) => (
                <>
                  {divisionData.centers.map((center, idx) => (
                    <TableRow key={idx}>
                      {/* Division should only span one row */}
                      {idx === 0 && (
                        <TableCell
                          rowSpan={divisionData.centers.length}
                          align="center"
                        >
                          {divisionData.division}
                        </TableCell>
                      )}
                      <TableCell align="center">{center.center_name}</TableCell>
                      <TableCell align="center">
                        {center.center_status}
                      </TableCell>
                      <TableCell align="center">
                        {center.seating_capacity}
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Stack>
  );
};

export default ExamCenterForExam;
