import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";

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

const OnQueueDisplay = ({ queueRequest, handleRemoveFromQueue }) => {
  const classes = useStyles();

  return (
    <Box display="flex" alignItems="center">
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography className={classes.title} gutterBottom>
            Queue Position
          </Typography>
          <Typography variant="body2" component="p">
            {queueRequest.QueuePosition}
          </Typography>
          <Typography className={classes.title} gutterBottom>
            Dining Hall
          </Typography>
          <Typography variant="body2" component="p">
            {queueRequest.DiningHallName}
          </Typography>
          <Typography className={classes.title} gutterBottom>
            Queue Group
          </Typography>
          <Typography variant="body2" component="p">
            {queueRequest.QueueGroup.join(", ")}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardAction}>
          <Button
            onClick={handleRemoveFromQueue}
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
          >
            Unqueue
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default OnQueueDisplay;
