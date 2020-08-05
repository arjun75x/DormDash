import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  pos: {
    marginBottom: 12,
  },
  cardAction: {
    justifyContent: "center",
  },
});

const OnQueueDisplay = ({ queueReqResponse }) => {
  const classes = useStyles();

  return (
    <Box display="flex" alignItems="center">
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography className={classes.title} gutterBottom>
            Queue Position
          </Typography>
          <Typography variant="body2" component="p">
            {queueReqResponse.QueueRequestID}
          </Typography>
          <Typography className={classes.title} gutterBottom>
            Dining Hall
          </Typography>
          <Typography variant="body2" component="p">
            {queueReqResponse.DiningHallName}
          </Typography>
          <Typography className={classes.title} gutterBottom>
            Queue Group
          </Typography>
          <Typography variant="body2" component="p">
            {queueReqResponse.QueueGroup.join(", ")}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OnQueueDisplay;
