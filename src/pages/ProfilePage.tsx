import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  fetchCurrentUser,
  updateUser,
  deleteUser as deleteOwnUser,
  logoutUser,
} from '../actions/userActions';
import { fetchAllUsers, deleteUserById } from '../actions/adminActions'; // Import admin acties
import { useNavigate } from 'react-router-dom';
import styles from './ProfilePage.module.css';
import { toast } from 'react-toastify';
import { UsersResponse } from '../domains/User';
const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Selectors voor user
  const { user, loading, error } = useAppSelector((state) => state.user);

  // Selectors voor admin
  const {
    allUsers,
    loading: adminLoading,
    error: adminError,
  } = useAppSelector((state) => state.admin);

  const [username, setUsername] = useState('');

  useEffect(() => {
    if (!user) {
      dispatch(fetchCurrentUser());
    } else {
      setUsername(user.username);
      // Als de gebruiker een admin is, haal alle gebruikers op
      if (user.role === 'ADMIN') {
        dispatch(fetchAllUsers());
      }
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
    dispatch(deleteOwnUser());
    navigate('/');
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  // Handler om een andere gebruiker te verwijderen
  const handleDeleteOtherUser = async (id: number) => {
    if (
      window.confirm('Weet je zeker dat je deze gebruiker wilt verwijderen?')
    ) {
      try {
        await dispatch(deleteUserById(id)).unwrap();
        toast.success('Gebruiker succesvol verwijderd!');
      } catch (err: any) {
        toast.error(err || 'Verwijderen mislukt.');
      }
    }
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

      {/* Admin-sectie */}
      {user.role === 'ADMIN' && (
        <div className={styles.adminSection}>
          <h3>Alle Gebruikers</h3>
          {adminLoading && <div>Loading users...</div>}
          {adminError && <p className={styles.error}>{adminError}</p>}
          {!adminLoading && allUsers.length > 0 && (
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
                {allUsers.map((u) => (
                  <tr key={u.id}>
                    <td>{u.username}</td>
                    <td>{u.email}</td>
                    <td>{u.role}</td>
                    <td>
                      {u.id !== user.id && ( // Zorg ervoor dat admin zichzelf niet kan verwijderen via deze tabel
                        <button
                          onClick={() => handleDeleteOtherUser(u.id!)}
                          className={styles.deleteButton}
                        >
                          Verwijderen
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {!adminLoading && allUsers.length === 0 && (
            <p>Geen gebruikers gevonden.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
