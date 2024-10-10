// src/pages/RegisterPage.tsx

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRegisterRequest } from '../domains/User';
import styles from './RegisterPage.module.css';
import { registerUser } from '../actions/userActions';
import { useAppDispatch, useAppSelector } from '../hooks';

const RegisterPage: React.FC = () => {
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
    const email = (e.currentTarget as any)['email'].value;
    const password = (e.currentTarget as any)['password'].value;
    const userData: UserRegisterRequest = { username, email, password };
    dispatch(registerUser(userData));
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Register</h2>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.inputGroup}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit" className={styles.button}>
          {loading ? 'Registering...' : 'Register'}
        </button>
        <button
          type="button"
          className={styles.loginButton}
          onClick={() => navigate('/')}
        >
          Already have an account? Login
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
