import React, { useState } from "react";
import { withStyles, makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import TextField from '@material-ui/core/TextField';
import { FixedSizeList } from 'react-window';
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';
import CancelIcon from "@material-ui/icons/Cancel";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

const queueDisplayPaper = withStyles({
root: {
    // width: "30px",
    height: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "12px",
    marginLeft: "12px",
},
})(Paper);

const QueueDisplay = ({
    queueReqResponse    
}) => {
    // const classes = useStyles();

    
    return (
        <Box display="flex" alignItems="center">
      
      <queueDisplayPaper variant="outlined">{queueReqResponse.QueueRequestID}</queueDisplayPaper>
      <queueDisplayPaper variant="outlined">{queueReqResponse.DiningHallName}</queueDisplayPaper>
      <queueDisplayPaper variant="outlined">{queueReqResponse.EnterQueueTime}</queueDisplayPaper>
      <queueDisplayPaper variant="outlined">{queueReqResponse.QueueGroup}</queueDisplayPaper>

      {/* {queueReqResponse.QueueGroup.map((NetID, i) => (
            <queueDisplayPaper
              {NetID}
              key={i}
            />
          ))} */}

      <Button
            variant="contained"
            color="secondary"
            // className={classes.button}
            startIcon={<DeleteIcon />}
            // onClick={() => {if (window.confirm('Are you sure you wish to delete this Dining Hall DB Table?')) handleDeleteDH() } }
        >
            Unqueue
        </Button>
    </Box>
    );
};

export default QueueDisplay;