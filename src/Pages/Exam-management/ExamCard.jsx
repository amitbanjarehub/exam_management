import React from "react";
import { Card, Typography, Stack, Avatar, Grid } from "@mui/material";
import LokSevaAayugLogo from "./loksevaaayug.png";

const ExamCard = () => {
  return (
    <Card
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        boxShadow: 3,
        borderRadius: 2,
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <Stack spacing={2} sx={{ width: "100%", pl: 0 }}>
        {/* First Grid: Logo, Exam Name, and Date */}
        <Grid container spacing={1} sx={{ pl: "4px", pr: "4px" }}>
          <Grid item xs={4} sx={{  display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <Avatar
              sx={{ width: 40, height: 40,  }}
              src={LokSevaAayugLogo}
              alt="logo"
            />
          </Grid>
          <Grid item xs={4}>
            <Stack direction="column" alignItems="center" spacing={1}>
              <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>
                Exam Name
              </Typography>
              <Typography sx={{ fontSize: "12px" }}>TET</Typography>
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack direction="column" alignItems="center" spacing={1}>
              <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>
                Date
              </Typography>
              <Typography sx={{ fontSize: "12px" }}>09/14/2024</Typography>
            </Stack>
          </Grid>
        </Grid>

        {/* Second Grid: Start Time, End Time, and Countdown */}
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Stack direction="column" alignItems="center" spacing={1}>
              <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>
                Start Time
              </Typography>
              <Typography sx={{ fontSize: "12px" }}>10:00 AM</Typography>
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack direction="column" alignItems="center" spacing={1}>
              <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>
                End Time
              </Typography>
              <Typography sx={{ fontSize: "12px" }}>01:00 PM</Typography>
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack direction="column" alignItems="center" spacing={1}>
              <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>
                Countdown
              </Typography>
              <Typography sx={{ fontSize: "12px" }}>03:00:00</Typography>
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    </Card>
  );
};

export default ExamCard;
