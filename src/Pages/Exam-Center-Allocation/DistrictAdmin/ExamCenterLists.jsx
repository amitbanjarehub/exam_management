
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
  TablePagination,
} from "@mui/material";

const ExamCenterLists = () => {
  const [examCenters, setExamCenters] = useState([]); // State for storing API data
  const [filteredCenters, setFilteredCenters] = useState([]); // To store filtered data
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState(""); // For filter by status
  const [page, setPage] = useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page
  const [totalCount, setTotalCount] = useState(0); // Total number of centers
  const [hasNextPage, setHasNextPage] = useState(true);

  // Fetch data from API
  const fetchExamCenter = async (page, rowsPerPage) => {
    try {
      const liveData = await fetch(
        `https://fi26pmpfb5.execute-api.ap-south-1.amazonaws.com/dev/v1/examCenter?page=${
          page + 1
        }&limit=${rowsPerPage}`
      );

      if (!liveData.ok) {
        throw new Error(`Error: ${liveData.status}`);
      }

      const dataLive = await liveData.json();
      setExamCenters(dataLive?.examCenters);
      setFilteredCenters(dataLive?.examCenters); // Set filtered data initially
      setTotalCount(dataLive.totalCount); // Total number of centers from API
      setHasNextPage(dataLive.hasNextPage);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchExamCenter(page, rowsPerPage); // Fetch data on page load
  }, [page, rowsPerPage]);

  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchQuery(searchValue);

    const filtered = examCenters.filter((center) =>
      center.center_name.toLowerCase().includes(searchValue)
    );
    setFilteredCenters(filtered);
  };

  const handleFilterChange = (e) => {
    const statusValue = e.target.value;
    setFilterStatus(statusValue);

    if (statusValue === "") {
      setFilteredCenters(examCenters); // If no filter, show all
    } else {
      const filtered = examCenters.filter(
        (center) => center.center_status === statusValue
      );
      setFilteredCenters(filtered);
    }
  };

  const handleDelete = (id) => {
    alert(`Delete center with ID: ${id}`);
  };

  const handleEdit = (id) => {
    alert(`Edit center with ID: ${id}`);
  };

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page change
  };

  return (
    <Stack sx={{ width: "100%" }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Exam Center List
          </Typography>

          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            {/* Search Bar */}
            <TextField
              label="Search by Center Name"
              variant="outlined"
              fullWidth
              value={searchQuery}
              onChange={handleSearchChange}
              sx={{ marginBottom: "16px", width: "49%" }}
            />

            {/* Filter Dropdown */}
            <FormControl fullWidth sx={{ marginBottom: "16px", width: "49%" }}>
              <InputLabel id="status-filter-label">Filter by Status</InputLabel>
              <Select
                labelId="status-filter-label"
                value={filterStatus}
                onChange={handleFilterChange}
                label="Filter by Status"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="verified">Verified</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Center Name</TableCell>
                  <TableCell>Center Is Allocated</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Seats (Min/Max)</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCenters.map((center) => (
                  <TableRow key={center._id}>
                    <TableCell>{center.center_name}</TableCell>
                    <TableCell>
                      {center.is_allocated ? "True" : "False"}
                    </TableCell>
                    <TableCell>{center.category}</TableCell>
                    <TableCell>{center.center_status}</TableCell>
                    <TableCell>
                      {center.seating_capacity_min} /{" "}
                      {center.seating_capacity_max}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDelete(center._id)}
                      >
                        Delete
                      </Button>

                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleEdit(center._id)}
                        sx={{ marginLeft: "8px" }}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <TablePagination
            component="div"
            count={totalCount}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Centers per page"
          />
        </CardContent>
      </Card>
    </Stack>
  );
};

export default ExamCenterLists;
