import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#0d8861ff',
        },
    },
    typography: {
        fontFamily: 'Noto Sans, sans-serif',
        body2: {
            paddingBottom: '1em',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                },
            },
        },
    },
});

export default theme;