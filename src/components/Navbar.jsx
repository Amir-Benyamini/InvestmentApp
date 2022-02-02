import React, { useEffect, useState } from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import TimelineIcon from "@mui/icons-material/Timeline";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import Button from "@material-ui/core/Button";
import LinkM from "@material-ui/core/Link";
import { useTheme } from "@material-ui/core/styles";
import { useStyles } from "../constants";
import { observer, inject } from "mobx-react";
import { removeLocalStorage, removeCookie } from "../services/authHelpers";

export const NavBar = inject("auth")(
  observer((props) => {
    const classes = useStyles();
    const theme = useTheme();

    const [open, setOpen] = useState(false);
    const authenticate = props.auth.isLoggedIn;
    console.log(authenticate);
    const isActive = (path) => {
      if (window.location.pathname === path) {
        return "";
      } else {
        return "inherit";
      }
    };
    const logout = () => {
      removeLocalStorage("user");
      removeCookie("token");
    };

    const handleDrawerOpen = () => {
      setOpen(true);
    };

    const handleDrawerClose = () => {
      setOpen(false);
    };

    if (!authenticate) {
      return (
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}
          >
            <Toolbar>
              <LinkM
                color="inherit"
                href="/"
                underline="none"
                noWrap
                className={classes.title}
              >
                <Typography variant="h6">enWhealthy</Typography>
              </LinkM>
              <Button size="large" color={isActive("/signup")} href="/signup">
                Signup
              </Button>
              <Button size="large" color={isActive("/login")} href="/login">
                Login
              </Button>
            </Toolbar>
          </AppBar>
          <main
            className={clsx(classes.content, {
              [classes.contentShift]: open,
            })}
          >
            <div className={classes.drawerHeader} />
          </main>
        </div>
      );
    } else {
      return (
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}
          >
            <Toolbar>
              <LinkM
                color="inherit"
                href="/"
                underline="none"
                noWrap
                className={classes.title}
              >
                <Typography variant="h6" noWrap className={classes.title}>
                  enWhealthy
                </Typography>
              </LinkM>
              <Button onClick={logout} size="large" color="inherit" href="/">
                Logout
              </Button>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerOpen}
                className={clsx(open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <main
            className={clsx(classes.content, {
              [classes.contentShift]: open,
            })}
          >
            <div className={classes.drawerHeader} />
          </main>
          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="right"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </div>
            <Divider />
            <List>
              {[
                {
                  text: "Profile",
                  path: "/profile",
                  icon: <AccountCircleIcon color="primary" />,
                },
                {
                  text: "Monitoring Dashboard",
                  path: "/monitor",
                  icon: <AccountBalanceIcon color="primary" />,
                },
                {
                  text: "Planing Dashboard",
                  path: "/plan",
                  icon: <TimelineIcon color="primary" />,
                },
                {
                  text: "Analytics Dashboard",
                  path: "/analytics",
                  icon: <AnalyticsIcon color="primary" />,
                },
              ].map((menuItem, index) => (
                <LinkM
                  key={index}
                  href={menuItem.path}
                  color="inherit"
                  underline="none"
                >
                  <ListItem button key={menuItem.text}>
                    <ListItemIcon>{menuItem.icon}</ListItemIcon>
                    <ListItemText primary={menuItem.text} />
                  </ListItem>
                </LinkM>
              ))}
            </List>
          </Drawer>
        </div>
      );
    }
  })
);
