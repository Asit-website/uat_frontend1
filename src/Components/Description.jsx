import React from "react";
import ccc from "./images/ccc.png";

export const DescriptionModal = ({ data = {}, title = "Details", onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-3xl w-full">
        <nav className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-semibold text-gray-900">{title}</h2>
          <img
            onClick={onClose}
            className="cursor-pointer w-8 h-8"
            src={ccc}
            alt="Close"
          />
        </nav>

        <div className="space-y-3">
          {Object.entries(data).map(([key, value]) => (
            <div key={key}>
              <h1 className="text-base font-semibold text-gray-800 capitalize">
                {key.replace(/([A-Z])/g, " $1")}:
                <span className="font-normal text-gray-600 ml-2">{value || "-"}</span>
              </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
