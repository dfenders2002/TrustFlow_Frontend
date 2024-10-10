// src/pages/ProfilePage.tsx
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchCurrentUser } from '../actions/userActions';
import { useNavigate } from 'react-router-dom';
import styles from './ProfilePage.module.css';
import ProfileDetails from '../components/ProfileDetails';
import AdminSection from '../components/AdminSection';

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Selectors for user
  const { user, loading, error } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!user) {
      dispatch(fetchCurrentUser());
    }
  }, [user, dispatch]);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (!user) return <div className={styles.message}>Please log in.</div>;

  return (
    <div className={styles.container}>
      <h2>Profile</h2>
      {error && <p className={styles.error}>{error}</p>}
      <ProfileDetails user={user} />

      {/* Admin Section */}
      {user.role === 'ADMIN' && <AdminSection currentUserId={user.id} />}
    </div>
  );
};

export default ProfilePage;
