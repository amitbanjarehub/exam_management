

import React, { useState } from "react";
import { Box, Stack, Typography, Card, CardContent } from "@mui/material";
import Sidebar from "../Sidebar/Sidebar";
import TopCards from "../Cards/TopCards";
import ExamTable from "../ExamList/ExamTable";

function Dashboard() {
  // State to store selected exam details
  const [selectedExam, setSelectedExam] = useState(null);

  // Handler to update the selected exam
  const handleViewClick = (examData) => {
    setSelectedExam(examData);
  };

  return (
    <Box display="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Top Cards */}
        <TopCards />

        <Stack
          sx={{
            // border: "1px solid red",
            marginTop: "80px",
            maxHeight: "800px",
            height: "800px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Stack
            sx={{
            //   border: "1px solid blue",
              width: "48%",
              height: "100%",
            }}
          >
            {/* Pass the handler to ExamTable */}
            <ExamTable onViewClick={handleViewClick} />
          </Stack>

          <Stack
            sx={{
            //   border: "1px solid blue",
              width: "48%",
              height: "100%",
              padding: 2,
            }}
          >
            <Typography variant="h6">Exam Details:</Typography>

            {/* Conditional rendering of exam details */}
            {selectedExam ? (
              <Card sx={{ marginTop: 2 }}>
                <CardContent>
                  <Typography variant="h6">
                    Exam Name: {selectedExam.examName}
                  </Typography>
                  <Typography>Start Date: {selectedExam.startDate}</Typography>
                  <Typography>End Date: {selectedExam.endDate}</Typography>
                  <Typography>
                    Qualification: {selectedExam.qualification}
                  </Typography>
                </CardContent>
              </Card>
            ) : (
              <Typography>Select an exam to see the details</Typography>
            )}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

export default Dashboard;
