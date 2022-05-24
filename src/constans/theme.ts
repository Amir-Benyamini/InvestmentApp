import { createTheme } from "@mui/material";
import { deepPurple, green } from "@mui/material/colors";

const primaryColor = deepPurple[500];
const primaryLightColor = deepPurple[200];
const secoundaryColor = green[400];

export const customTheme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: secoundaryColor,
    },
  },
  components: {
    MuiSpeedDial: {
      styleOverrides: {
        fab: {
          backgroundColor: secoundaryColor,
        },

      }
    },
  }
});
