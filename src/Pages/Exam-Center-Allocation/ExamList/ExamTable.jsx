

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@mui/material";

const rows = [
  {
    id: 1,
    examName: "UPSC",
    startDate: "01/01/2024",
    endDate: "31/01/2024",
    qualification: "Graduate",
  },
  {
    id: 2,
    examName: "SSC CGL",
    startDate: "15/02/2024",
    endDate: "28/02/2024",
    qualification: "Graduate",
  },
  {
    id: 3,
    examName: "Bank PO",
    startDate: "05/03/2024",
    endDate: "20/03/2024",
    qualification: "Graduate",
  },
  {
    id: 4,
    examName: "Railway Group D",
    startDate: "10/04/2024",
    endDate: "25/04/2024",
    qualification: "10th Pass",
  },
  {
    id: 5,
    examName: "CTET",
    startDate: "01/05/2024",
    endDate: "15/05/2024",
    qualification: "B.Ed",
  },
];

function ExamTable({ onViewClick }) {
  return (
    <TableContainer component={Paper}>
      <Typography sx={{ fontSize: "20px" }}>
        Welcome  Admin !
      </Typography>
      <Table aria-label="exam table">
        <TableHead>
          <TableRow>
            <TableCell>S.No.</TableCell>
            <TableCell>Exam Name</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Qualification</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.examName}</TableCell>
              <TableCell>{row.startDate}</TableCell>
              <TableCell>{row.endDate}</TableCell>
              <TableCell>{row.qualification}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => onViewClick(row)} // Pass the entire row data
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ExamTable;
