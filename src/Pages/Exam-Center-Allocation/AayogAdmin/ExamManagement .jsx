// import React, { useState, useEffect } from "react";
// import {
//   Button,
//   Grid,
//   Stack,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TextField,
//   ButtonGroup,
//   Typography,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
// } from "@mui/material";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const ExamManagement = () => {
//   const [exams, setExams] = useState([]);
//   const [selectedExam, setSelectedExam] = useState(null);
//   const [openDialog, setOpenDialog] = useState(false); // State for Dialog open/close
//   const [formData, setFormData] = useState({
//     exam_name: "",
//     category: "",
//     exam_status: "pending",
//     exam_date: "",
//     duration: "",
//   });

//   const navigate = useNavigate();

//   // Fetch exam data from the MongoDB database
//   const fetchExams = async () => {
//     try {
//       const response = await axios.get(
//         "https://fi26pmpfb5.execute-api.ap-south-1.amazonaws.com/dev/v1/exams"
//       );
//       setExams(response.data.exams); // response.data.exams contains the exam array
//     } catch (error) {
//       console.error("Error fetching exam data:", error);
//     }
//   };

//   // Load exams on component mount
//   useEffect(() => {
//     fetchExams();
//   }, []);

//   // Handle "View" button click
//   const handleView = (exam) => {
//     setSelectedExam(exam);
//   };

//   // Handle input change for both selectedExam and new form
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Handle update button click
//   const handleUpdate = async () => {
//     try {
//       await axios.put(
//         `https://your-api-endpoint/v1/exams/${selectedExam.exam_id}`,
//         selectedExam
//       );
//       alert("Exam updated successfully");
//       fetchExams(); // Refresh the list after updating
//     } catch (error) {
//       console.error("Error updating exam:", error);
//     }
//   };

//   // Handle dialog open/close
//   const handleDialogOpen = () => {
//     setOpenDialog(true);
//   };

//   const handleDialogClose = () => {
//     setOpenDialog(false);
//     setFormData({
//       exam_name: "",
//       category: "",
//       exam_status: "pending",
//       exam_date: "",
//       duration: "",
//     });
//   };

//   // Handle form submission for new exam
//   const handleCreateExam = () => {
//     // Logic for creating a new exam via API
//     console.log("Creating new exam:", formData);
//     handleDialogClose(); // Close dialog after creating the exam
//     // Optionally, refresh the exam list after adding the new exam
//   };

//   // Handle cancel button click
//   const handleCancel = () => {
//     setSelectedExam(null);
//   };

//   return (
//     <Stack spacing={3}>
//       {/* Top Buttons */}
//       <Stack
//         direction="row"
//         spacing={2}
//         sx={{ display: "flex", flexDirection: "column" }}
//       >
//         <Stack>
//           <ButtonGroup variant="outlined" aria-label="Basic button group">
//             <Button>Pending</Button>
//             <Button>Processing</Button>
//             <Button>Active</Button>
//             <Button>Completed</Button>
//             <Button>Cancel</Button>
//           </ButtonGroup>
//         </Stack>
//         <Stack>
//           <Button
//             variant="contained"
//             sx={{ width: "200px", marginTop: "40px", marginRight: "20px" }}
//             onClick={handleDialogOpen}
//           >
//             Add Exam
//           </Button>
//         </Stack>
//       </Stack>

//       <Grid container spacing={2}>
//         {/* Left Side - Exam List */}
//         <Grid item xs={12} md={6}>
//           <TableContainer component={Paper}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>S.No</TableCell>
//                   <TableCell>Exam Name</TableCell>
//                   <TableCell>Category</TableCell>
//                   <TableCell>Exam Date</TableCell>
//                   <TableCell>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {exams.map((exam, index) => (
//                   <TableRow key={exam.exam_id}>
//                     <TableCell>{index + 1}</TableCell>
//                     <TableCell>{exam.exam_name}</TableCell>
//                     <TableCell>{exam.category}</TableCell>
//                     <TableCell>
//                       {new Date(exam.exam_date).toLocaleDateString()}
//                     </TableCell>
//                     <TableCell>
//                       <Button
//                         variant="outlined"
//                         onClick={() => handleView(exam)}
//                       >
//                         View
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Grid>

//         {/* Right Side - Exam Details */}
//         <Grid item xs={12} md={6}>
//           {selectedExam && (
//             <Stack spacing={2} component={Paper} padding={2}>
//               <Stack>
//                 <Typography sx={{ fontSize: "24px", textAlign: "center" }}>
//                   Exam Details
//                 </Typography>
//               </Stack>
//               <TextField
//                 label="Exam Name"
//                 name="exam_name"
//                 value={selectedExam.exam_name}
//                 onChange={handleInputChange}
//                 fullWidth
//               />
//               <TextField
//                 label="Category"
//                 name="category"
//                 value={selectedExam.category}
//                 onChange={handleInputChange}
//                 fullWidth
//               />
//               <TextField
//                 label="Exam Date"
//                 name="exam_date"
//                 value={
//                   new Date(selectedExam.exam_date).toISOString().split("T")[0]
//                 }
//                 onChange={handleInputChange}
//                 type="date"
//                 fullWidth
//               />
//               <Stack direction="row" spacing={2}>
//                 <Button variant="contained" onClick={handleUpdate}>
//                   Update
//                 </Button>
//                 <Button variant="outlined" onClick={handleCancel}>
//                   Cancel
//                 </Button>
//               </Stack>
//             </Stack>
//           )}
//         </Grid>
//       </Grid>

