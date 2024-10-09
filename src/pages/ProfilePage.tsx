// src/pages/ProfilePage.tsx

import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  fetchCurrentUser,
  updateUser,
  deleteUser,
  logoutUser,
} from '../actions/userActions';
import { useNavigate } from 'react-router-dom';
import styles from './ProfilePage.module.css';

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useAppSelector((state) => state.user);
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (!user) {
      dispatch(fetchCurrentUser());
    } else {
      setUsername(user.username);
    }
  }, [user, dispatch]);

  const handleUpdate = () => {
    if (user) {
      dispatch(updateUser({ ...user, username }));
    }
  };

  const handleDelete = () => {
    dispatch(deleteUser());
    navigate('/');
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please log in.</div>;

  return (
    <div className={styles.container}>
      <h2>Profile</h2>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.inputGroup}>
        <label htmlFor="username">Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
        />
      </div>
      <button onClick={handleUpdate} className={styles.button}>
        Update Username
      </button>
      <button onClick={handleDelete} className={styles.deleteButton}>
        Delete Account
      </button>
      <button onClick={handleLogout} className={styles.logoutButton}>
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
