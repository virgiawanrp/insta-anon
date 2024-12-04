"use client";

import { useState } from "react";
import SubmitButton from "./Button";

export default function SearchBar({ onSearch }) {
    const [loading, setLoading] = useState(false);
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const query = event.target.elements.query.value.trim();
  
      if (!query) {
        alert("Please enter a username or user ID.");
        return;
      }
  
      onSearch(query); // Kirimkan input ke parent untuk diproses lebih lanjut
    };
      
  return (
    <form
      className="flex items-center max-w-lg mx-auto"
      onSubmit={handleSubmit}
      noValidate
    >
      <label htmlFor="query-search" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-gray-500"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="query-search"
          name="query"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="username or userId"
          required
        />
      </div>
      <SubmitButton isLoading={loading} />
    </form>
  );
}
