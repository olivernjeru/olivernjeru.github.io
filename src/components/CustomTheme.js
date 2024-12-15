import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./Navbar";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1e88e5", // Blue accent
    },
    secondary: {
      main: "#f50057", // Pink accent
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Header />
    </ThemeProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
