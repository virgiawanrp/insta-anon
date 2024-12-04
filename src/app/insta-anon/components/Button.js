"use client";

export default function SubmitButton({ isLoading }) {
    return (
      <button
        type="submit"
        className="ms-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg"
        disabled={isLoading}
      >
        {isLoading ? "Searching..." : "Search"}
      </button>
    );
  }
  