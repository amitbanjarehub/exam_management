// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   Stack,
//   AppBar,
//   Toolbar,
//   Grid, // Import Grid for layout
//   useTheme,
//   useMediaQuery,
// } from "@mui/material";
// import { useNavigate, useParams } from "react-router-dom";
// import LokSevaAayugLogo from "../loksevaaayug.png";

// const Student_details = () => {
//   //   const { id } = useParams();
//   const id = "fb295d2f-4621-49c2-b7f3-65ff04798630";

//   const [email, setEmail] = useState(""); // State for email input
//   const [password, setPassword] = useState(""); // State for password input

//   const navigate = useNavigate();

//   const [studentData, setStudentData] = useState(null); // State to store student data
//   const [loading, setLoading] = useState(true); // State to show loading
//   const [errorMessage, setErrorMessage] = useState(null); // State to handle errors

//   useEffect(() => {
//     // Fetch student data using the ID
//     const fetchStudentData = async () => {
//       try {
//         const response = await fetch(
//           `https://fi26pmpfb5.execute-api.ap-south-1.amazonaws.com/dev/v1/students/${id}`
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch student data");
//         }
//         const data = await response.json();
//         setStudentData(data); // Store the student data
//         setLoading(false); // Set loading to false
//       } catch (error) {
//         setErrorMessage(error.message);
//         setLoading(false); // Stop loading even in case of error
//       }
//     };

//     // Call the fetch function
//     fetchStudentData();
//   }, [id]);

//   console.log("studentData:=====>>", studentData);

//   return (
//     <Stack>
//       <AppBar
//         sx={{
//           backgroundColor: "white",
//           display: { xl: "flex" },
//           flexDirection: { xl: "row", lg: "row" },
//           justifyContent: { xl: "center", lg: "center", md: "column" },
//         }}
//       >
//         <Toolbar
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             width: { xl: "70%", lg: "80%" },
//           }}
//         >
//           <Stack
//             sx={{
//               height: { sm: "40px", xs: "40px" },
//               width: { sm: "100%", xs: "100%" },
//               display: "flex",
//               flexDirection: "row",
//               justifyContent: "center",
//             }}
//           >
//             <Typography
//               sx={{
//                 color: "black",
//                 display: " flex",
//                 flexDirection: "row",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 fontSize: { xs: "13px", sm: "16px" },
//               }}
//             >
//               <img
//                 src={LokSevaAayugLogo}
//                 alt="logo"
//                 style={{ height: "32px", width: "32px", marginRight: "8px" }}
//               />{" "}
//               Chhattisgarh Public Service Commission
//             </Typography>
//           </Stack>
//         </Toolbar>
//       </AppBar>

//       <Box
//         sx={{
//           maxWidth: 600, // Increased width
//           mx: "12px",
//           p: 4,
//           mt: 5,
//           boxShadow: 3,
//           borderRadius: 2,
//           marginTop: { lg: "10%", xl: "10%", xs: "100px", sm: "100px" },
//           backgroundColor: "white",
//           //   border: "1px solid red",
//         }}
//       >
//         {/* Show student image when data is fetched */}
//         <Stack
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             paddingBottom: "40px",
//           }}
//         >
//           {studentData ? (
//             <img
//               src={studentData.image || "123"}
//               alt={studentData.name || "123"}
//               style={{ height: "80px", width: "80px" }}
//             />
//           ) : (
//             <Typography>Loading Student Data...</Typography>
//           )}
//         </Stack>

//         {/* One row with two fields */}
//         <Grid container spacing={2}>
//           <Grid item xs={6}>
//             <Typography
//               sx={{
//                 color: "rgb(100, 116, 139)",
//                 fontSize: { lg: "18px", sm: "16px" },
//                 fontWeight: "400",
//               }}
//             >
//               Name:
//             </Typography>
//             <TextField
//               variant="outlined"
//               fullWidth
//               sx={{ mb: 3, borderRadius: 2 }}
//               placeholder="Enter your name"
//               size="small"
//               value={name}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </Grid>
//           <Grid item xs={6}>
//             <Typography
//               sx={{
//                 color: "rgb(100, 116, 139)",
//                 fontSize: { lg: "18px", sm: "16px" },
//                 fontWeight: "400",
//               }}
//             >
//               Roll No:
//             </Typography>
//             <TextField
//               variant="outlined"
//               fullWidth
//               sx={{ mb: 3, borderRadius: 2 }}
//               placeholder="Enter your roll no"
//               size="small"
//               value={rollNo}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </Grid>
//         </Grid>

