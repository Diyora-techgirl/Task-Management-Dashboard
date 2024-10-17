import React, { useState } from 'react';
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import ProgressModal from './ProgressModal'; 

const TaskList = ({ task, editTask, deleteTask, calculateDays, updateTaskProgress }) => {
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);

  const handleOpenProgressModal = () => {
    setIsProgressModalOpen(true);
  };

  const handleSaveProgress = (updatedCheckedDays) => {
    // Call the parent function to save the progress (checked days) for this task
    updateTaskProgress(task.id, updatedCheckedDays);
  };

  return (
    <div className="p-6 bg-gray-800 bg-[url('./assets/ramka.jpg')] bg-cover bg-center rounded-lg shadow-xl hover:shadow-2xl transform transition-shadow">
      <h2 className="font-[Sixtyfour Convergence] text-2xl mb-4 cursor-pointer text-white" onClick={handleOpenProgressModal}>
        {task.title}
      </h2>
      <p className="text-sm text-stone-700">Days until Deadline: {calculateDays(task.deadline)}</p>
      <p className="text-sm text-rose-950">Description: {task.description}</p>
      <p className="text-sm text-orange-700">Priority: {task.priority}</p>
      <div className="flex justify-between mt-4">
        <button onClick={editTask} className="p-8 bg-green-700 rounded-full text-white">
          <FiEdit2 className="text-white" />
        </button>
        <button onClick={deleteTask} className="p-4 bg-red-700 rounded-full text-white">
          <FiTrash2 className="text-white" />
        </button>
      </div>

      {/* Progress Modal */}
      <ProgressModal
        isOpen={isProgressModalOpen}
        onClose={() => setIsProgressModalOpen(false)}
        startDate={task.startDate}
        endDate={task.deadline}
        checkedDays={task.checkedDays || []} // Pass the current checked days from the task
        onSaveProgress={handleSaveProgress} // Save progress in parent
      />
    </div>
  );
};

export default TaskList;
