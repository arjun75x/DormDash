import React from 'react';
import Navbar from '../nav/navbar'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { FormControl, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    DBActionColor: {
        backgroundColor: "#d8effb",
        border: "solid"
    },
    DBActionBlock: {
        paddingTop: 10,
        paddingLeft: 10
    },
    ButtonBox: {
        marginRight: 20,
        textAlign: "right"
    }
  }));


const Admin = () => {
    const classes = useStyles();
    const [DBAction, setDBAction] = React.useState('');
    const [DBTable, setDBTable] = React.useState('');
    const selectDBActionType = (event) => {
        setDBAction(event.target.value);
      };
      const selectDBTable = (event) => {
        setDBTable(event.target.value);
      };


    /* conditional rendering using enums*/

    const tableSelect = {
        DiningHall:
        // TODO: this seems wrong, might need to change later
        <Box className={classes.DBActionBlock}>
            <Box>
                <TextField required id="standard-required" label="DiningHallName" />
                <TextField required id="standard-required" label="Capacity" />
                <TextField required id="standard-required" label="TableID"/> 
            </Box>
            <Box className={classes.ButtonBox}>
                <Button variant="contained" color="primary">Submit</Button>
            </Box>               

        </Box>,
        DiningHallTable:
        <Box className={classes.DBActionBlock}>
            <Box className={classes.DBActionBlock}>
            <Box>
                <TextField required id="standard-required" label="DiningHallName" />
                <TextField required id="standard-required" label="Capacity" />
                <TextField required id="standard-required" label="TableID"/> 
            </Box>
            <Box className={classes.ButtonBox}>
                <Button variant="contained" color="primary">Submit</Button>
            </Box>               

            </Box>
        </Box>,
        QueueRequest:
        <Box className={classes.DBActionBlock}>

        </Box>,
        AdmittedEntry:
        <Box className={classes.DBActionBlock}>

        </Box>,
        User:
        <Box className={classes.DBActionBlock}>

        </Box>,
    }
    const DBActionDisplay = {
        //can probably clean up the form control since it'll be reused
        Create: <Box className={classes.DBActionBlock}>
            
            <FormControl className={classes.formControl} noValidate autoComplete="off">
                <InputLabel id="demo-simple-select-label">Table</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={DBTable}
                        onChange={selectDBTable}
                    >
                        <MenuItem value={"DiningHall"}>DiningHall</MenuItem>
                        <MenuItem value={"DiningHallTable"}>DiningHallTable</MenuItem>
                        <MenuItem value={"QueueRequest"}>QueueRequest</MenuItem>
                        <MenuItem value={"AdmittedEntry"}>AdmittedEntry</MenuItem>
                        <MenuItem value={"User"}>User</MenuItem>

                    </Select>
            </FormControl>
            <Box> 
                {tableSelect[DBTable]}
            </Box>
        </Box>,
    //TODO
        Query:  <Box className={classes.DBActionBlock}>
            Query
            </Box>,
    //TODO
        Update: <Box className={classes.DBActionBlock}>
            Update
            </Box>,
        Delete: <Box className={classes.DBActionBlock}>
            Delete
            </Box>
    };
    return(
        <>
        <Navbar />
        <Box height={50}/>
        <Grid container spacing={3}>
            <Grid item xs={2} />
            <Grid item xs={8}>
            <Box>
                <FormControl className={classes.formControl} noValidate autoComplete="off">
                    <InputLabel id="demo-simple-select-label">CRUD</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={DBAction}
                        onChange={selectDBActionType}
                    >
                        <MenuItem value={"Create"}>Create</MenuItem>
                        <MenuItem value={"Query"}>Query</MenuItem>
                        <MenuItem value={"Update"}>Update</MenuItem>
                        <MenuItem value={"Delete"}>Delete</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Box height={50}/>
            <Box 
                className={classes.DBActionColor} 
                height={200}
                >
                {DBActionDisplay[DBAction]}
            </Box>
            
            </Grid>
            <Grid item xs={2} />
            
        </Grid>
        </>
    );
};
export default Admin;