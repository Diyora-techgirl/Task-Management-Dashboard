import { useState, useEffect } from 'react';
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { addTask, editTask as editTaskService, deleteTask as deleteTaskService, fetchTasks, calculateDays } from './Utils/taskServices';
import EditTaskModal from './components/editTaskModal';
import ProgressModal from './components/prograssModall'; 
import leaves from './assets/leafImage.png'
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [startDate, setStartDate] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("Low");
  const [taskDescription, setTaskDescription] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false); // State for ProgressModal
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null); // Track selected task for ProgressModal
  


  // Load tasks from JSON Server or local storage when the component mounts
  useEffect(() => {
    const loadTasks = async () => {
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
    };

    loadTasks();
  }, []);

  // Add a new task
  const handleAddTask = async () => {
    if (newTask.trim() === "" || !startDate || !deadline || !taskDescription) return;

    const newTaskObj = {
      title: newTask,
      startDate,
      deadline,
      priority,
      description: taskDescription,
    };

    const addedTask = await addTask(newTaskObj);
    setTasks([...tasks, addedTask]);
    setNewTask("");
    setStartDate("");
    setDeadline("");
    setTaskDescription("");
  };

  // Edit task
  const handleEditTask = async (task) => {
    await editTaskService(task.id, task);
    const updatedTasks = tasks.map((t) => (t.id === task.id ? task : t));
    setTasks(updatedTasks);
    setTaskToEdit(null);
    setIsEditModalOpen(false); // Close edit modal after saving
  };

  // Open edit modal
  const openEditModal = (task) => {
    setTaskToEdit(task);
    setIsEditModalOpen(true);
  };

  // Delete a task
  const handleDeleteTask = async (index) => {
    const taskToDelete = tasks[index];
    await deleteTaskService(taskToDelete.id);

    const updatedTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
    setTasks(updatedTasks);
  };

  // Open Progress Modal
  const openProgressModal = (task) => {
    setSelectedTask(task); // Set the selected task
    setIsProgressModalOpen(true); // Open the progress modal
  };

  // Handle progress update status
  const handleUpdateStatus = (status) => {
    const updatedTasks = tasks.map((task) =>
      task.id === selectedTask.id ? { ...task, status } : task
    );
    setTasks(updatedTasks);
    setIsProgressModalOpen(false); // Close the modal after updating
    setSelectedTask(null); // Reset selected task
  };

  return (
    <div className="min-h-screen bg-[url('./assets/autumn.jpg')] bg-cover bg-center p-10 relative overflow-hidden">
        <div className="leafContainer">
   <img src={leaves} className="leaf"/>
   <img src={leaves} className="leaf"/>
   <img src={leaves} className="leaf"/>
   <img src={leaves} className="leaf"/>
   <img src={leaves} className="leaf"/>
   <img src={leaves} className="leaf"/>
   <img src={leaves} className="leaf"/>
   <img src={leaves} className="leaf"/>
   <img src={leaves} className="leaf"/>
   <img src={leaves} className="leaf"/>
   <img src={leaves} className="leaf"/>
   <img src={leaves} className="leaf"/>
   <img src={leaves} className="leaf"/>
   <img src={leaves} className="leaf"/>
   <img src={leaves} className="leaf"/>
   <img src={leaves} className="leaf"/>
   <img src={leaves} className="leaf"/>
   <img src={leaves} className="leaf"/>
   <img src={leaves} className="leaf"/>
   <img src={leaves} className="leaf"/>
   <img src={leaves} className="leaf"/>
   <img src={leaves} className="leaf"/>
  </div>
      <div className="container mx-auto p-6 bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-lg transform transition-transform animate-rotate3d">
        <h1 className="text-4xl font-sixtyfour text-center mb-8 text-red-700 animate-bounce">Task Management Dashboard</h1>

        {/* Task Input */}
        <div className="mb-6 flex flex-col items-center">
          <div className="grid grid-rows-3 grid-cols-3 justify-center gap-3 mb-4">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter task title"
              className="p-3 w-[90%] bg-pastelMint border border-pastelBlue rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-pastelBlue transition-transform transform hover:scale-105"
            />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="p-3 rounded-full  bg-pastelYellow border shadow-lg focus:ring-2 focus:ring-pastelPink"
            />
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="p-3 rounded-full bg-pastelPurple border shadow-lg focus:ring-2 focus:ring-pastelPink"
            />
            <input
              type="text"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              placeholder="Enter task description"
              className="p-3 w-[90%] bg-pastelMint border border-pastelBlue rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-pastelBlue transition-transform transform hover:scale-105"
            />
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="p-3 rounded-full bg-pastelPurple border shadow-lg focus:ring-2 focus:ring-pastelPink"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <button onClick={handleAddTask} className="p-3 bg-pastelBlue text-black rounded-full shadow-lg hover:bg-pastelMint transform transition-transform hover:scale-105">
            Add Task
          </button>
          </div>
          
        </div>

        {/* Task Lists */}
        <div className="grid grid-cols-3 gap-6">
          {tasks.map((task, index) => (
            <TaskList
              key={task.id}
              task={task}
              editTask={() => openEditModal(task)}
              deleteTask={() => handleDeleteTask(index)}
              openProgressModal={() => openProgressModal(task)} // Open progress modal on title click
              calculateDays={calculateDays}
            />
          ))}
        </div>

        {/* Edit Task Modal */}
        {isEditModalOpen && (
          <EditTaskModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            task={taskToEdit}
            onSave={handleEditTask}
          />
        )}

        {/* Progress Modal */}
        {isProgressModalOpen && (
          <ProgressModal
            isOpen={isProgressModalOpen}
            onClose={() => setIsProgressModalOpen(false)}
            startDate={selectedTask?.startDate}
            endDate={selectedTask?.deadline}
            onUpdateStatus={handleUpdateStatus}
          />
        )}
      </div>
    </div>
  );
}

// Task List Component
const TaskList = ({ task, editTask, deleteTask, openProgressModal, calculateDays }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-xl hover:shadow-2xl transform transition-shadow">
      <h2 onClick={openProgressModal} className="font-jua text-2xl mb-4 cursor-pointer">{task.title}</h2>
      <p className="text-sm text-pastelYellow">Days until Deadline: {calculateDays(task.deadline)}</p>
      <p className="text-sm text-gray-800">Description: {task.description}</p>
      <p className="text-sm text-pastelYellow">Priority: {task.priority}</p>
      <div className="mt-2">
        <button onClick={editTask} className="mr-2 p-2 bg-pastelMint rounded-full">
          <FiEdit2 className="text-black" />
        </button>
        <button onClick={deleteTask} className="p-2 bg-red-500 rounded-full">
          <FiTrash2 className="text-white" />
        </button>
      </div>
    </div>
  );
}

export default App;
