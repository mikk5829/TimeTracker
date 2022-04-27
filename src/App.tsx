import React, {useEffect} from 'react';
import {ThemeProvider} from '@mui/material';
import {theme} from "./service/theme";
import Base from "./pages/Base";
import {SnackbarProvider} from "notistack";
import {Provider} from './service/data';

function App() {
    return (
        <Provider>
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
        </Provider>
    );
}

export default App;
