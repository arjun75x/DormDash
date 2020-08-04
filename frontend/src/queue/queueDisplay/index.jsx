import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import PublishIcon from "@material-ui/icons/Publish";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { green } from "@material-ui/core/colors";
import { encodeBasicAuthHeader } from "../../utils";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

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

const GreenButton = withStyles((theme) => ({
  root: {
    // color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
}))(Button);

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const QueueDisplay = ({
  queueReqResponse,
  setQueueReqResponseCB,
  /* TODO: add unique user to distinguish usage (for entering)? right now defaulted to groupnetID[0] */
  userTokenID,
  userNetID,
}) => {
  const classes = useStyles();
  const [hasEntered, setHasEntered] = useState(false);

  const handleEnter = (event) => {
    setHasEntered(true);
    //TODO: post join queue, need some way to tie in user later
    fetch("http://localhost:3000/dev/admit/arrive", {
      headers: {
        // Authorization: encodeBasicAuthHeader("DeveloperOnly", queueReqResponse.QueueGroup[0]),
        Authorization: encodeBasicAuthHeader("Google", userTokenID),

        "Content-Type": "application/json",
      },
      method: "POST",
      //TODO: hardcoded rn
      // body: JSON.stringify({ NetID: queueReqResponse.QueueGroup[0] }),
      body: JSON.stringify({ NetID: userNetID }),
    }).then((response) => {
      var r = response.json();
      return r;
    });
  };

  const handleExit = (event) => {
    setHasEntered(false);

    /* TODO: not sure if this is the right place to clear queueReqResponse dict for conditional rendering in the parent*/
    setQueueReqResponseCB({});

    fetch("http://localhost:3000/dev/admit/leave", {
      headers: {
        // Authorization: encodeBasicAuthHeader("DeveloperOnly", queueReqResponse.QueueGroup[0]),
        Authorization: encodeBasicAuthHeader("Google", userTokenID),
        "Content-Type": "application/json",
      },
      method: "POST",
      //TODO: hardcoded rn
      // body: JSON.stringify({ NetID: queueReqResponse.QueueGroup[0] }),
      body: JSON.stringify({ NetID: userNetID }),
    }).then((response) => {
      var r = response.json();
      return r;
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
  };

  return (
    <Box display="flex" alignItems="center">
      {!hasEntered && (
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
              Admitted off the Queue on
            </Typography>
            <Typography variant="body2" component="p">
              {Date(queueReqResponse.AdmitOffQueueTime)}
            </Typography>
            <Typography className={classes.title} gutterBottom>
              Queue Group
            </Typography>
            <Typography variant="body2" component="p">
              {queueReqResponse.QueueGroup.join(", ")}
            </Typography>
          </CardContent>
          <CardActions className={classes.cardAction}>
            <Button
              variant="contained"
              color="secondary"
              // className={classes.button}
              startIcon={<DeleteIcon />}
              // onClick={() => {if (window.confirm('Are you sure you wish to delete this Dining Hall DB Table?')) handleDeleteDH() } }
            >
              Unqueue
            </Button>
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
      )}

      {hasEntered && (
        <>
          <Snackbar
            open={hasEntered}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="success">
              You've entered the Dining Hall - enjoy your meal!
            </Alert>
          </Snackbar>
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Enjoy your meal! Remember to click Exit when you wish to leave.
              </Typography>
              <CardActions className={classes.cardAction}>
                <Button
                  variant="contained"
                  color="secondary"
                  // className={classes.button}
                  startIcon={<ExitToAppIcon />}
                  onClick={(e) => {
                    if (
                      window.confirm(
                        "Confirm that you wish to leave the Dining Hall"
                      )
                    )
                      handleExit(e);
                  }}
                >
                  Exit
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </>
      )}
    </Box>
  );
};

export default QueueDisplay;
