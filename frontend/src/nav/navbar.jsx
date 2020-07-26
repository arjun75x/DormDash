
import React, { useState, useReducer } from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import HealingIcon from '@material-ui/icons/Healing';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import Box from "@material-ui/core/Box";

import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'

const Navbar = () => {
    const [menu, updateMenu] = useState({
        drawerOpened: false
      });
    const toggleDrawer = booleanValue => () => {
        updateMenu({
          drawerOpened: booleanValue
        });
      };
    const useStyles = makeStyles({
    drawer: {
        width: 250,
        flexShrink: 0,
    },
    drawerPaper: {
        width: 250,
    },
    // toolbar: theme.mixins.toolbar,
    });
    const classes = useStyles();
    return (
        <>
        <AppBar position="static" >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h4" color="inherit">
              Door
            </Typography>
            <HealingIcon />
            <Typography variant="h4" color="inherit">
              Dash
            </Typography>
            {/* <DirectionsRunIcon /> */}
            <FastfoodIcon />
          </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={menu.drawerOpened}
        onClose={toggleDrawer(false)}
        width={250}
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Box
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Box  height={64}/>
        <Divider />
          <List >
            {['Home', 'Admin'].map((text, index) => (
            <Link to={index % 2 == 0 ? "/" : "/admin"} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <ListItem button key={text} >
                    
                    <ListItemIcon>{index % 2 == 0 ? <HomeIcon /> : <SupervisorAccountIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                </ListItem>
            </Link>
            ))}
        </List>
          {/* <ul>
            <li>Button1</li>
            <li>Button2</li>
            <li>Button3</li>
          </ul> */}
        </Box>
      </Drawer>
      </>
    );
};

export default Navbar;