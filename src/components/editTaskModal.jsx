import React, { useState } from 'react';

const EditTaskModal = ({ isOpen, onClose, task, onSave }) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [priority, setPriority] = useState(task?.priority || "Low");
  const [startDate, setStartDate] = useState(task?.startDate || "");
  const [deadline, setDeadline] = useState(task?.deadline || "");

  const handleSave = () => {
    const updatedTask = { ...task, title, description, priority, startDate, deadline };
    onSave(updatedTask);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white bg-opacity-10 backdrop-blur-md border border-gray-200 rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-2xl font-semibold text-white mb-4">Edit Task</h2>
        
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
          className="p-2 rounded-lg w-full bg-white bg-opacity-20 text-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition mb-4"
        />
        
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
          className="p-2 rounded-lg w-full bg-white bg-opacity-20 text-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition mb-4"
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="p-2 rounded-lg w-full bg-white bg-opacity-20 text-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition mb-4"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-2 rounded-lg w-full bg-white bg-opacity-20 text-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition mb-4"
        />
        
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="p-2 rounded-lg w-full bg-white bg-opacity-20 text-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition mb-4"
        />

        <div className="flex justify-between">
          <button
            onClick={handleSave}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
