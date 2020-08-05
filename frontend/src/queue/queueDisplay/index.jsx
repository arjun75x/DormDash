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
import OnQueueDisplay from "./onQueueDisplay";

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

const QueueDisplay = ({
  queueReqResponse,
  setQueueReqResponseCB,
  userTokenID,
  userNetID,
}) => {
  const classes = useStyles();

  const handleEnter = (event) => {
    //TODO: post join queue, need some way to tie in user later
    fetch("http://localhost:3000/dev/admit/arrive", {
      headers: {
        Authorization: encodeBasicAuthHeader("Google", userTokenID),

        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ NetID: userNetID }),
    }).then((response) => {
      var r = response.json();
      return r;
    });
  };

  const handleExit = () => {
    fetch("http://localhost:3000/dev/admit/leave", {
      headers: {
        Authorization: encodeBasicAuthHeader("Google", userTokenID),
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ NetID: userNetID }),
    }).then(() => {
      setQueueReqResponseCB({});
    });
  };

  return <Box display="flex" alignItems="center"></Box>;
};

export default QueueDisplay;
