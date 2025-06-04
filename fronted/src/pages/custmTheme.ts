import { createTheme } from '@mui/material/styles';

// Custom theme with the specified gradient colors
const customTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4e84d4',
      light: '#81b1ff',
      dark: '#1a58a3',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#8e44ad',
      light: '#b76fd4',
      dark: '#6a1f87',
      contrastText: '#ffffff',
    },
    error: {
      main: '#ff5733',
      light: '#ff8a66',
      dark: '#cc2900',
    },
    success: {
      main: '#00ff6a',
      light: '#66ff9d',
      dark: '#00b74a',
    },
    background: {
      default: '#000000',
      paper: '#111111',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(78, 132, 212, 0.2)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '30px',
          textTransform: 'none',
          padding: '8px 16px',
          transition: 'all 0.3s ease',
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #4e84d4, #8e44ad)',
          backgroundSize: '200% auto',
          boxShadow: '0 4px 15px rgba(78, 132, 212, 0.3)',
          '&:hover': {
            backgroundPosition: 'right center',
            boxShadow: '0 6px 20px rgba(78, 132, 212, 0.5)',
          },
        },
        containedSecondary: {
          background: 'linear-gradient(45deg, #8e44ad, #00ff6a)',
          backgroundSize: '200% auto',
          boxShadow: '0 4px 15px rgba(142, 68, 173, 0.3)',
          '&:hover': {
            backgroundPosition: 'right center',
            boxShadow: '0 6px 20px rgba(142, 68, 173, 0.5)',
          },
        },
        containedError: {
          background: 'linear-gradient(45deg, #ff5733, #ff0000)',
          backgroundSize: '200% auto',
          boxShadow: '0 4px 15px rgba(255, 87, 51, 0.3)',
          '&:hover': {
            backgroundPosition: 'right center',
            boxShadow: '0 6px 20px rgba(255, 87, 51, 0.5)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(17, 17, 17, 0.8)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          transition: 'all 0.4s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 15px 40px rgba(0, 0, 0, 0.7)',
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          background: 'rgba(17, 17, 17, 0.9)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          border: '1px solid rgba(78, 132, 212, 0.3)',
          boxShadow: '0 10px 40px rgba(142, 68, 173, 0.5)',
          overflow: 'hidden',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(90deg, transparent, rgba(78, 132, 212, 0.5), transparent)',
          height: '1px',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '8px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            border: '1px solid rgba(78, 132, 212, 0.3)',
          },
          '&.Mui-focused': {
            border: '1px solid rgba(78, 132, 212, 0.5)',
            boxShadow: '0 0 0 2px rgba(78, 132, 212, 0.2)',
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: '#000',
          scrollbarWidth: 'thin',
          scrollbarColor: '#4e84d4 #222',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#222',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#4e84d4',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#8e44ad',
          },
        },
        '@keyframes gradientAnimation': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
  },
});

export default customTheme;