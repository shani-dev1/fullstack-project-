import { useEffect } from 'react';
import { RouterProvider } from 'react-router';
import router from './routes/Routes';
import './App.css';
import { Provider, useDispatch } from 'react-redux';
import store from './app/store';
import { getCookie } from 'typescript-cookie';
import { setUser } from './features/auth/currentUserSlice';
import { jwtDecode } from 'jwt-decode';
import { userInfo } from './features/auth/authTypes'; 

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getCookie('token'); 
    if (token) {
      try {
        const decoded: userInfo = jwtDecode(token);
        dispatch(setUser(decoded)); 
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, [dispatch]);

  return (
    <RouterProvider router={router} />
  );
}
export default function AppWithProvider() {
  return (
    <Provider store={store}> 
      <App />
    </Provider>
  );
}