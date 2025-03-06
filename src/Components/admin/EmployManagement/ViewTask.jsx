import { useState } from "react";
import { CheckCircle, Clock, UserPlus, Bell } from "lucide-react";
import cut from "../../images/cutt.png";



export default function ViewTask({src,onClick,data}) {
  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <div className="">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm bg-green-200 text-green-800 px-3 py-1 rounded-full">Task</span>
          <span className="text-blue-600 text-sm">In Progress</span>
        </div>
        <img src={src} onClick={onClick} alt="Task Icon" className="w-6 h-6 cursor-pointer" />
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-900">{data.Title}</h2>
      <p className="text-gray-500 text-sm mt-1">
        Private Task - <span className="text-blue-500 cursor-pointer">Make public</span>
      </p>

      {/* Task Details */}
      <div className="mt-4 space-y-1 text-sm text-gray-600">
        <p>Created at: {data.CreatedAt || "2025-02-20 16:39:07"}</p>
        <p>
          Related: <span className="text-blue-500 cursor-pointer">#14 - Develop Space Rocket - Acme</span>
        </p>
      </div>

      {/* Buttons */}
      <div className="mt-4 flex gap-3">
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${isCompleted ? "bg-green-500 text-white" : "border-gray-300 text-gray-600"} transition-all`}
          onClick={() => setIsCompleted(!isCompleted)}
        >
          <CheckCircle className={`w-5 h-5 ${isCompleted ? "text-white" : "text-gray-400"}`} />
          {isCompleted ? "Completed" : "Mark Complete"}
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-600">
          <Clock className="w-5 h-5" /> Start Timer
        </button>
      </div>

      {/* Description */}
      <div className="mt-6 border-t pt-4">
        <h3 className="text-lg font-semibold text-gray-900">Description</h3>
        <p className="text-gray-700 mt-2">{data?.Description || "No description available."}</p>
      </div>

      {/* Task Info */}
      <div className="mt-6 border-t pt-4">
        <h3 className="text-lg font-semibold text-gray-900">Task Info</h3>
        <div className="text-sm text-gray-600 space-y-1 mt-2">
          <p>Start Date: {data.StartDate || "N/A"}</p>
          <p>Due Date: {data.DueDate || "N/A"}</p>
          <p>
            Priority: <span className="text-yellow-500">Medium</span>
          </p>
          <p>Your logged time: 03:03</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 border-t pt-4 flex justify-between">
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-600">
          <UserPlus className="w-5 h-5" /> Assign Task
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-600">
          <Bell className="w-5 h-5" /> Set Reminder
        </button>
      </div>
    </div>
  );
}