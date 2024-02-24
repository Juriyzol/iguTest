import * as React from "react";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    secondary: {
      main: "#702F8A",
      light: "#FFEAFF",
      dark: "#612A80"
    }
  },
  components: {
    MuiButton: {
      defaultProps: {
        color: "secondary"
      },
      styleOverrides: {
        root: {
          padding: ".5rem 1.5rem"
        }
      }
    }
  }
});

export default function BasicButton() {
  return (
    <ThemeProvider theme={theme}>
      <Button
        variant="contained"
        // sx={
        //   {
        //     padding: ".5rem 1.5rem",
        //     backgroundColor: "#702F8A"
        //   }
        // }
      >
        Sign up
      </Button>
    </ThemeProvider>
  );
}
