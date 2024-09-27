import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";

const cardData = [
  { title: "Total Exam Center", value: "80" },
  { title: "Total Register Student", value: "1000" },
  { title: "Total Pending Exams ", value: "12"},
  { title: "Total Completed Exam", value: "15" },
];

function TopCards() {
  return (
    <Grid container spacing={6}>
      {cardData.map((card, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card
            sx={{
              height: { xl: "180px", lg: "180px" },
              width: { xl: "320px", lg: "320px" },
            }}
          >
            <CardContent>
              
              <Typography variant="subtitle1">{card.title}</Typography>
              <Typography variant="h5">{card.value}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default TopCards;
