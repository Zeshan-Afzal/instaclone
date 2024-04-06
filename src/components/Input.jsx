import React from "react";
import { forwardRef } from "react";
function Input({ type, label, name, placeholder, ...props }, ref) {
  return (
    <div className="flex flex-col  items-start">
      {label && (
        <label
          htmlFor="email"
          className="  mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        ref={ref}
        {...props}
      />
    </div>
  );
}

export default forwardRef(Input);
