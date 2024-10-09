import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import ExamCenterLists from "./ExamCenterLists";
import { FaFileUpload } from "react-icons/fa";

const CreateExamCenter = () => {
  const [centerData, setCenterData] = useState({
    center_name: "",
    category: "",
    center_status: "active", // Default value is 'active'
    center_address: "",
    seating_capacity_min: "",
    seating_capacity_max: "",
    alloted_seat: 30, // Fixed value as per your example
    center_metaData: {
      type: "exam", // Adding type as per your example
      other_details: "This is a test exam center.", // Adding other_details
    },
    priority: 1, // Default value
    division: "",
    city: "",
    district: "",
    state: "",
    is_allocated: false, // Default value
    is_verified: true, // Default value
    criteria_fullfill_percent: 80, // Default value
    created_by: "admin", // Default value
  });

  const [examCenters, setExamCenters] = useState([]); // State for storing API data
  const [checkedCriteria, setCheckedCriteria] = useState({
    non_religious_area: false,
    alcohol_free_zone: false,
  });
  // Fetch data from API
  useEffect(() => {
    const fetchExamCenter = async () => {
      try {
        const liveData = await fetch(
          "https://fi26pmpfb5.execute-api.ap-south-1.amazonaws.com/dev/v1/examCenter"
        );

        if (!liveData.ok) {
          throw new Error(`Error: ${liveData.status}`);
        }

        const dataLive = await liveData.json();
        setExamCenters(dataLive?.examCenters);
      } catch (err) {
        console.error(err);
      }
    };

    fetchExamCenter();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCenterData({ ...centerData, [name]: value });
  };

  const handleMetaDataChange = (e) => {
    const { name, value } = e.target;
    setCenterData({
      ...centerData,
      center_metaData: { ...centerData.center_metaData, [name]: value },
    });
  };

  const handleCriteriaChange = (e) => {
    const { name, checked } = e.target;
    setCheckedCriteria({ ...checkedCriteria, [name]: checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare payload to match the required format
      const payload = {
        center_name: centerData.center_name,
        category: centerData.category,
        center_status: centerData.center_status,
        center_address: centerData.center_address,
        seating_capacity_min: parseInt(centerData.seating_capacity_min, 10),
        seating_capacity_max: parseInt(centerData.seating_capacity_max, 10),
        alloted_seat: centerData.alloted_seat,
        center_metaData: {
          type: centerData.center_metaData.type,
          other_details: centerData.center_metaData.other_details,
        },
        priority: centerData.priority,
        division: centerData.division,
        city: centerData.city,
        district: centerData.district,
        state: centerData.state,
        non_religious_area: checkedCriteria.non_religious_area, // Include checkbox value
        alcohol_free_zone: checkedCriteria.alcohol_free_zone, // Include checkbox value
        is_allocated: centerData.is_allocated,
        is_verified: centerData.is_verified,
        criteria_fullfill_percent: centerData.criteria_fullfill_percent,
        created_by: centerData.created_by,
      };

      const response = await fetch(
        "https://fi26pmpfb5.execute-api.ap-south-1.amazonaws.com/dev/v1/examCenter",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit form data");
      }

      alert("Form data submitted successfully!");
    } catch (err) {
      alert(`Error submitting form: ${err.message}`);
    }
  };

  const handleDelete = (id) => {
    alert(`Delete center with ID: ${id}`);
  };

  //csv file upload function

  const [open, setOpen] = useState(false); // To control modal
  const [selectedFile, setSelectedFile] = useState(null); // To store the selected file

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]); // Storing the selected file
  };

  // Function to handle file upload (sending it to the database)
  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    // Create FormData object and append the file
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch(
        "https://fi26pmpfb5.execute-api.ap-south-1.amazonaws.com/dev/v1/examCenter/upload",
        {
          method: "POST",
          body: formData, // Send formData, not JSON
        }
      );

      if (response.ok) {
        alert("File uploaded successfully!");
      } else {
        // Backend se milne wale error message ko fetch karenge
        const errorData = await response.json();
        alert(`Error uploading file: ${errorData.message || "Upload failed"}`);
      }
    } catch (err) {
      alert(`Error uploading file: ${err.message}`);
    }

    setOpen(false); // Close the modal after file upload
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography sx={{ fontSize: "40px", marginBottom: "20px" }}>
        Welcome District Admin !
      </Typography>
      <Grid container spacing={3}>
        {/* Left Side: Exam Center Form */}

        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <Stack
              sx={{
                justifyContent: "space-between",
                // border: "1px solid blue",
                display: "flex",
                flexDirection: "row",
                paddingTop: "16px",
                paddingRight: "12px",
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{ marginBottom: "12px", marginLeft: "16px" }}
              >
                Upload Exam Center CSV File
              </Typography>
              <Button
                variant="outlined"
                startIcon={<FaFileUpload />} // This works with Button
                onClick={handleClickOpen}
                sx={{
                  // border: "1px solid red",
                  lineHeight: "16px",
                  width: "200px",
                  // Ensures icon and text align to the right
                }}
              >
                Upload csv file
              </Button>
            </Stack>

            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ marginBottom: "12px" }}
              >
                Exam Center Form
              </Typography>

              <Grid container spacing={2} sx={{ marginBottom: "12px" }}>
                {/* Center Name */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Center Name"
                    name="center_name"
                    value={centerData.center_name}
                    onChange={handleInputChange}
                    fullWidth
                    required
                  />
                </Grid>

                {/* Category */}
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      name="category"
                      value={centerData.category}
                      onChange={handleInputChange}
                    >
                      <MenuItem value="General">General</MenuItem>
                      <MenuItem value="OBC">OBC</MenuItem>
                      <MenuItem value="SC">SC</MenuItem>
                      <MenuItem value="ST">ST</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={2} sx={{ marginBottom: "12px" }}>
                {/* Center Address */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Center Address"
                    name="center_address"
                    value={centerData.center_address}
                    onChange={handleInputChange}
                    fullWidth
                    required
                  />
                </Grid>

                {/* Seating Capacity Min */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Seating Capacity (Min)"
                    name="seating_capacity_min"
                    value={centerData.seating_capacity_min}
                    onChange={handleInputChange}
                    fullWidth
                    required
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2} sx={{ marginBottom: "12px" }}>
                {/* Seating Capacity Max */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Seating Capacity (Max)"
                    name="seating_capacity_max"
                    value={centerData.seating_capacity_max}
                    onChange={handleInputChange}
                    fullWidth
                    required
                  />
                </Grid>

                {/* Center Status */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Center Status"
                    name="center_status"
                    value={centerData.center_status}
                    fullWidth
                    disabled
                  />
                </Grid>
              </Grid>

              {/* Metadata Fields */}
              <Typography
                variant="h6"
                gutterBottom
                sx={{ marginBottom: "12px" }}
              >
                Center MetaData
              </Typography>

              <Grid container spacing={2} sx={{ marginBottom: "12px" }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Priority"
                    name="priority"
                    value={centerData.priority}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Division"
                    name="division"
                    value={centerData.division}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2} sx={{ marginBottom: "12px" }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="City"
                    name="city"
                    value={centerData.city}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="District"
                    name="district"
                    value={centerData.district}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2} sx={{ marginBottom: "12px" }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="State"
                    name="state"
                    value={centerData.state}
                    onChange={handleInputChange}
                    fullWidth
                  />
                </Grid>
              </Grid>

              <Typography variant="h6" gutterBottom>
                Criteria
              </Typography>
              {/* Criteria Section with 5 Checkboxes */}
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checkedCriteria.non_religious_area}
                        onChange={handleCriteriaChange}
                        name="non_religious_area"
                      />
                    }
                    label="Non-religious area under 500 meter"
                  />
                </Grid>
                <Grid item xs={3}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checkedCriteria.alcohol_free_zone}
                        onChange={handleCriteriaChange}
                        name="alcohol_free_zone"
                      />
                    }
                    label="Alcohol-free zone under 500 meter"
                  />
                </Grid>
              </Grid>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Submit
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Side: Exam Center List */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined" sx={{ width: "100%" }}>
            <ExamCenterLists />
          </Card>
        </Grid>
      </Grid>

      {/* Modal for uploading the CSV file */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Upload CSV File</DialogTitle>
        <DialogContent>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            style={{ marginBottom: "20px" }}
          />
          {selectedFile && (
            <Typography>Selected File: {selectedFile.name}</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleFileUpload} color="primary">
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

export default CreateExamCenter;
