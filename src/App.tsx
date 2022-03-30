import React from 'react';
import {ThemeProvider} from '@mui/material';
import {theme} from "./service/theme";
import Base from "./pages/Base";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Base/>
        </ThemeProvider>
    );
}

export default App;
