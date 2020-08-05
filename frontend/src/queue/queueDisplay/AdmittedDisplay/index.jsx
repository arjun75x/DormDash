import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import PublishIcon from "@material-ui/icons/Publish";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";

const GreenButton = withStyles((theme) => ({
  root: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
}))(Button);

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

const AdmittedDisplay = ({
  handleEnter,
  admittedEntry,
  handleRemoveFromQueue,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} gutterBottom>
          Dining Hall
        </Typography>
        <Typography variant="body2" component="p">
          {admittedEntry.DiningHallName}
        </Typography>
        <Typography className={classes.title} gutterBottom>
          Admitted off the Queue on
        </Typography>
        <Typography variant="body2" component="p">
          {Date(admittedEntry.AdmitOffQueueTime)}
        </Typography>
        <Typography className={classes.title} gutterBottom>
          Queue Group
        </Typography>
        <Typography variant="body2" component="p">
          {admittedEntry.QueueGroup.join(", ")}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardAction}>
        {/* <Button
          onClick={handleRemoveFromQueue}
          variant="contained"
          color="secondary"
          startIcon={<DeleteIcon />}
        >
          Unqueue
        </Button> */}
        <GreenButton
          variant="contained"
          color="primary"
          // className={classes.margin}
          startIcon={<PublishIcon />}
          onClick={handleEnter}
        >
          Enter
        </GreenButton>
      </CardActions>
    </Card>
  );
};

export default AdmittedDisplay;
