import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";

const cardData = [
  { title: "Weekly Sales", value: "714k", percentage: "+2.6%" },
  { title: "New Users", value: "1.35m", percentage: "-0.1%" },
  { title: "Purchase Orders", value: "1.72m", percentage: "+2.8%" },
  { title: "Messages", value: "234", percentage: "+3.6%" },
];

function TopCards() {
  return (
    <Grid container spacing={3}>
      {cardData.map((card, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card
            sx={{
              height: { xl: "180px", lg: "180px" },
              width: { xl: "420px", lg: "420px" },
            }}
          >
            <CardContent>
              <Typography variant="h5">{card.value}</Typography>
              <Typography variant="subtitle1">{card.title}</Typography>
              <Typography
                variant="body2"
                color={card.percentage.includes("+") ? "green" : "red"}
              >
                {card.percentage}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default TopCards;
