import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';  // Import your TaskList component
import { fetchTasks, saveTasks, deleteTask } from '../Utils/taskServices';  // Adjust the import path as needed

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the JSON server or local storage
  useEffect(() => {
    const loadTasks = async () => {
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
    };
    loadTasks();
  }, []);

  // Update task progress and save to local storage and JSON server
  const updateTaskProgress = (taskId, updatedCheckedDays) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, checkedDays: updatedCheckedDays } : task
      )
    );

    // Save the updated tasks to local storage and JSON server
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, checkedDays: updatedCheckedDays } : task
    );
    saveTasks(updatedTasks); // Call the save function to persist changes
  };

  const handleDeleteTask = async (taskId) => {
    await deleteTask(taskId); // Delete from JSON server
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId)); // Remove from local state
  };

  return (
    <div>
      {tasks.map(task => (
        <TaskList
          key={task.id}
          task={task}
          editTask={() => console.log('Edit task', task.id)}  // Implement edit functionality
          deleteTask={() => handleDeleteTask(task.id)}  // Handle delete task
          calculateDays={(endDate) => {
            const today = new Date();
            const end = new Date(endDate);
            const daysLeft = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
            return daysLeft >= 0 ? daysLeft : 0;
          }}
          updateTaskProgress={updateTaskProgress}  // Pass the update function to TaskList
        />
      ))}
    </div>
  );
};

export default TaskManager;
