// src/pages/ProfilePage.tsx
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchCurrentUser } from '../actions/userActions';
import { useNavigate } from 'react-router-dom';
import styles from './ProfilePage.module.css';
import ProfileDetails from '../components/ProfileDetails';
import AdminSection from '../components/AdminSection';
import TaskCreate from '../components/TaskCreate';
import TaskList from '../components/TaskList';
import {
  fetchPendingTasks,
  fetchCompletedTasks,
  createTask,
  completeTask,
  deleteTask,
} from '../actions/taskActions';
import { Priority } from '../domains/Task';

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Selectors for user
  const { user, loading, error } = useAppSelector(state => state.user);

  // Selectors for tasks
  const {
    pending,
    completed,
    loading: tasksLoading,
    error: tasksError,
  } = useAppSelector(state => state.tasks);

  useEffect(() => {
    if (!user) {
      dispatch(fetchCurrentUser());
    } else {
      // Fetch tasks if user is logged in and not an admin
      if (user.role !== 'ADMIN') {
        dispatch(fetchPendingTasks());
        dispatch(fetchCompletedTasks());
      }
    }
  }, [user, dispatch]);

  const handleCreateTask = (taskData: {
    description: string;
    priority: Priority;
  }) => {
    dispatch(createTask(taskData));
  };

  const handleCompleteTask = (id: number) => {
    dispatch(completeTask(id));
  };

  const handleDeleteTask = (id: number) => {
    dispatch(deleteTask(id));
  };

  if (loading || tasksLoading)
    return <div className={styles.loading}>Loading...</div>;
  if (!user) return <div className={styles.message}>Please log in.</div>;

  return (
    <div className={styles.container}>
      <h2>Profile</h2>
      {error && <p className={styles.error}>{error}</p>}
      <ProfileDetails user={user} />

      {/* Admin Section */}
      {user.role === 'ADMIN' && <AdminSection currentUserId={user.id} />}

      {/* User Task Section */}
      {user.role !== 'ADMIN' && (
        <div className={styles.taskSection}>
          <h3>Your Tasks</h3>
          <TaskCreate onCreate={handleCreateTask} />
          {tasksError && <p className={styles.error}>{tasksError}</p>}

          <h4>Pending Tasks</h4>
          <TaskList
            tasks={pending}
            onComplete={handleCompleteTask}
            onDelete={handleDeleteTask}
          />

          <h4>Completed Tasks</h4>
          <TaskList tasks={completed} onDelete={handleDeleteTask} />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
