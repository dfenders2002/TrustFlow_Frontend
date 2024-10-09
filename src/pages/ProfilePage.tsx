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
import { toast } from 'react-toastify';

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

  const handleUpdate = async () => {
    if (user) {
      try {
        // Dispatch the updateUser thunk and unwrap the result
        await dispatch(updateUser({ ...user, username })).unwrap();
        // Show success toast
        toast.success('Username updated successfully!');
      } catch (err: any) {
        // Show error toast
        toast.error(err || 'Failed to update username.');
      }
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
          id="username"
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
