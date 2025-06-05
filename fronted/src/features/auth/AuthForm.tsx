import { useState } from 'react';
import { TextField, Button, Typography, Paper, Snackbar, Alert, Link, Box } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema, signInSchema } from './AuthSchema';
import type { SignInInput, User, userInfo } from './authTypes';
import { useCreateUserMutation, useSignInMutation } from './authAPI';
import { setCookie } from 'typescript-cookie';
import { useDispatch } from 'react-redux';
import { setUser } from './currentUserSlice';

const AuthForm = () => {
  const dispatch = useDispatch();
  const [createUser] = useCreateUserMutation();
  const [signIn] = useSignInMutation();
  const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorSnackbar, setErrorSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const signUpForm = useForm<User>({
    mode: 'onChange',
    resolver: zodResolver(signUpSchema),
  });

  const signInForm = useForm<SignInInput>({
    mode: 'onChange',
    resolver: zodResolver(signInSchema),
  });

  const isSignUp = mode === 'signUp';

  const onSubmit: SubmitHandler<User | SignInInput> = async (data: User | SignInInput) => {
    try {
      let response: { token: string, userInfo: userInfo } | undefined;

      if (isSignUp) {
        response = await createUser(data).unwrap();
      } else {
        const { email, password } = data as SignInInput;
        response = await signIn({ email, password }).unwrap();
      }

      const token: string | undefined = response?.token;
      if (!token) throw new Error("Token is undefined");

      setCookie('token', token, { expires: 1, path: '/' });
      if (response?.userInfo) {
        dispatch(setUser(response.userInfo));
      }
      setOpenSnackbar(true);
      isSignUp ? signUpForm.reset() : signInForm.reset();
    } catch (error: any) {
      console.error("Error:", error);
      setErrorMessage(error?.data?.message || error?.message || "משהו השתבש, נסה שוב.");
      setErrorSnackbar(true);
    }
  };

  const toggleMode = () => {
    setMode(prev => (prev === 'signUp' ? 'signIn' : 'signUp'));
    signUpForm.reset();
    signInForm.reset();
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#000',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 30%, rgba(255, 87, 51, 0.15) 0%, rgba(0, 0, 0, 0) 50%), radial-gradient(circle at 80% 70%, rgba(78, 132, 212, 0.15) 0%, rgba(0, 0, 0, 0) 50%), radial-gradient(circle at 50% 50%, rgba(142, 68, 173, 0.1) 0%, rgba(0, 0, 0, 0) 70%)',
        zIndex: 0
      }} />
      
      <Paper elevation={3} sx={{
        padding: 4,
        width: '400px',
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(10px)',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'relative',
        zIndex: 1,
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
      }}>
        <Typography variant="h4" sx={{
          background: 'linear-gradient(90deg, #ff5733, #4e84d4, #8e44ad, #00ff6a)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textFillColor: 'transparent',
          backgroundSize: '200% auto',
          animation: 'gradientAnimation 8s ease infinite',
          fontWeight: 700,
          mb: 3,
          textAlign: 'center',
        }}>
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </Typography>

        {isSignUp ? (
          <form onSubmit={signUpForm.handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Name"
              margin="normal"
              {...signUpForm.register("name")}
              error={!!signUpForm.formState.errors.name}
              helperText={signUpForm.formState.errors.name?.message}
              sx={textFieldStyle}
            />
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              type="email"
              {...signUpForm.register("email")}
              error={!!signUpForm.formState.errors.email}
              helperText={signUpForm.formState.errors.email?.message}
              sx={textFieldStyle}
            />
            <TextField
              fullWidth
              label="Phone"
              margin="normal"
              {...signUpForm.register("phone")}
              error={!!signUpForm.formState.errors.phone}
              helperText={signUpForm.formState.errors.phone?.message}
              sx={textFieldStyle}
            />
            <TextField
              fullWidth
              label="Password"
              margin="normal"
              type="password"
              {...signUpForm.register("password")}
              error={!!signUpForm.formState.errors.password}
              helperText={signUpForm.formState.errors.password?.message}
              autoComplete="new-password"
              sx={textFieldStyle}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={buttonStyle}
            >
              Register
            </Button>
          </form>
        ) : (
          <form onSubmit={signInForm.handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              type="email"
              {...signInForm.register("email")}
              error={!!signInForm.formState.errors.email}
              helperText={signInForm.formState.errors.email?.message}
              sx={textFieldStyle}
            />
            <TextField
              fullWidth
              label="Password"
              margin="normal"
              type="password"
              {...signInForm.register("password")}
              error={!!signInForm.formState.errors.password}
              helperText={signInForm.formState.errors.password?.message}
              autoComplete="current-password"
              sx={textFieldStyle}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={buttonStyle}
            >
              Sign In
            </Button>
          </form>
        )}
        
        <Typography variant="body2" sx={{ mt: 3, textAlign: 'center', color: 'rgba(255, 255, 255, 0.7)' }}>
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
          <Link
            onClick={toggleMode}
            sx={{
              cursor: 'pointer',
              ml: 1,
              color: '#4e84d4',
              '&:hover': {
                color: '#ff5733',
              }
            }}
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </Link>
        </Typography>
      </Paper>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          {isSignUp ? 'User registered successfully!' : 'Signed in successfully!'}
        </Alert>
      </Snackbar>

      <Snackbar open={errorSnackbar} autoHideDuration={6000} onClose={() => setErrorSnackbar(false)}>
        <Alert onClose={() => setErrorSnackbar(false)} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>

      <style>
        {`
          @keyframes gradientAnimation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </Box>
  );
};

const textFieldStyle = {
  '& .MuiOutlinedInput-root': {
    color: 'white',
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.23)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.4)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#4e84d4',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
    '&.Mui-focused': {
      color: '#4e84d4',
    },
  },
  '& .MuiFormHelperText-root': {
    color: 'rgba(255, 255, 255, 0.5)',
  },
};

const buttonStyle = {
  mt: 3,
  height: '48px',
  background: 'linear-gradient(90deg, #ff5733, #4e84d4)',
  backgroundSize: '200% auto',
  transition: 'all 0.3s ease',
  textTransform: 'none',
  fontSize: '1.1rem',
  fontWeight: 600,
  '&:hover': {
    backgroundPosition: 'right center',
    boxShadow: '0 5px 15px rgba(78, 132, 212, 0.4)',
  },
};

export default AuthForm;