//         <Grid container spacing={2}>
//           <Grid item xs={6}>
//             <Typography
//               sx={{
//                 color: "rgb(100, 116, 139)",
//                 fontSize: { lg: "18px", sm: "16px" },
//                 fontWeight: "400",
//               }}
//             >
//               Room/Hall No:
//             </Typography>
//             <TextField
//               variant="outlined"
//               fullWidth
//               sx={{ mb: 3, borderRadius: 2 }}
//               placeholder="Enter your room/hall no."
//               size="small"
//               value={room_no}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </Grid>
//           <Grid item xs={6}>
//             <Typography
//               sx={{
//                 color: "rgb(100, 116, 139)",
//                 fontSize: { lg: "18px", sm: "16px" },
//                 fontWeight: "400",
//               }}
//             >
//               Date of Birth:
//             </Typography>
//             <TextField
//               variant="outlined"
//               fullWidth
//               sx={{ mb: 3, borderRadius: 2 }}
//               placeholder="Enter your date of birth"
//               size="small"
//               value={dob}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </Grid>
//         </Grid>

//         {/* Remaining fields */}
//         <Stack>
//           <Typography
//             sx={{
//               color: "rgb(100, 116, 139)",
//               fontSize: { lg: "18px", sm: "16px" },
//               fontWeight: "400",
//             }}
//           >
//             Gender:
//           </Typography>
//           <TextField
//             variant="outlined"
//             fullWidth
//             sx={{ mb: 3, borderRadius: 2 }}
//             placeholder="Enter your gender"
//             size="small"
//             value={gender}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </Stack>

//         <Stack>
//           <Typography
//             sx={{
//               color: "rgb(100, 116, 139)",
//               fontSize: { lg: "18px", sm: "16px" },
//               fontWeight: "400",
//             }}
//           >
//             Age:
//           </Typography>
//           <TextField
//             variant="outlined"
//             fullWidth
//             sx={{ mb: 3, borderRadius: 2 }}
//             placeholder="Enter your age"
//             size="small"
//             value={age}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </Stack>

//         <Stack>
//           <Typography
//             sx={{
//               color: "rgb(100, 116, 139)",
//               fontSize: { lg: "18px", sm: "16px" },
//               fontWeight: "400",
//             }}
//           >
//             Address:
//           </Typography>
//           <TextField
//             variant="outlined"
//             fullWidth
//             sx={{ mb: 3, borderRadius: 2 }}
//             placeholder="Enter your address"
//             size="small"
//             value={address}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </Stack>

//         <Button
//           variant="contained"
//           fullWidth
//           sx={{
//             mb: 3,
//             textTransform: "none",
//             borderRadius: 2,
//             backgroundColor: "rgb(46 125 50)",
//           }}
//           size="large"
//         >
//           Verify
//         </Button>
//       </Box>
//     </Stack>
//   );
// };

// export default Student_details;

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  AppBar,
  Toolbar,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import LokSevaAayugLogo from "../loksevaaayug.png";

