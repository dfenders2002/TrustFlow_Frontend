// src/components/TaskCreate.tsx
import React, { useState } from 'react';
import { Priority, CreateTaskRequest } from '../domains/Task';
import styles from './TaskCreate.module.css';

interface TaskCreateProps {
  onCreate: (taskData: CreateTaskRequest) => void;
}

const TaskCreate: React.FC<TaskCreateProps> = ({ onCreate }) => {
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>(Priority.MEDIUM);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      onCreate({ description, priority });
      setDescription('');
      setPriority(Priority.MEDIUM);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.taskCreateForm}>
      <input
        type="text"
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Task description"
        required
      />
      <select
        value={priority}
        onChange={e => setPriority(e.target.value as Priority)}
      >
        <option value={Priority.LOW}>Low</option>
        <option value={Priority.MEDIUM}>Medium</option>
        <option value={Priority.HIGH}>High</option>
      </select>
      <button type="submit">Create Task</button>
    </form>
  );
};

export default TaskCreate;
