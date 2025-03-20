import { useState } from "react";
import { CheckCircle, Clock, UserPlus, Bell } from "lucide-react";
import { FaFileAlt } from "react-icons/fa";

export default function ViewTask({ src, onClick, data }) {
  const [isCompleted, setIsCompleted] = useState(false);
  
  return (
    <div className="">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold bg-green-200 text-green-800 px-5 py-2 rounded-full">Task</span>
          <span className="text-blue-600 text-sm font-medium">{data?.Status}</span>
        </div>
        <img
          src={src}
          onClick={onClick}
          alt="Task Icon"
          className="w-10 h-10 cursor-pointer rounded-full border hover:shadow-md transition"
        />
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-900">{data?.Title || "Untitled Task"}</h2>

      {/* Task Details */}
      <div className="mt-3 text-sm text-gray-600">
        <p>Created at: {data?.CreatedAt || "2025-02-20 16:39:07"}</p>
      </div>

      {/* File Link */}
      {data?.taskfile && (
        <a
          href={data?.taskfile}
          className="flex items-center gap-2 text-blue-500 hover:text-blue-700 mt-4 transition"
        >
          <FaFileAlt className="h-5 w-5 text-gray-600" />
          <span className="text-sm font-medium">Download file</span>
        </a>
      )}

      {/* Description */}
      <div className="mt-6 border-t pt-4">
        <h3 className="text-lg font-semibold text-gray-900">Description</h3>
        <p className="text-gray-700 mt-2 text-sm">{data?.Description || "No description available."}</p>
      </div>

      {/* Task Info */}
      <div className="mt-6 border-t pt-4">
        <h3 className="text-lg font-semibold text-gray-900">Task Info</h3>
        <div className="text-sm text-gray-600 space-y-1 mt-2">
          <p>Start Date: {data?.StartDate || "N/A"}</p>
          <p>Due Date: {data?.DueDate || "N/A"}</p>
          <p>
            Priority: <span className="text-yellow-500 font-medium">Medium</span>
          </p>
        </div>
      </div>

      {/* Task Members */}
      {data?.Members?.length > 0 && (
        <div className="mt-6 border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-900">Assigned Members</h3>
          <div className="flex flex-wrap gap-4 mt-3">
            {data.Members.map((member, index) => (
              <div key={index} className="flex items-center gap-3 bg-gray-100 p-2 rounded-lg">
                <img
                  src={member.profileImage ? member?.profileImage:"https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png"}
                  alt={member.fullName}
                  className="w-10 h-10 rounded-full border"
                />
                <p className="text-sm text-gray-700 font-medium">{member.fullName}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}