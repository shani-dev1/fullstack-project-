import { SxProps } from '@mui/material';

export const loaderBoxStyle: SxProps = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '50vh',
};

export const loaderStyle: SxProps = {
  color: 'transparent',
  '&::before': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    background: 'linear-gradient(45deg, #e91e63, #ff5722, #ff9800, #4caf50, #2196f3)',
    mask: 'radial-gradient(farthest-side, transparent calc(100% - 4px), black calc(100% - 4px))',
    animation: 'spin 1s linear infinite',
  },
};

export const errorAlertContainer: SxProps = {
  mt: 4,
};

export const pageContainerStyle: SxProps = {
  position: 'relative',
  minHeight: '100vh',
};

export const fixedLabelBox: SxProps = {
  position: 'fixed',
  left: 20,
  top: 20,
  zIndex: 100,
  background: 'linear-gradient(135deg, #4caf50, #e91e63, #ff5722)',
  color: 'white',
  padding: '16px 28px',
  borderRadius: '12px',
  border: '1px solid rgba(255, 255, 255, 0.15)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '12px',
    zIndex: -1,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: -1,
    left: -1,
    right: -1,
    bottom: -1,
    borderRadius: '13px',
    background: 'linear-gradient(135deg, #e91e63, #ff5722)',
    zIndex: -2,
    filter: 'blur(1px)',
  },
};

export const fixedLabelText: SxProps = {
  mt: 6.5,
  fontWeight: 700,
  fontSize: '15px',
  textShadow: '0 2px 8px rgba(0,0,0,0.5)',
  letterSpacing: '0.5px',
  whiteSpace: 'nowrap',
  background: 'white',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textTransform: 'uppercase',
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
};

export const popupCardBox: SxProps = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000,
  opacity: 1,
  transition: 'opacity 0.3s ease',
  pointerEvents: 'none',
  '& > div': {
    transform: 'scale(1.05)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
  },
};
