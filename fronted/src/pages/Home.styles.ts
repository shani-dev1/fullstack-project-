import { SxProps, Theme } from "@mui/system";

const styles: Record<string, SxProps<Theme>> = {
  mainContainer: {
    position: 'relative',
    minHeight: '100vh',
    pt: 8,
    pb: 10,
    background: '#000',
    overflow: 'hidden'
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 20% 30%, rgba(255, 87, 51, 0.15) 0%, rgba(0, 0, 0, 0) 50%), radial-gradient(circle at 80% 70%, rgba(78, 132, 212, 0.15) 0%, rgba(0, 0, 0, 0) 50%), radial-gradient(circle at 50% 50%, rgba(142, 68, 173, 0.1) 0%, rgba(0, 0, 0, 0) 70%)',
    zIndex: 0
  },
  titleGradient: {
    background: 'linear-gradient(90deg, #ff5733, #4e84d4, #8e44ad, #00ff6a,rgb(255, 51, 133),#ff5733)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textFillColor: 'transparent',
    backgroundSize: '200% auto',
    animation: 'gradientAnimation 8s ease infinite',
    fontWeight: 700,
    mb: 2,
    textAlign: 'center'
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    mb: 6
  },
  categoryGrid: {
    mt: 5,
    position: 'relative',
    zIndex: 2
  },
  categoryCard: {
    background: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    height: '100%',
    transition: 'all 0.4s ease',
    '&:hover': {
      transform: 'translateY(-10px)',
      boxShadow: '0 15px 40px rgba(0, 0, 0, 0.7)'
    }
  },
  cardMedia: {
    height: 140,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden'
  },
  cardMediaGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.8
  },
  cardMediaIcon: {
    position: 'relative',
    zIndex: 2,
    color: '#fff',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.2)'
    }
  },
  cardContent: {
    textAlign: 'center',
    pt: 3,
    pb: 4
  },
  cardTitle: {
    color: '#fff',
    fontWeight: 600,
    mb: 1
  },
  cardDescription: {
    color: 'rgba(255, 255, 255, 0.7)',
    mb: 3
  },
  exploreButton: {
    borderRadius: '30px',
    backgroundSize: '200% auto',
    color: '#fff',
    textTransform: 'none',
    fontWeight: 600,
    py: 1,
    px: 3,
    '&:hover': {
      backgroundPosition: 'right center',
      boxShadow: '0 5px 15px rgba(78, 132, 212, 0.4)'
    },
    transition: 'all 0.3s ease'
  },
  gradientAnimation: {
    '@keyframes gradientAnimation': {
      '0%': { backgroundPosition: '0% 50%' },
      '50%': { backgroundPosition: '100% 50%' },
      '100%': { backgroundPosition: '0% 50%' },
    },
  },
  bodyStyle: {
    background: '#000',
    margin: 0,
    padding: 0,
  },
};

export default styles;
