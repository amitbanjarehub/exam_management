import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  ButtonGroup,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import axios from "axios";
import ExamManaegmetCards from "../Cards/ExamManaegmetCards";
import CalucateStudCenterCapacity from "./CalucateStudCenterCapacity";

const ExamManagement = () => {
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [openDialog, setOpenDialog] = useState(false); // State for Dialog open/close
  const [openDialog2, setOpenDialog2] = useState(false); // State for Dialog open/close
  const [formData, setFormData] = useState({
    exam_name: "",
    category: "",
    exam_status: "pending", // Fixed as 'pending'
    exam_date: "",
    duration: "",
    vacant_post: "",
    created_by: "admin_user_id_123", // For simplicity, keeping it as a constant
    exam_metaData: {
      instructions: "",
      exam_center: "",
    },
  });

  // Fetch exam data from the MongoDB database
  const fetchExams = async () => {
    try {
      const response = await axios.get(
        "https://fi26pmpfb5.execute-api.ap-south-1.amazonaws.com/dev/v1/exams"
      );
      setExams(response.data.exams); // response.data.exams contains the exam array
    } catch (error) {
      console.error("Error fetching exam data:", error);
    }
  };

  // Load exams on component mount
  useEffect(() => {
    fetchExams();
  }, []);

  // Handle "View" button click
  const handleView = (exam) => {
    setSelectedExam(exam);
  };

  // Handle input change for both selectedExam and new form
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "instructions" || name === "exam_center") {
      // Handle nested exam_metaData changes
      setFormData((prev) => ({
        ...prev,
        exam_metaData: {
          ...prev.exam_metaData,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle update button click
  const handleUpdate = async (id) => {
    alert(`Update successful for this Id: ${id}`);
    try {
      await axios.put(
        `https://your-api-endpoint/v1/exams/${selectedExam.exam_id}`,
        selectedExam
      );
      alert("Exam updated successfully");
      fetchExams(); // Refresh the list after updating
    } catch (error) {
      console.error("Error updating exam:", error);
    }
  };

  // Handle dialog open/close
  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleCapacityDialog = () => {
    setOpenDialog2(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setFormData({
      exam_name: "",
      category: "",
      exam_status: "pending",
      exam_date: "",
      duration: "",
      vacant_post: "",
      created_by: "admin_user_id_123",
      exam_metaData: {
        instructions: "",
        exam_center: "",
      },
    });
  };
  const handleDialogClose2 = () => {
    setOpenDialog2(false);
  };

  // Handle form submission for new exam
  const handleCreateExam = async () => {
    try {
      const response = await axios.post(
        "https://fi26pmpfb5.execute-api.ap-south-1.amazonaws.com/dev/v1/exams",
        formData
      );
      alert("Exam created successfully");
      fetchExams(); // Refresh the exam list after adding the new exam
      handleDialogClose(); // Close dialog after creating the exam
    } catch (error) {
      console.error("Error creating exam:", error);
    }
  };

  // Handle cancel button click
  const handleCancel = () => {
    setSelectedExam(null);
  };

  const handleDelete = () => {};

  return (
    <Stack spacing={3}>
      {/* Top Buttons */}
      <Typography sx={{ marginBottom: "40px" }}>
        {" "}
        Welcome AayogAdmin !
      </Typography>
      <Stack
        direction="row"
        spacing={2}
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <Stack>
          <ExamManaegmetCards />
        </Stack>
        <Stack>
          <Button
            variant="contained"
            sx={{ width: "200px", marginTop: "40px", marginRight: "20px" }}
            onClick={handleDialogOpen}
          >
            Add Exam
          </Button>
        </Stack>
      </Stack>

      <Grid container spacing={2}>
        {/* Left Side - Exam List */}
        <Grid item xs={12} md={6}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ backgroundColor: "#f2fafc" }}>
                    S.No
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#f2fafc" }}>
                    Exam Name
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#f2fafc" }}>
                    Exam Status
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#f2fafc" }}>
                    Category
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#f2fafc" }}>
                    Exam Date
                  </TableCell>
                  <TableCell sx={{ backgroundColor: "#f2fafc" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {exams.map((exam, index) => (
                  <TableRow key={exam.exam_id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{exam.exam_name}</TableCell>
                    <TableCell>{exam.exam_status}</TableCell>
                    <TableCell>{exam.category}</TableCell>
                    <TableCell>
                      {new Date(exam.exam_date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        onClick={() => handleView(exam)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        {/* Right Side - Exam Details */}
        <Grid item xs={12} md={6}>
          {selectedExam &&
            (console.log("selectedExam:======>>", selectedExam),
            (
              <Stack spacing={2} component={Paper} padding={2}>
                <Stack>
                  <Typography sx={{ fontSize: "24px", textAlign: "center" }}>
                    Exam Details
                  </Typography>
                </Stack>
                <TextField
                  label="Exam Name"
                  name="exam_name"
                  value={selectedExam.exam_name}
                  onChange={handleInputChange}
                  fullWidth
                />
                <TextField
                  label="Category"
                  name="category"
                  value={selectedExam.category}
                  onChange={handleInputChange}
                  fullWidth
                />
                <TextField
                  label="Duration"
                  name="duration"
                  value={selectedExam.duration}
                  onChange={handleInputChange}
                  fullWidth
                />
                <TextField
                  label="Status"
                  name="exam_status"
                  value={selectedExam.exam_status}
                  onChange={handleInputChange}
                  fullWidth
                />
                <TextField
                  label="Vacancy Post"
                  name="vacant_post"
                  value={selectedExam.vacant_post}
                  onChange={handleInputChange}
                  fullWidth
                  InputLabelProps={{
                    shrink: true, // This will keep the label above the field at all times
                  }}
                />

                <TextField
                  label="Exam Date"
                  name="exam_date"
                  value={
                    new Date(selectedExam.exam_date).toISOString().split("T")[0]
                  }
                  onChange={handleInputChange}
                  type="date"
                  fullWidth
                />

                <Stack direction="row" spacing={3}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      handleUpdate(selectedExam._id);
                    }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      handleCapacityDialog();
                    }}
                  >
                    Capacity
                  </Button>
                  <Button variant="outlined" onClick={handleCancel}>
                    Cancel
                  </Button>
                </Stack>
              </Stack>
            ))}
        </Grid>
      </Grid>

      {selectedExam && (
        <Dialog
          open={openDialog2}
          onClose={handleDialogClose2}
          fullWidth
          maxWidth="md"
          sx={{ "& .MuiDialog-paper": { width: "60%", height: "800px" } }}
        >
          <CalucateStudCenterCapacity examName={selectedExam.exam_name}/>
        </Dialog>
      )}
    </Stack>
  );
};

export default ExamManagement;
