// import React, { useEffect, useState } from "react";
// import {
//   TextField,
//   Button,
//   Grid,
//   Typography,
//   Card,
//   CardContent,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
// } from "@mui/material";

// const CreateExamCenter = () => {
//   const [centerData, setCenterData] = useState({
//     center_name: "",
//     category: "",
//     center_status: "Pending", // default value
//     center_address: "",
//     seating_capacity_min: "",
//     seating_capacity_max: "",
//     alloted_seat: 0, // fixed value
//     center_metaData: {
//       priority: 0,
//       division: "",
//       city: "",
//       district: "",
//       state: "",
//       is_allocated: false, // default value
//       criteria_fullfill_percent: 0,
//     },
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [examCenters, setExamCenters] = useState([]); // State for storing API data

//   // Fetch data from API
//   useEffect(() => {
//     const fetchExamCenter = async () => {
//       try {
//         const liveData = await fetch(
//           "https://fi26pmpfb5.execute-api.ap-south-1.amazonaws.com/dev/v1/examCenter"
//         );

//         if (!liveData.ok) {
//           throw new Error(`Error: ${liveData.status}`);
//         }

//         const dataLive = await liveData.json();
//         setExamCenters(dataLive?.examCenters);

//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchExamCenter();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setCenterData({ ...centerData, [name]: value });
//   };

//   const handleMetaDataChange = (e) => {
//     const { name, value } = e.target;
//     setCenterData({
//       ...centerData,
//       center_metaData: { ...centerData.center_metaData, [name]: value },
//     });
//   };

//   const handleDelete = (id) => {
//     alert(`Delete center with ID: ${id}`);
//   };

//   return (
//     <Grid container spacing={3}>
//       {/* Left Side: Exam Center Form */}
//       <Grid item xs={12} md={6}>
//         <Card variant="outlined">
//           <CardContent>
//             <Typography variant="h6" gutterBottom>
//               Exam Center Form
//             </Typography>

//             <Grid container spacing={2}>
//               {/* Center Name */}
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Center Name"
//                   name="center_name"
//                   onChange={handleInputChange}
//                   fullWidth
//                 />
//               </Grid>

//               {/* Category */}
//               <Grid item xs={12} sm={6}>
//                 <FormControl fullWidth>
//                   <InputLabel>Category</InputLabel>
//                   <Select
//                     name="category"
//                     value={centerData.category}
//                     onChange={handleInputChange}
//                   >
//                     <MenuItem value="General">General</MenuItem>
//                     <MenuItem value="OBC">OBC</MenuItem>
//                     <MenuItem value="SC">SC</MenuItem>
//                     <MenuItem value="ST">ST</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>
//             </Grid>

//             <Grid container spacing={2}>
//               {/* Center Address */}
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Center Address"
//                   name="center_address"
//                   onChange={handleInputChange}
//                   fullWidth
//                 />
//               </Grid>

//               {/* Seating Capacity Min */}
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Seating Capacity (Min)"
//                   name="seating_capacity_min"
//                   onChange={handleInputChange}
//                   fullWidth
//                 />
//               </Grid>
//             </Grid>

//             <Grid container spacing={2}>
//               {/* Seating Capacity Max */}
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Seating Capacity (Max)"
//                   name="seating_capacity_max"
//                   onChange={handleInputChange}
//                   fullWidth
//                 />
//               </Grid>

//               {/* Center Status (Fixed as "Pending") */}
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Center Status"
//                   name="center_status"
//                   value={centerData.center_status}
//                   fullWidth
//                   disabled
//                 />
//               </Grid>
//             </Grid>

//             {/* Metadata Fields */}
//             <Typography variant="h6" gutterBottom>
//               Center MetaData
//             </Typography>

//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Priority"
//                   name="priority"
//                   onChange={handleMetaDataChange}
//                   fullWidth
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="Division"
//                   name="division"
//                   onChange={handleMetaDataChange}
//                   fullWidth
//                 />
//               </Grid>
//             </Grid>

//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="City"
//                   name="city"
//                   onChange={handleMetaDataChange}
//                   fullWidth
//                 />
//               </Grid>

//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="District"
//                   name="district"
//                   onChange={handleMetaDataChange}
//                   fullWidth
//                 />
//               </Grid>
//             </Grid>

//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   label="State"
//                   name="state"
//                   onChange={handleMetaDataChange}
//                   fullWidth
//                 />
//               </Grid>
//             </Grid>

//             <Button variant="contained" color="primary" sx={{ mt: 2 }}>
//               Submit
//             </Button>
//           </CardContent>
//         </Card>
//       </Grid>

//       {/* Right Side: Exam Center List */}
//       <Grid item xs={12} md={6}>
//         <Card variant="outlined">
//           <CardContent>
//             <Typography variant="h6" gutterBottom>
//               Exam Center List
//             </Typography>
//             <TableContainer component={Paper}>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Center Name</TableCell>
//                     <TableCell>Category</TableCell>
//                     <TableCell>Status</TableCell>
//                     <TableCell>Seats (Min/Max)</TableCell>
//                     <TableCell>Action</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {examCenters.map((center) => (
//                     <TableRow key={center._id}>
//                       <TableCell>{center.center_name}</TableCell>
//                       <TableCell>{center.category}</TableCell>
//                       <TableCell>{center.center_status}</TableCell>
//                       <TableCell>
//                         {center.seating_capacity_min} /{" "}
//                         {center.seating_capacity_max}
//                       </TableCell>
//                       <TableCell>
//                         <Button
//                           variant="contained"
//                           color="secondary"
//                           onClick={() => handleDelete(center._id)}
//                         >
//                           Delete
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </CardContent>
//         </Card>
//       </Grid>
//     </Grid>
//   );
// };

// export default CreateExamCenter;
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
} from "@mui/material";

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

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        {/* Left Side: Exam Center Form */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Exam Center Form
              </Typography>

              <Grid container spacing={2}>
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

              <Grid container spacing={2}>
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

              <Grid container spacing={2}>
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
              <Typography variant="h6" gutterBottom>
                Center MetaData
              </Typography>

              <Grid container spacing={2}>
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

              <Grid container spacing={2}>
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

              <Grid container spacing={2}>
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
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Exam Center List
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Center Name</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Seats (Min/Max)</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {examCenters.map((center) => (
                      <TableRow key={center._id}>
                        <TableCell>{center.center_name}</TableCell>
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
    </form>
  );
};

export default CreateExamCenter;
