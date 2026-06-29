import { createTheme } from '@mui/material/styles';

const gatekeeperTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00d4b8',
      dark: '#00a896',
      light: '#5cf2dc',
      contrastText: '#04211d',
    },
    secondary: {
      main: '#7c8aff',
    },
    error: {
      main: '#ff5c5c',
    },
    warning: {
      main: '#ffb648',
    },
    background: {
      default: '#0b0f14',
      paper: '#121821',
    },
    divider: 'rgba(255,255,255,0.08)',
    text: {
      primary: '#e6edf3',
      secondary: '#92a0ad',
    },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { fontWeight: 600, textTransform: 'none' },
    overline: { letterSpacing: '0.12em' },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#0e141b',
          backgroundImage: 'none',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
      defaultProps: {
        elevation: 0,
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid rgba(255,255,255,0.08)',
          backgroundColor: '#121821',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        containedPrimary: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 0 0 3px rgba(0,212,184,0.18)',
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255,255,255,0.03)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: '#92a0ad',
          fontWeight: 700,
          textTransform: 'uppercase',
          fontSize: '0.72rem',
          letterSpacing: '0.06em',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        },
        body: {
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        },
      },
    },
  },
});

export default gatekeeperTheme;
