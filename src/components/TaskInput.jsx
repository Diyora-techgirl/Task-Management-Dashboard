import { useState } from 'react';

const TaskInput = ({ addTask }) => {
  const [newTask, setNewTask] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleAddTask = () => {
    if (newTask.trim() === "") return;
    const task = {
      id: Date.now(),
      title: newTask,
      description,
      priority,
      startDate,
      endDate,
      status: "To Do"
    };
    addTask(task);
    setNewTask("");
    setDescription("");
    setPriority("Low");
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className="mb-6 flex flex-col items-center">
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter task"
        className="p-3 w-2/5 bg-pastelMint border border-pastelBlue rounded-full shadow-lg"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task description"
        className="p-3 w-2/5 bg-pastelMint border border-pastelBlue rounded-lg mt-2"
      />
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="p-2 mt-2 border border-pastelBlue rounded-full"
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="p-2 mt-2 border border-pastelBlue rounded-full"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="mt-2 p-3 rounded-full bg-pastelPurple border shadow-lg"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button onClick={handleAddTask} className="mt-4 p-3 bg-pastelBlue text-white rounded-full shadow-lg">
        Add Task
      </button>
    </div>
  );
};

export default TaskInput;
