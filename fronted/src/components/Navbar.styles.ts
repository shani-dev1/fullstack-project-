import { SxProps, Theme } from '@mui/material';

const customStyles: Record<string, SxProps<Theme>> = {
  appBar: {
    background: 'rgba(0, 0, 0, 0.85)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(78, 132, 212, 0.2)',
  },
  gradientBorder: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: 'linear-gradient(90deg, #ff5733, #4e84d4, #8e44ad, #00ff6a, #ff5733)',
    backgroundSize: '200% auto',
    animation: 'gradientAnimation 8s ease infinite'
  },
  navLink: {
    textTransform: 'none',
    fontWeight: 600,
    color: '#fff',
    position: 'relative',
    overflow: 'hidden',
    padding: '8px 16px',
    borderRadius: '8px',
    mx: 1,
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: '50%',
      width: 0,
      height: '2px',
      background: 'linear-gradient(90deg, #ff5733, #4e84d4)',
      transition: 'all 0.3s ease',
    },
    '&:hover': {
      background: 'rgba(142, 68, 173, 0.1)',
      '&::after': {
        width: '80%',
        left: '10%',
      }
    },
    '&.active': {
      background: 'rgba(0, 255, 106, 0.1)',
      '&::after': {
        width: '80%',
        left: '10%',
        background: 'linear-gradient(90deg, #00ff6a, #4e84d4)',
      }
    }
  },
  loginButton: {
    textTransform: 'none',
    fontWeight: 600,
    borderRadius: '30px',
    px: 3,
    py: 1,
    background: 'linear-gradient(45deg, #ff5733, #8e44ad)',
    backgroundSize: '200% auto',
    boxShadow: '0 4px 15px rgba(255, 87, 51, 0.3)',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundPosition: 'right center',
      boxShadow: '0 6px 20px rgba(255, 87, 51, 0.5)',
      transform: 'translateY(-2px)'
    }
  },
  dialogPaper: {
    background: 'rgba(0, 0, 0, 0.9)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    border: '1px solid rgba(78, 132, 212, 0.3)',
    boxShadow: '0 10px 40px rgba(142, 68, 173, 0.5)',
    overflow: 'hidden',
    '&:before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '4px',
      background: 'linear-gradient(90deg, #ff5733, #4e84d4, #8e44ad, #00ff6a, #ff5733)',
      backgroundSize: '200% auto',
      animation: 'gradientAnimation 8s ease infinite'
    }
  },
  closeButton: {
    position: 'absolute',
    right: 8,
    top: 8,
    color: '#fff',
    background: 'rgba(255, 87, 51, 0.1)',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'rgba(255, 87, 51, 0.2)',
      transform: 'rotate(90deg)'
    }
  },
  scrollTopButton: {
    position: 'fixed',
    bottom: 20,
    right: 20,
    background: 'linear-gradient(45deg, #ff5733, #8e44ad)',
    color: '#fff',
    borderRadius: '50%',
    boxShadow: '0 4px 20px rgba(142, 68, 173, 0.6)',
    '&:hover': {
      background: 'linear-gradient(45deg, #8e44ad, #00ff6a)',
      boxShadow: '0 6px 25px rgba(0, 255, 106, 0.6)',
    }
  }
};

export const globalStyles = {
  '@keyframes gradientAnimation': {
    '0%': {
      backgroundPosition: '0% 50%',
    },
    '50%': {
      backgroundPosition: '100% 50%',
    },
    '100%': {
      backgroundPosition: '0% 50%',
    },
  },
};

export default customStyles;
