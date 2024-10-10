// src/components/TaskList.tsx
import React from 'react';
import { Task, Status } from '../domains/Task';
import styles from './TaskList.module.css';

interface TaskListProps {
  tasks: Task[];
  onComplete?: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onComplete, onDelete }) => {
  return (
    <ul className={styles.taskList}>
      {tasks.map((task) => (
        <li key={task.id} className={styles.taskItem}>
          <span>
            {task.description} - <strong>{task.priority}</strong>
          </span>
          <div>
            {task.status === Status.PENDING && onComplete && (
              <button onClick={() => onComplete(task.id)}>Complete</button>
            )}
            <button onClick={() => onDelete(task.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
