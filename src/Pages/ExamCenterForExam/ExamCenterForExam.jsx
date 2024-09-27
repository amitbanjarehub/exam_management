// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Stack,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
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

//   // Organize exam centers by division and filter for "Pending" status
//   const organizeCentersByDivision = (centers) => {
//     const divisionMap = {};

//     centers.forEach((center) => {
//       if (center.center_status === "Pending") {
//         const division = center.division;

//         if (!divisionMap[division]) {
//           divisionMap[division] = [];
//         }

//         divisionMap[division].push({
//           center_name: center.center_name,
//           seating_capacity: center.seating_capacity_max,
//           center_status: center.center_status,
//         });
//       }
//     });

//     // Convert the divisionMap into an array of objects
//     const result = Object.keys(divisionMap).map((division) => ({
//       division,
//       centers: divisionMap[division],
//     }));

//     setCenterByDivision(result);
//   };

//   // Fetch exam centers on component mount
//   useEffect(() => {
//     fetchExamCenters();
//   }, []);

//   return (
//     <Stack spacing={3}>
//       <Typography variant="h4" gutterBottom>
//         Exam Center List
//       </Typography>

//       {centerByDivision.length === 0 ? (
//         <Typography>No pending centers available.</Typography>
//       ) : (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell align="center">Division</TableCell>
//                 <TableCell align="center">Center Name</TableCell>
//                 <TableCell align="center">Center Status</TableCell>
//                 <TableCell align="center">Seating Capacity</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {centerByDivision.map((divisionData, index) => (
//                 <>
//                   {divisionData.centers.map((center, idx) => (
//                     <TableRow key={idx}>
//                       {/* Division should only span one row */}
//                       {idx === 0 && (
//                         <TableCell
//                           rowSpan={divisionData.centers.length}
//                           align="center"
//                         >
//                           {divisionData.division}
//                         </TableCell>
//                       )}
//                       <TableCell align="center">{center.center_name}</TableCell>
//                       <TableCell align="center">
//                         {center.center_status}
//                       </TableCell>
//                       <TableCell align="center">
//                         {center.seating_capacity}
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </Stack>
//   );
// };

// export default ExamCenterForExam;

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
} from "@mui/material";

const ExamCenterForExam = () => {
  const [examCenters, setExamCenters] = useState([]);
  const [pendingCenters, setPendingCenters] = useState([]);

  // Function to fetch exam center data page by page
  const fetchAllExamCenters = async () => {
    let currentPage = 1;
    let totalPages = 1;
    let allExamCenters = [];

    while (currentPage <= totalPages) {
      try {
        // API request for each page
        const response = await axios.get(
          `https://fi26pmpfb5.execute-api.ap-south-1.amazonaws.com/dev/v1/examCenter`,
          {
            params: {
              page: currentPage,
            },
          }
        );

        const { examCenters: centers, totalPages: total } = response.data;
        allExamCenters = [...allExamCenters, ...centers]; // Collect all centers
        totalPages = total; // Update total pages
        currentPage++; // Move to next page
      } catch (error) {
        console.error("Error fetching exam center data:", error);
        break;
      }
    }

    setExamCenters(allExamCenters);
  };

  useEffect(() => {
    fetchAllExamCenters();
  }, []);

  useEffect(() => {
    if (examCenters.length > 0) {
      // Filter for centers where center_status === 'pending'
      console.log("examCenters:===============>>", examCenters);
      const pending = examCenters.reduce((acc, center) => {
        const {
          division,
          center_name,
          seating_capacity_min,
          seating_capacity_max,
          center_status,
          _id,
        } = center;
        const capacity = `${seating_capacity_min} - ${seating_capacity_max}`;

        if (center_status === "Pending") {
          const centerData = {
            id: _id,
            name: center_name,
            capacity,
            status: center_status,
            division,
          };

          const existingDivision = acc.find(
            (item) => item.division === division
          );

          if (existingDivision) {
            existingDivision.centers.push(centerData);
          } else {
            acc.push({
              division,
              centers: [centerData],
            });
          }
        }

        return acc;
      }, []);

      setPendingCenters(pending);
    }
  }, [examCenters]);

  const handleDelete = (id) => {
    alert(`Delete exam with ID: ${id}`);
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Exam Center List
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Division</TableCell>
              <TableCell>Center Name</TableCell>
              <TableCell>Center Status</TableCell>
              <TableCell>Seating Capacity</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
     
            {pendingCenters.map((group, index) => (
              <React.Fragment key={index}>
                {group.centers.map((center, idx) => (
                  <TableRow key={idx}>
                    {idx === 0 && (
                      <TableCell
                        rowSpan={group.centers.length}
                        style={{ verticalAlign: "top" }}
                      >
                        {group.division}
                      </TableCell>
                    )}
                    <TableCell>{center.name}</TableCell>
                    <TableCell>{center.status}</TableCell>
                    <TableCell>{center.capacity}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDelete(center.id)}
                      >
                        Approve
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ExamCenterForExam;
