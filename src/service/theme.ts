import {createTheme} from "@mui/material";

export const theme = createTheme({

    typography: {
        fontFamily: [
            'Epilogue',
            'sans-serif',
        ].join(','),
        h1: {
            fontWeight: 700
        },
        h2: {
            fontWeight: 700
        },
        h3: {
            fontWeight: 700
        },
        h4: {
            fontWeight: 700
        },
        h5: {
            fontWeight: 700
        },
        h6: {
            fontWeight: 700
        },
        body1: {
            fontWeight: 400
        },
        body2: {
            fontWeight: 400
        }
    },
    palette: {
        primary: {
            main: '#304255',
            light: '#5B6D82',
            dark: '#304255'
        },
        secondary: {
            main: '#CA4A53',
            light: '#FF7B7F',
            dark: '#94132B'
        }
    }
});