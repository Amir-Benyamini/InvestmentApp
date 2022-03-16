import * as React from "react";
import { useEffect } from "react";
import { observer, inject } from "mobx-react";
import { removeLocalStorage, removeCookie } from "../services/authHelpers";
import { AppBar, DrawerHeader, drawerWidth } from "../constans/styling";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import TimelineIcon from "@mui/icons-material/Timeline";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";

export const Nav = inject("auth")(
  //@ts-ignore
  observer((props: any) => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const screenWidth = window.screen.width;
    useEffect(() => {
      props.auth.authenticate();
    }, []);

    const handleDrawerOpen = () => {
      setOpen(true);
    };

    const handleDrawerClose = () => {
      setOpen(false);
    };

    const authenticate = props.auth.isLoggedIn;

    const logout = () => {
      removeLocalStorage("user");
      removeCookie("token");
    };

    if (authenticate) {
      if (screenWidth > 841) {
        return (
          <Box sx={{ display: "flex", marginBottom: "100px" }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
              <Toolbar>
                <Typography
                  variant="h6"
                  noWrap
                  sx={{ flexGrow: 1 }}
                  component="div"
                >
                  enWhealthy
                </Typography>
                <Button onClick={logout} size="large" color="inherit" href="/">
                  Logout
                </Button>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="end"
                  onClick={handleDrawerOpen}
                  sx={{ ...(open && { display: "none" }), marginRight: 1 }}
                >
                  <MenuIcon />
                </IconButton>
              </Toolbar>
            </AppBar>

            <Drawer
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                  width: drawerWidth,
                },
              }}
              variant="persistent"
              anchor="right"
              open={open}
            >
              <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === "rtl" ? (
                    <ChevronLeftIcon />
                  ) : (
                    <ChevronRightIcon />
                  )}
                </IconButton>
              </DrawerHeader>
              <Divider />
              <List>
                {[
                  {
                    text: "Profile",
                    path: "/profile",
                    icon: <AccountCircleIcon color="primary" />,
                  },
                  {
                    text: "Plan",
                    path: "/",
                    icon: <TimelineIcon color="primary" />,
                  },
                  {
                    text: "Monitor",
                    path: "/monitor",
                    icon: <AccountBalanceIcon color="primary" />,
                  },
                ].map((menuItem, index) => (
                  <div>
                    <Link
                      key={index}
                      href={menuItem.path}
                      color="inherit"
                      underline="none"
                    >
                      <ListItem button key={menuItem.text}>
                        <ListItemIcon>{menuItem.icon}</ListItemIcon>
                        <ListItemText primary={menuItem.text} />
                      </ListItem>
                    </Link>
                    <Divider />
                  </div>
                ))}
              </List>
            </Drawer>
          </Box>
        );
      } else {
        return (
          <Box sx={{ display: "flex", marginBottom: "100px" }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
              <Toolbar>
                <Typography
                  variant="h6"
                  noWrap
                  sx={{ flexGrow: 1 }}
                  component="div"
                >
                  enWhealthy
                </Typography>
                <Button onClick={logout} size="large" color="inherit" href="/">
                  Logout
                </Button>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="end"
                  onClick={handleDrawerOpen}
                  sx={{ ...(open && { display: "none" }), marginRight: 1 }}
                >
                  <MenuIcon />
                </IconButton>
              </Toolbar>
            </AppBar>

            <Drawer
              sx={{
                width: screenWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                  width: screenWidth,
                },
              }}
              variant="persistent"
              anchor="top"
              open={open}
            >
              <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === "rtl" ? (
                    <ChevronLeftIcon />
                  ) : (
                    <ChevronRightIcon />
                  )}
                </IconButton>
              </DrawerHeader>
              <Divider />
              <List>
                {[
                  {
                    text: "Profile",
                    path: "/profile",
                    icon: <AccountCircleIcon color="primary" />,
                  },
                  {
                    text: "Plan",
                    path: "/",
                    icon: <TimelineIcon color="primary" />,
                  },
                  {
                    text: "Monitor",
                    path: "/monitor",
                    icon: <AccountBalanceIcon color="primary" />,
                  },
                ].map((menuItem, index) => (
                  <div>
                    <Link
                      key={index}
                      href={menuItem.path}
                      color="inherit"
                      underline="none"
                    >
                      <ListItem button key={menuItem.text}>
                        <ListItemIcon>{menuItem.icon}</ListItemIcon>
                        <ListItemText primary={menuItem.text} />
                      </ListItem>
                    </Link>
                    <Divider />
                  </div>
                ))}
              </List>
            </Drawer>
          </Box>
        );
      }
    } else {
      return (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="sticky" open={open}>
            <Toolbar>
              <Typography
                variant="h6"
                noWrap
                sx={{ flexGrow: 1 }}
                component="div"
              >
                enWhealthy
              </Typography>
              <Button size="large" color="inherit" href="/signup">
                Signup
              </Button>
              <Button size="large" color="inherit" href="/login">
                Login
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
      );
    }
  })
);