//       {/* Add Exam Dialog */}
//       <Dialog
//         open={openDialog}
//         onClose={handleDialogClose}
//         fullWidth
//         maxWidth="md" // This controls the max width (values: 'xs', 'sm', 'md', 'lg', 'xl')
//         sx={{ "& .MuiDialog-paper": { width: "60%", height: "600px" } }} // Controls the width and height of the Dialog
//       >
//         <DialogTitle>Create Exam</DialogTitle>
//         <DialogContent>
//           {/* Dialog Form Content */}
//           <TextField
//             label="Exam Name"
//             name="exam_name"
//             onChange={handleInputChange}
//             fullWidth
//             value={formData.exam_name}
//             sx={{ mt: 2 }}
//           />
//           <FormControl fullWidth sx={{ mt: 2 }}>
//             <InputLabel>Category</InputLabel>
//             <Select
//               name="category"
//               value={formData.category}
//               onChange={handleInputChange}
//             >
//               <MenuItem value="General">General</MenuItem>
//               <MenuItem value="OBC">OBC</MenuItem>
//               <MenuItem value="SC">SC</MenuItem>
//               <MenuItem value="ST">ST</MenuItem>
//             </Select>
//           </FormControl>

//           <TextField
//             label="Exam Status"
//             name="exam_status"
//             value={formData.exam_status}
//             fullWidth
//             margin="normal"
//             disabled
//           />

//           <TextField
//             label="Exam Date"
//             name="exam_date"
//             type="date"
//             fullWidth
//             margin="normal"
//             InputLabelProps={{ shrink: true }}
//             onChange={handleInputChange}
//             value={formData.exam_date}
//           />

//           <TextField
//             label="Duration (e.g., 2 hr)"
//             name="duration"
//             onChange={handleInputChange}
//             fullWidth
//             value={formData.duration}
//             margin="normal"
//           />
//         </DialogContent>
//         <DialogActions sx={{marginBottom: "40px", marginRight: "16px"}}>
//           <Button
//             onClick={handleDialogClose}
//             variant="outlined"
//             color="secondary"
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={handleCreateExam}
//             color="primary"
//             variant="contained"
//           >
//             Create Exam
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Stack>
//   );
// };

// export default ExamManagement;

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

const ExamManagement = () => {
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [openDialog, setOpenDialog] = useState(false); // State for Dialog open/close
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
  const handleUpdate = async () => {
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

  return (
    <Stack spacing={3}>
      {/* Top Buttons */}
      <Stack
        direction="row"
        spacing={2}
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <Stack>
          <ButtonGroup variant="outlined" aria-label="Basic button group">
            <Button>Pending</Button>
            <Button>Processing</Button>
            <Button>Active</Button>
            <Button>Completed</Button>
            <Button>Cancel</Button>
          </ButtonGroup>
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
                  <TableCell>S.No</TableCell>
                  <TableCell>Exam Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Exam Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {exams.map((exam, index) => (
                  <TableRow key={exam.exam_id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{exam.exam_name}</TableCell>
                    <TableCell>{exam.category}</TableCell>
                    <TableCell>
                      {new Date(exam.exam_date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
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
          {selectedExam && (
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
                label="Exam Date"
                name="exam_date"
                value={
                  new Date(selectedExam.exam_date).toISOString().split("T")[0]
                }
                onChange={handleInputChange}
                type="date"
                fullWidth
              />
              <Stack direction="row" spacing={2}>
                <Button variant="contained" onClick={handleUpdate}>
                  Update
                </Button>
                <Button variant="outlined" onClick={handleCancel}>
                  Cancel
                </Button>
              </Stack>
            </Stack>
          )}
        </Grid>
      </Grid>

      {/* Add Exam Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        fullWidth
        maxWidth="md"
        sx={{ "& .MuiDialog-paper": { width: "60%", height: "600px" } }}
      >
        <DialogTitle>Create Exam</DialogTitle>
        <DialogContent>
          {/* Dialog Form Content */}
          <TextField
            label="Exam Name"
            name="exam_name"
            onChange={handleInputChange}
            fullWidth
            value={formData.exam_name}
            sx={{ mt: 2 }}
          />
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            >
              <MenuItem value="General">General</MenuItem>
              <MenuItem value="OBC">OBC</MenuItem>
              <MenuItem value="SC">SC</MenuItem>
              <MenuItem value="ST">ST</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Exam Status"
            name="exam_status"
            value={formData.exam_status}
            fullWidth
            margin="normal"
            disabled
          />

          <TextField
            label="Exam Date"
            name="exam_date"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            onChange={handleInputChange}
            value={formData.exam_date}
          />

          <TextField
            label="Duration (e.g., 2 hr)"
            name="duration"
            onChange={handleInputChange}
            fullWidth
            value={formData.duration}
            margin="normal"
          />

          {/* Vacant Post Field */}
          <TextField
            label="Vacant Post"
            name="vacant_post"
            onChange={handleInputChange}
            fullWidth
            value={formData.vacant_post}
            margin="normal"
          />

          {/* Instructions Field (nested in exam_metaData) */}
          <TextField
            label="Instructions"
            name="instructions"
            onChange={handleInputChange}
            fullWidth
            value={formData.exam_metaData.instructions}
            margin="normal"
          />

          {/* Exam Center Field (nested in exam_metaData) */}
          <TextField
            label="Exam Center"
            name="exam_center"
            onChange={handleInputChange}
            fullWidth
            value={formData.exam_metaData.exam_center}
            margin="normal"
          />
        </DialogContent>

        <DialogActions sx={{ marginBottom: "40px", marginRight: "16px" }}>
          <Button
            onClick={handleDialogClose}
            variant="outlined"
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreateExam}
            color="primary"
            variant="contained"
          >
            Create Exam
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default ExamManagement;
