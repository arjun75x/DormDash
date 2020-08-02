import React, { useState, useReducer, useEffect } from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import HomeIcon from "@material-ui/icons/Home";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import HealingIcon from "@material-ui/icons/Healing";
import AccountCircle from '@material-ui/icons/AccountCircle';
import InboxIcon from "@material-ui/icons/MoveToInbox";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import Box from "@material-ui/core/Box";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import {useGoogleLogout , GoogleLogin } from 'react-google-login';


const Navbar = ({hasLoggedIn, setLoggedInCB, UserNetID, userTokenID, handleUserTokenCB, handleUserNetIDCB}) => {
  const [menu, updateMenu] = useState({
    drawerOpened: false,
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (booleanValue) => () => {
    updateMenu({
      drawerOpened: booleanValue,
    });
  };
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1
    },
    drawer: {
      width: 250,
      flexShrink: 0,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    drawerPaper: {
      width: 250,
    },
    // toolbar: theme.mixins.toolbar,
  }));

  const onLogoutSuccess = (response) => {
    console.log(response);
    setLoggedInCB(false);
    handleUserTokenCB();
    handleUserNetIDCB("");
  }
  
  const onFailure = (response) => {
    console.log('Logout failed, res: ', response);
  }
  const clientId = "808699597542-2jgrb1ive07o219flrasng9q0rm4fj6p.apps.googleusercontent.com";

  const { signOut } = useGoogleLogout({
    onLogoutSuccess,
    clientId,
    onFailure,
  });

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const classes = useStyles();
  return (
    <>
      <Box className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Box display="flex" flexGrow="1" alignItems="center">
              <Typography variant="h4" color="inherit">
                Dorm
              </Typography>
              <HealingIcon />
              <Typography variant="h4" color="inherit">
                Dash
              </Typography>
              <FastfoodIcon flexGrow={1}/>
            </Box>
            
           
            {!hasLoggedIn &&
              <Button color="inherit">Login</Button>
            }
            {hasLoggedIn &&
              <>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={()=>{console.log(UserNetID)}} value={userTokenID} />
                </Menu>
                <Button color="inherit" onClick={signOut}>Logout</Button>
              </>
            }
          </Toolbar>
        </AppBar>
      </Box>

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
        <Box onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          <Box height={64} />
          <Divider />
          <List>
            {["Home", "Admin"].map((text, index) => (
              <Link
                to={index % 2 === 0 ? "/" : "/admin"}
                style={{ color: "inherit", textDecoration: "inherit" }}
              >
                <ListItem button key={text}>
                  <ListItemIcon>
                    {index % 2 === 0 ? <HomeIcon /> : <SupervisorAccountIcon />}
                  </ListItemIcon>
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