const Student_details = () => {
  //   const { id } = useParams(); // Getting id from the route (URL)
  const id = "fb295d2f-4621-49c2-b7f3-65ff04798630";
  const [studentData, setStudentData] = useState(null); // State to store student data
  const [loading, setLoading] = useState(true); // State to show loading
  const [errorMessage, setErrorMessage] = useState(null); // State to handle errors

  useEffect(() => {
    // Fetch student data using the ID
    const fetchStudentData = async () => {
      try {
        const response = await fetch(
          `https://fi26pmpfb5.execute-api.ap-south-1.amazonaws.com/dev/v1/students/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch student data");
        }
        const data = await response.json();
        setStudentData(data.student); // Store the student data from the response
        setLoading(false); // Set loading to false
      } catch (error) {
        setErrorMessage(error.message);
        setLoading(false); // Stop loading even in case of error
      }
    };

    // Call the fetch function
    fetchStudentData();
  }, [id]);

  return (
    <Stack>
      <AppBar
        sx={{
          backgroundColor: "white",
          display: { xl: "flex" },
          flexDirection: { xl: "row", lg: "row" },
          justifyContent: { xl: "center", lg: "center", md: "column" },
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: { xl: "70%", lg: "80%" },
          }}
        >
          <Stack
            sx={{
              height: { sm: "40px", xs: "40px" },
              width: { sm: "100%", xs: "100%" },
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                color: "black",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                fontSize: { xs: "13px", sm: "16px" },
              }}
            >
              <img
                src={LokSevaAayugLogo}
                alt="logo"
                style={{ height: "32px", width: "32px", marginRight: "8px" }}
              />{" "}
              Chhattisgarh Public Service Commission
            </Typography>
          </Stack>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          maxWidth: 600, // Increased width
          mx: "12px",
          p: 4,
          mt: 5,
          boxShadow: 3,
          borderRadius: 2,
          marginTop: { lg: "10%", xl: "10%", xs: "100px", sm: "100px" },
          backgroundColor: "white",
        }}
      >
        {/* Show loading or error messages */}
        {loading && <Typography>Loading student data...</Typography>}
        {errorMessage && <Typography color="error">{errorMessage}</Typography>}

        {/* Show student image when data is fetched */}
        {studentData && (
          <>
            <Stack
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: "40px",
              }}
            >
              <img
                src={studentData.image}
                alt={studentData.name}
                style={{ height: "80px", width: "80px" }}
              />
            </Stack>

            {/* One row with two fields */}
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  sx={{
                    color: "rgb(100, 116, 139)",
                    fontSize: { lg: "18px", sm: "16px" },
                    fontWeight: "400",
                  }}
                >
                  Name:
                </Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 3, borderRadius: 2 }}
                  value={studentData.name}
                  InputProps={{
                    readOnly: true,
                  }}
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <Typography
                  sx={{
                    color: "rgb(100, 116, 139)",
                    fontSize: { lg: "18px", sm: "16px" },
                    fontWeight: "400",
                  }}
                >
                  Roll No:
                </Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 3, borderRadius: 2 }}
                  value={studentData.rollNo}
                  InputProps={{
                    readOnly: true,
                  }}
                  size="small"
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography
                  sx={{
                    color: "rgb(100, 116, 139)",
                    fontSize: { lg: "18px", sm: "16px" },
                    fontWeight: "400",
                  }}
                >
                  Room/Hall No:
                </Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 3, borderRadius: 2 }}
                  value={studentData.room_no}
                  InputProps={{
                    readOnly: true,
                  }}
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <Typography
                  sx={{
                    color: "rgb(100, 116, 139)",
                    fontSize: { lg: "18px", sm: "16px" },
                    fontWeight: "400",
                  }}
                >
                  Date of Birth:
                </Typography>
                <TextField
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 3, borderRadius: 2 }}
                  value={studentData.dob}
                  InputProps={{
                    readOnly: true,
                  }}
                  size="small"
                />
              </Grid>
            </Grid>

            {/* Remaining fields */}
            <Stack>
              <Typography
                sx={{
                  color: "rgb(100, 116, 139)",
                  fontSize: { lg: "18px", sm: "16px" },
                  fontWeight: "400",
                }}
              >
                Gender:
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                sx={{ mb: 3, borderRadius: 2 }}
                value={studentData.gender}
                InputProps={{
                  readOnly: true,
                }}
                size="small"
              />
            </Stack>

            <Stack>
              <Typography
                sx={{
                  color: "rgb(100, 116, 139)",
                  fontSize: { lg: "18px", sm: "16px" },
                  fontWeight: "400",
                }}
              >
                Age:
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                sx={{ mb: 3, borderRadius: 2 }}
                value={studentData.age}
                InputProps={{
                  readOnly: true,
                }}
                size="small"
              />
            </Stack>

            <Stack>
              <Typography
                sx={{
                  color: "rgb(100, 116, 139)",
                  fontSize: { lg: "18px", sm: "16px" },
                  fontWeight: "400",
                }}
              >
                Address:
              </Typography>
              <TextField
                variant="outlined"
                fullWidth
                sx={{ mb: 3, borderRadius: 2 }}
                value={studentData.address}
                InputProps={{
                  readOnly: true,
                }}
                size="small"
              />
            </Stack>

            <Button
              variant="contained"
              fullWidth
              sx={{
                mb: 3,
                textTransform: "none",
                borderRadius: 2,
                backgroundColor: "rgb(46 125 50)",
              }}
              size="large"
            >
              Verify
            </Button>
          </>
        )}
      </Box>
    </Stack>
  );
};

export default Student_details;
