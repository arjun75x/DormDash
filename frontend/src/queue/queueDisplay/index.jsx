import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from "@material-ui/icons/Delete";
import PublishIcon from '@material-ui/icons/Publish';
import { green } from '@material-ui/core/colors';


const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 8
    },
    pos: {
      marginBottom: 12,
    },
    cardAction: {
      justifyContent: "center"
    }
  });

const GreenButton = withStyles((theme) => ({
  root: {
    // color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
}))(Button);


const QueueDisplay = ({
    queueReqResponse    
}) => {
    const classes = useStyles();

    return (
        <Box display="flex" alignItems="center">

        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography className={classes.title}  gutterBottom>
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
                  {queueReqResponse.QueueGroup.join(', ')}
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
                >
                  Admit
                </GreenButton>


            </CardActions>
            </Card>
      
 


      
    </Box>
    );
};

export default QueueDisplay;