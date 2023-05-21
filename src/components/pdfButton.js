import React, { useState, useRef } from 'react';

const PdfButton = ({ file, onRemove }) => {
  const handleRemove = () => {
    onRemove(file);
  };

  return (
    <div className="inline-flex items-center justify-center px-2 py-1 rounded-lg bg-red-500 bg-opacity-50 text-white">
      <p className="text-white">{file.name}</p>
      <button onClick={handleRemove} className="ml-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default PdfButton;