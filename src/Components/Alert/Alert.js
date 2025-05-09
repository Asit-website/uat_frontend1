import React from "react";

const Alert = (props) => {
  const isError = props.color === "error";

  return (
    <div
      id={isError ? "alert-border-2" : "alert-border-3"}
      className={`p-4 mb-4 text-sm w-full mt-5 content-center flex 
        ${isError ? 'text-red-700 bg-red-100 border-red-500' : 'text-green-700 bg-green-100 border-green-500'}
        dark:bg-gray-800 border-t-4 dark:text-blue-400
        absolute left-1/2 transform -translate-x-1/2 top-0 sm:w-1/2 z-[9999]`}
      role="alert"
    >
      <svg
        className="flex-shrink-0 w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        ></path>
      </svg>

      <div className="ml-3 text-sm font-medium main_message">
        {props.message}
      </div>

      <button
        type="button"
        onClick={props.closeAlert}
        className={`ml-auto -mx-1.5 -my-1.5 p-1.5 inline-flex h-8 w-8 
          ${isError ? 'bg-red-100 text-red-500 hover:bg-red-200 focus:ring-red-400' 
                    : 'bg-green-100 text-green-500 hover:bg-green-200 focus:ring-green-400'}
          rounded-lg focus:ring-2 dark:bg-gray-800 dark:hover:bg-gray-700`}
        data-dismiss-target={isError ? "#alert-border-2" : "#alert-border-3"}
        aria-label="Close"
      >
        <span className="sr-only">Dismiss</span>
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default Alert;