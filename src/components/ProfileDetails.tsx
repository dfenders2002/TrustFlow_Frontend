// src/components/ProfileDetails.tsx
import React, { useState } from 'react';
import { useAppDispatch } from '../hooks';
import {
  updateUser,
  deleteUser as deleteOwnUser,
  logoutUser,
} from '../actions/userActions';
import { useNavigate } from 'react-router-dom';
import styles from './ProfileDetails.module.css';
import { toast } from 'react-toastify';
import { User } from '../domains/User';

interface ProfileDetailsProps {
  user: User;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ user }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState(user.username);

  const handleUpdate = async () => {
    try {
      await dispatch(updateUser({ ...user, username })).unwrap();
      toast.success('Username updated successfully!');
    } catch (err: any) {
      toast.error(err || 'Failed to update username.');
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      dispatch(deleteOwnUser());
      navigate('/');
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <div className={styles.profileDetails}>
      <div className={styles.inputGroup}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className={styles.input}
        />
      </div>
      <div className={styles.buttonGroup}>
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
    </div>
  );
};

export default ProfileDetails;
