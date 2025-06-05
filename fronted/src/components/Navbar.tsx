import React, { useState, useEffect, ReactNode, MouseEvent } from 'react';
import { NavLink } from 'react-router';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  useScrollTrigger,
  Slide,
  Container,
  Fab,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useSelector } from 'react-redux';

import AuthForm from '../features/auth/AuthForm';
import { selectCurrentUser } from '../features/auth/currentUserSlice';
import UserMenu from './UserMenue';
import styles from './Navbar.styles';

interface ScrollTopProps {
  children: ReactNode;
}

const ScrollTop = (props: ScrollTopProps) => {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Slide in={trigger} direction="up">
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 1000 }}
      >
        {children}
      </Box>
    </Slide>
  );
}

const Navbar = () => {
  const user = useSelector(selectCurrentUser);
  const [openLogin, setOpenLogin] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        elevation={scrolled ? 4 : 0}
        sx={{
          ...styles.appBar,
          transition: 'all 0.3s ease',
          boxShadow: scrolled ? '0 4px 20px rgba(0, 0, 0, 0.5)' : 'none',
        }}
      >
        <Toolbar sx={{ px: { xs: 1, sm: 3 } }}>
          <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img
                src="/logo.png"
                alt="Logo"
                style={{
                  height: 80,
                  marginRight: 16,
                  cursor: 'pointer'
                }}
                onClick={() => window.location.href = '/'}
              />
              <Box sx={{ display: 'flex', gap: { xs: 1, sm: 2 } }}>
                <Button
                  component={NavLink}
                  to="/"
                  color="inherit"
                  sx={styles.navLink}
                >
                  Home Page
                </Button>
                <Button
                  component={NavLink}
                  to="/about"
                  color="inherit"
                  sx={styles.navLink}
                >
                  About
                </Button>
              </Box>
            </Box>

            {!user ? (
              <Button
                color="inherit"
                onClick={() => setOpenLogin(true)}
                sx={styles.loginButton}
              >
                Login
              </Button>
            ) : (
              <UserMenu />
            )}
          </Container>
        </Toolbar>
        <Box sx={styles.gradientBorder}></Box>
      </AppBar>
      <Toolbar />

      <Dialog
        open={openLogin}
        onClose={() => setOpenLogin(false)}
        PaperProps={{
          sx: { ...styles.dialogPaper, maxHeight: '90vh', overflowY: 'auto', }
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(90deg, #ff5733, #4e84d4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Please Login
          </Typography>
          <IconButton
            aria-label="close"
            onClick={() => setOpenLogin(false)}
            sx={styles.closeButton}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <AuthForm />
        </DialogContent>
      </Dialog>

      <ScrollTop>
        <Fab size="small" aria-label="scroll back to top" sx={styles.scrollTopButton}>
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
};

export default Navbar;
