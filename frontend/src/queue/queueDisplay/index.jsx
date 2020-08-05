import React, { useState, useRef, useEffect } from "react";
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
import AdmittedDisplay from "./AdmittedDisplay";

const QueueDisplay = ({
  queueReqResponse,
  setQueueReqResponseCB,
  userTokenID,
  userNetID,
}) => {
  const admitTimeoutId = useRef(null);

  const attemptToAdmitOffQueue = () => {
    fetch("http://localhost:3000/dev/admit", {
      headers: {
        Authorization: encodeBasicAuthHeader("Google", userTokenID),

        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ NetID: userNetID }),
    }).then(({ message, ...rest }) => {
      if (message === "Success!") {
        setQueueReqResponseCB(rest);
      } else {
        admitTimeoutId.current = setTimeout(attemptToAdmitOffQueue, 10000);
      }
    });
  };

  useEffect(() => {
    if (queueReqResponse.queueRequest) {
      attemptToAdmitOffQueue();
    }

    return () => clearTimeout(admitTimeoutId.current);
  }, [queueReqResponse]);

  const handleEnter = () => {
    fetch("http://localhost:3000/dev/admit/arrive", {
      headers: {
        Authorization: encodeBasicAuthHeader("Google", userTokenID),

        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ NetID: userNetID }),
    }).then(() => setQueueReqResponseCB({ eating: true }));
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

  return (
    <Box display="flex" alignItems="center">
      {queueReqResponse.queueRequest && (
        <OnQueueDisplay queueRequest={queueReqResponse.queueRequest} />
      )}
      {queueReqResponse.admittedEntry && (
        <AdmittedDisplay
          admittedEntry={queueReqResponse.admittedEntry}
          handleEnter={handleEnter}
        />
      )}
    </Box>
  );
};

export default QueueDisplay;
