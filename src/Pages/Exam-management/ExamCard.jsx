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
      <Stack
        // spacing={2}
        sx={{ width: "100%", pl: 0, display: "flex", flexDirection: "row" }}
      >
        <Stack sx={{ width: "20%" }}>
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "4px",
            }}
          >
            <Avatar
              sx={{ width: 60, height: 60 }}
              src={LokSevaAayugLogo}
              alt="logo"
            />
          </Grid>
        </Stack>
        {/* <Stack
          sx={{
            border: "1px solid green",
            width: "80%",
           
          }}
        >
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: "4px",
              marginTop: "4px",
            }}
          >
            <Stack
              sx={{
                border: "1px solid red",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                Exam Name:
              </Typography>
            </Stack>

            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid green",
              }}
            >
              <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>
                {"TET"}
              </Typography>
            </Stack>
          </Stack>

          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: "4px",
            }}
          >
            <Stack
              sx={{
                border: "1px solid red",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                Date:
              </Typography>
            </Stack>

            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid green",
              }}
            >
              <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>
                {"17-09-2024"}
              </Typography>
            </Stack>
          </Stack>

          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: "4px",
            }}
          >
            <Stack
              sx={{
                border: "1px solid red",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                Start Time:
              </Typography>
            </Stack>

            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid green",
              }}
            >
              <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>
                {"10:00 AM"}
              </Typography>
            </Stack>
          </Stack>

          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: "4px",
            }}
          >
            <Stack
              sx={{
                border: "1px solid red",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
              
                End Time:
              </Typography>
            </Stack>

            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid green",
              }}
            >
              <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>
                {"01:00 PM"}
              </Typography>
            </Stack>
          </Stack>

          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: "4px",
            }}
          >
            <Stack
              sx={{
                border: "1px solid red",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                
                Countdown:
              </Typography>
            </Stack>

            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid green",
              }}
            >
              <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>
                {"03:00:00"}
              </Typography>
            </Stack>
          </Stack>
        </Stack> */}
        <Stack
          sx={{
           
            width: "80%",
          }}
        >
          {/* Row to contain two columns */}
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: "4px",
              marginTop: "4px",
            }}
          >
            {/* First column for labels */}
            <Stack
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                // border: "1px solid red",
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 600,
                  marginBottom: "4px",
                }}
              >
                Exam Name:
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 600,
                  marginBottom: "4px",
                }}
              >
                Date:
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 600,
                  marginBottom: "4px",
                }}
              >
                Start Time:
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 600,
                  marginBottom: "4px",
                }}
              >
                End Time:
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 600,
                  marginBottom: "4px",
                }}
              >
                Countdown:
              </Typography>
            </Stack>

            {/* Second column for values */}
            <Stack
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                // border: "1px solid green",
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "4px",
                 
                }}
              >
                {"TET"}
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "4px",
                }}
              >
                {"17-09-2024"}
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "4px",
                }}
              >
                {"10:00 AM"}
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "4px",
                }}
              >
                {"01:00 PM"}
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 400,
                  marginBottom: "4px",
                }}
              >
                {"03:00:00"}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};

export default ExamCard;
