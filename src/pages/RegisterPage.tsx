// src/pages/RegisterPage.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../api/authService';
import { AuthResponse, User, UserRegisterRequest } from '../domains/User';
import styles from './RegisterPage.module.css';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const newUser: UserRegisterRequest = { username, password, email };
    const response: AuthResponse = await authService.register(newUser);

    if ('user' in response && response.status === 'User registered') {
      navigate('/');
    } else {
      setError(response.message || 'Registration failed');
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleRegister}>
        <h2>Register</h2>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.inputGroup}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.button}>
          Register
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
