import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import Typography from "@material-ui/core/Typography";
import Grid from '@material-ui/core/Grid';


function renderRow(props) {
    const { index, style } = props;
  
    return (
      <ListItem button style={style} key={index}>
        <ListItemText 
            primary={`Item ${index + 1}`} 
        />
      </ListItem>
    );
}
const QueueDisplay = ({list}

) => {
    return (
        <Box
        display="flex"
        marginTop="100px"
        alignItems="center"
        // justifyContent="left"
        >
            
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography margin="20px 0" variant="h6">Current Queue Status</Typography>
            </Grid>
            <Grid item xs={12}>
                <FixedSizeList height={400} width={300} itemSize={46} itemCount={200}>
                    {renderRow}
                </FixedSizeList>
                    {/* <Box> */}
                        {/* <List component="nav" aria-label="main mailbox folders">
                        <ListItem button>
                        <ListItemText 
                            primary="group 1" 
                            secondary="Bailey, Andrew"
                        />
                        </ListItem>
                        <ListItem button>
                        <ListItemText 
                            primary="group 2" 
                            secondary="Nayman, Arjun"
                        />
                        </ListItem>
                    </List> */}
                    
                    {/* </Box> */}
            
            
            </Grid>
        </Grid>
    </Box>
    );
};

export default QueueDisplay;