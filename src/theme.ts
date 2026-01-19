'use client';
import { createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#FF4500', // Reddit orange-red
        },
        secondary: {
            main: '#0079D3', // Reddit blue
        },
        background: {
            default: '#0B1416', // Deep dark
            paper: '#1A282D', // Slightly lighter dark
        },
        text: {
            primary: '#D7DADC',
            secondary: '#818384',
        },
    },
    typography: {
        fontFamily: roboto.style.fontFamily,
        h1: { fontSize: '2.5rem', fontWeight: 700 },
        h2: { fontSize: '2rem', fontWeight: 600 },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 20,
                    textTransform: 'none',
                    fontWeight: 600,
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                }
            }
        }
    },
});

export default theme;
