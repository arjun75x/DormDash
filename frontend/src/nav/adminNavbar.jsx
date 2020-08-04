import React, { useState } from "react";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
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
import HealingIcon from "@material-ui/icons/Healing";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import Box from "@material-ui/core/Box";

import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";



const AdminNavbar = () => {

  const [menu, updateMenu] = useState({
    drawerOpened: false,
  });

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
                key={index}
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
          
        </Box>
      </Drawer>
    </>
  );
};

export default AdminNavbar;
