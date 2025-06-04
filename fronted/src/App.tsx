import { RouterProvider } from 'react-router';
import router from './routes/Routes';
import './index.css';
import './App.css';
import { Provider } from 'react-redux';
import store from './app/store';

function App() {
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