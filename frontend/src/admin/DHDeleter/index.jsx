import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from "@material-ui/icons/Cancel";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from '@material-ui/core/styles';

const CapacityPaper = withStyles({
  root: {
    width: "200px",
    height: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "12px",
  },
})(Paper);

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

const DHDeleter = ({ deleteDHCB, DHName}) => {
    const classes = useStyles();
    const handleDeleteDH = () => {
        deleteDHCB(DHName);
    };

    return (
        <Box display="flex" alignItems="center" margin="6px 0">
        
        <CapacityPaper variant="outlined">{DHName}</CapacityPaper>
        <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<DeleteIcon />}
            onClick={() => {if (window.confirm('Are you sure you wish to delete this Dining Hall DB Table?')) handleDeleteDH() } }
        >
            Delete
        </Button>
        
        </Box>
    );
};

export default DHDeleter;
