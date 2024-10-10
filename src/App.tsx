import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import { useAppSelector } from './hooks';
import RegisterPage from './pages/RegisterPage';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const App: React.FC = () => {
  const { user } = useAppSelector(state => state.user);

  return (
    <Router>
      <div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/profile" /> : <LoginPage />}
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/profile"
            element={user ? <ProfilePage /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
