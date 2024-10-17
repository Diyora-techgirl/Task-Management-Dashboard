import React, { useState, useEffect } from 'react';

const ProgressModal = ({ isOpen, onClose, startDate, endDate, checkedDays: initialCheckedDays, onSaveProgress, onUpdateStatus }) => {
  if (!isOpen) return null;

  // Calculate the number of days between the start and end dates
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = [];

  // Create an array of days between start and end dates
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    days.push(new Date(d).toISOString().split('T')[0]); // Store the date as a string
  }

  // Use the initial checkedDays passed from the parent or initialize a new array
  const [checkedDays, setCheckedDays] = useState(initialCheckedDays || Array(days.length).fill(false)); // Ensure it's an array of the same length as days

  useEffect(() => {
    // Initialize checkedDays state from props when the component mounts
    if (initialCheckedDays && Array.isArray(initialCheckedDays)) {
      setCheckedDays(initialCheckedDays);
    }
  }, [initialCheckedDays]);

  const handleCheckboxChange = (index) => {
    const newCheckedDays = [...checkedDays];
    newCheckedDays[index] = !newCheckedDays[index]; // Toggle the checked state
    setCheckedDays(newCheckedDays);
  };

  const handleSubmit = () => {
    // Determine the status based on checked boxes
    const allChecked = checkedDays.every(checked => checked);
    const anyChecked = checkedDays.some(checked => checked);

    if (allChecked) {
      onUpdateStatus('Completed');
    } else if (anyChecked) {
      onUpdateStatus('In Progress');
    } else {
      onUpdateStatus('To Do');
    }

    // Save the checked days in the parent component
    onSaveProgress(checkedDays);
    onClose();
  };

  return (
    <div className={`fixed inset-0 flex flex-wrap items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      <div className="bg-white w-[90%] h-[400px] p-10 rounded-lg shadow-lg transform transition-transform duration-300 scale-100 animate-fadeIn overflow-y-scroll">
        <h2 className="text-xl font-semibold mb-4 text-pastelBlue">Select Days for Progress</h2>
        <div className="flex flex-wrap gap-3">
          {days.map((day, index) => (
            <div key={index} className="flex items-center mb-2 text-sm p-2 bg-yellow-500 border-l-2 border-r-2 border-yellow-500">
              <input
                type="checkbox"
                checked={checkedDays[index] || false} // Ensure it checks against a boolean value
                onChange={() => handleCheckboxChange(index)}
                className="mr-2 h-4 w-4"
              />
              <label className="text-gray-700">{day}</label>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <button 
            onClick={handleSubmit} 
            className="bg-green-500 text-white rounded px-4 py-2 hover:bg-green-600 transition duration-300"
          >
            Save
          </button>
          <button 
            onClick={onClose} 
            className="bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600 transition duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgressModal;
