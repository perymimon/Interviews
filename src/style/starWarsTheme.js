import { createTheme } from "@mui/material/styles"

const starWarsTheme = createTheme({
    cssVariables: true,
    palette: {
        mode: "dark",
        primary: {
            main: "#FFE81F", // Star Wars yellow
        },
        secondary: {
            main: "#2E67F8", // Lightsaber blue
        },
        background: {
            default: "rgb(17 24 39)", // Dark space
            paper: "rgb(17 24 39)", // Slightly lighter for cards
        },
        text: {
            primary: "#FFFFFF",
            secondary: "#B0B0B0",
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: "2.5rem",
            fontWeight: 700,
        },
        h2: {
            fontSize: "2rem",
            fontWeight: 600,
        },
        h3: {
            fontSize: "1.5rem",
            fontWeight: 600,
        },
        body1: {
            fontSize: "1rem",
        },
        button: {
            textTransform: "none",
        },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiAppBar: {
            defaultProps: {
                color: "transparent",
                elevation: 0,
            },
            styleOverrides: {
                root: {
                    padding: 2,
                },
            },
        },
    },
})
console.log(starWarsTheme)
export default starWarsTheme

