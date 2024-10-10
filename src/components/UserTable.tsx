// src/components/UserTable.tsx
import React from 'react';
import { useAppDispatch } from '../hooks';
import { deleteUserById } from '../actions/adminActions';
import styles from './UserTable.module.css';
import { toast } from 'react-toastify';
import { User } from '../domains/User';

interface UserTableProps {
  users: User[];
  currentUserId: number;
}

const UserTable: React.FC<UserTableProps> = ({ users, currentUserId }) => {
  const dispatch = useAppDispatch();

  const handleDeleteOtherUser = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await dispatch(deleteUserById(id)).unwrap();
        toast.success('User deleted successfully!');
      } catch (err: any) {
        toast.error(err || 'Deleting user failed.');
      }
    }
  };

  return (
    <table className={styles.userTable}>
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Role</th>
          <th>Acties</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u.id}>
            <td>{u.username}</td>
            <td>{u.email}</td>
            <td>{u.role}</td>
            <td>
              {u.id !== currentUserId && (
                <button
                  onClick={() => handleDeleteOtherUser(u.id!)}
                  className={styles.deleteButton}
                >
                  Delete
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
