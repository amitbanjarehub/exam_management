import React, { useState, useEffect } from "react";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";

const CreateExam = () => {
  const [formData, setFormData] = useState({
    exam_name: "",
    category: "",
    exam_status: "pending", // default value
    exam_date: "",
    duration: "",
    exam_metaData: {}, // to be filled later if needed
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [exams, setExams] = useState([]);

  // Fetch data from API
  useEffect(() => {
    const fetchExam = async () => {
      try {
        const liveData = await fetch(
          "https://fi26pmpfb5.execute-api.ap-south-1.amazonaws.com/dev/v1/exams"
        );
        // console.log("LiveData321:", liveData);

        if (!liveData.ok) {
          throw new Error(`Error: ${liveData.status}`);
        }

        const dataLive = await liveData.json();
        // console.log("LiveData:", dataLive);
        setExams(dataLive?.exams);
        // setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchExam();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Dummy data for exam list (reflecting the database structure)
  const dummyExamList = [
    {
      id: 1,
      exam_name: "CGPSC exam 2024",
      category: "General",
      exam_status: "pending",
      exam_date: "2024-12-01",
      duration: "2 hr",
    },
    {
      id: 2,
      exam_name: "SSC CGL 2024",
      category: "OBC",
      exam_status: "pending",
      exam_date: "2024-10-01",
      duration: "1 hr 30 min",
    },
    {
      id: 3,
      exam_name: "Railway Group D 2024",
      category: "SC",
      exam_status: "pending",
      exam_date: "2024-11-15",
      duration: "3 hr",
    },
  ];

  const handleDelete = (id) => {
    alert(`Delete exam with ID: ${id}`);
  };

  return (
    <Grid container spacing={3}>
      {/* Left Side: Exam Form */}
      <Grid item xs={12} md={6}>
        <Card
          variant="outlined"
          sx={{ height: "100%", width: { xs: "100%", sm: "100%" }, }}
        >
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Create Exam
            </Typography>

            {/* Exam Name */}
            <TextField
              label="Exam Name"
              name="exam_name"
              onChange={handleInputChange}
              fullWidth
              value={formData.exam_name}
            />

            {/* Exam Category */}
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

            {/* Exam Status (Fixed as "pending") */}
            <TextField
              label="Exam Status"
              name="exam_status"
              value={formData.exam_status}
              fullWidth
              margin="normal"
              disabled // Fixed field
            />

            {/* Exam Date */}
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

            {/* Duration */}
            <TextField
              label="Duration (e.g., 2 hr)"
              name="duration"
              onChange={handleInputChange}
              fullWidth
              value={formData.duration}
              margin="normal"
            />

            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              fullWidth
            >
              Create Exam
            </Button>
          </CardContent>
        </Card>
      </Grid>

      {/* Right Side: Exam List */}
      <Grid item xs={12} md={6}>
        <Card variant="outlined" sx={{ height: "100%" }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Exam List
            </Typography>
            <TableContainer component={Paper} sx={{ overflowX: "auto" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Exam Name</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Exam Date</TableCell>
                    <TableCell>Duration</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {exams.map((exam) => (
                    <TableRow key={exam.id}>
                      <TableCell>{exam.exam_name}</TableCell>
                      <TableCell>{exam.category}</TableCell>
                      <TableCell>{exam.exam_status}</TableCell>
                      <TableCell>{exam.exam_date}</TableCell>
                      <TableCell>{exam.duration}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleDelete(exam.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default CreateExam;
