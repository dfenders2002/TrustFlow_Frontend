// src/components/AdminSection.tsx
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchAllUsers } from '../actions/adminActions';
import styles from './AdminSection.module.css';
import UserTable from './UserTable';

interface AdminSectionProps {
  currentUserId: number;
}

const AdminSection: React.FC<AdminSectionProps> = ({ currentUserId }) => {
  const dispatch = useAppDispatch();

  const { allUsers, loading, error } = useAppSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <div className={styles.adminSection}>
      <h3>All Users</h3>
      {loading && <div>Loading users...</div>}
      {error && <p className={styles.error}>{error}</p>}
      {!loading && allUsers.length > 0 && (
        <UserTable users={allUsers} currentUserId={currentUserId} />
      )}
      {!loading && allUsers.length === 0 && <p>No Users Found.</p>}
    </div>
  );
};

export default AdminSection;
