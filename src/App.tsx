import React from 'react';
import {ThemeProvider} from '@mui/material';
import {theme} from "./service/theme";
import Base from "./pages/Base";
import {SnackbarProvider} from "notistack";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <SnackbarProvider
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                maxSnack={3}
            >
                <Base/>
            </SnackbarProvider>
        </ThemeProvider>
    );
}

export default App;
