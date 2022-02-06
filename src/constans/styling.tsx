import { makeStyles } from "@material-ui/core/styles";
import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
export const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  headerCells: {
    fontWeight: "bold",
  },
  setRoot: {
    width: "100%",
    maxWidth: 500,
    backgroundColor: theme.palette.background.paper,
  },
  planSummeryCard: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  planSummeryCardItems: {
    margin: "12px",
    justifyItems: "center",
  },
  planSummeryCardTitle: {
    display: "flex",
    justifyContent: "center",
  },
  planSummeryContainer: {
    display: "flex",
    justifyContent: "space-around",
  },
  planSummerySubContainers: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    flexWrap: "wrap",
  },

  form: {
    width: "40vw ",
    padding: "8px",
  },
  center_Text: {
    textAlign: "center",
  },
  login_btn: {
    margin: "8px",
    padding: "8px",
  },
}));

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));
//@ts-ignore
export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export const drawerWidth = 200;
