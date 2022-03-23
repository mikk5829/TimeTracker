import React from 'react';
import {ThemeProvider, Typography} from '@mui/material';
import {theme} from "./service/theme";
import {Variant} from "@mui/material/styles/createTypography";
import Home from "./pages/Home";

const fonts: Variant[] = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body1', 'body2']

function App() {
    return (
        <ThemeProvider theme={theme}>
            <div>
                <Home/>
                {fonts.map((font) => <Typography color={theme.palette.secondary.dark} variant={font}
                                                 align={'center'}>{font}</Typography>)}
            </div>
        </ThemeProvider>
    );
}

export default App;
