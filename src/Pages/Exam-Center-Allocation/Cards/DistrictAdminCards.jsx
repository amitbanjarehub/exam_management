import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";

const cardData = [
  { title: "Verified Center", value: "4",  },
  { title: "Pending Center", value: "2",  },
  { title: "Allocated Center", value: "4",  },
  { title: "Active Center", value: "5", },
//   { title: "Completed", value: "80", },
//   { title: "Cancel", value: "5", },
];

function DistrictAdminCards() {
  return (
    <Grid container spacing={3}>
      {cardData.map((card, index) => (
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4} key={index}>
          <Card
            sx={{
              height: { xl: "120px", lg: "120px" },
              width: {
                xl: "90%",
                lg: "90%",
                md: "60%",
                sm: "100%",
                xs: "100%",
                backgroundColor: "#f2f6f7",
              }, // Adjusted to take full width of Grid item
            }}
          >
            <CardContent>
              <Typography variant="subtitle1">{card.title}</Typography>
              <Typography >{card.value}</Typography>
             
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default DistrictAdminCards;


