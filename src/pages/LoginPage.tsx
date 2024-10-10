// src/pages/LoginPage.tsx

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserLoginRequest } from '../domains/User';
import styles from './LoginPage.module.css';
import { loginUser } from '../actions/userActions';
import { useAppDispatch, useAppSelector } from '../hooks';

const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, error, loading } = useAppSelector(state => state.user);

  useEffect(() => {
    if (user) {
      navigate('/profile');
    }
  }, [user, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const username = (e.currentTarget as any)['username'].value;
    const password = (e.currentTarget as any)['password'].value;
    const userData: UserLoginRequest = { username, password };
    dispatch(loginUser(userData));
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.inputGroup}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit" className={styles.button}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <button
          type="button"
          className={styles.registerButton}
          onClick={() => navigate('/register')}
        >
          No account? Register
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
