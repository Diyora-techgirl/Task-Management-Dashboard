const TASKS_KEY = 'tasks';

export const fetchTasks = async () => {
  try {
    const response = await fetch('http://localhost:3000/tasks');
    if (response.ok) {
      const tasks = await response.json();
      localStorage.setItem(TASKS_KEY, JSON.stringify(tasks)); // Save to local storage
      return tasks;
    } else {
      // Fallback to local storage if the fetch fails
      return JSON.parse(localStorage.getItem(TASKS_KEY)) || [];
    }
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return JSON.parse(localStorage.getItem(TASKS_KEY)) || [];
  }
};

export const addTask = async (task) => {
  try {
    const response = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const newTask = await response.json();
      // Update local storage with the new task
      const existingTasks = JSON.parse(localStorage.getItem(TASKS_KEY)) || [];
      localStorage.setItem(TASKS_KEY, JSON.stringify([...existingTasks, newTask]));
      return newTask;
    }
  } catch (error) {
    console.error('Error adding task:', error);
  }
};

export const editTask = async (id, updatedTask) => {
  try {
    const response = await fetch(`http://localhost:3001/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedTask),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const existingTasks = JSON.parse(localStorage.getItem(TASKS_KEY)) || [];
      const updatedTasks = existingTasks.map(task => (task.id === id ? updatedTask : task));
      localStorage.setItem(TASKS_KEY, JSON.stringify(updatedTasks));
      return updatedTask; // Return the updated task
    }
  } catch (error) {
    console.error('Error editing task:', error);
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      // Update local storage by removing the deleted task
      const existingTasks = JSON.parse(localStorage.getItem(TASKS_KEY)) || [];
      const updatedTasks = existingTasks.filter(task => task.id !== id);
      localStorage.setItem(TASKS_KEY, JSON.stringify(updatedTasks));
    }
  } catch (error) {
    console.error('Error deleting task:', error);
  }
};
export const calculateDays = (endDate) => {
  const start = new Date();
  const end = new Date(endDate);
  const timeDiff = end - start;
  return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
};