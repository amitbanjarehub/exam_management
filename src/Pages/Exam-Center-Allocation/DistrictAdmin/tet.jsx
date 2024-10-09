
import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Grid,
  Stack,
  Card,
  CardContent,
} from "@mui/material";
import { FaFileUpload } from "react-icons/fa";

const CreateExamCenter = () => {
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
        throw new Error("File upload failed");
      }
    } catch (err) {
      alert(`Error uploading file: ${err.message}`);
    }

    setOpen(false); // Close the modal after file upload
  };

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <Stack
              sx={{
                justifyContent: "space-between",
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
                startIcon={<FaFileUpload />}
                onClick={handleClickOpen}
                sx={{
                  lineHeight: "16px",
                  width: "200px",
                }}
              >
                Upload CSV file
              </Button>
            </Stack>
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
            onChange={handleFileChange} // Select the file
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
    </div>
  );
};

export default CreateExamCenter;
