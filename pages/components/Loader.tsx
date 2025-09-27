import React from 'react';

interface LoaderProps {
  loading: string;
}

const Loader: React.FC<LoaderProps> = ({ loading }) => {
  return (
    <div
      className="flex justify-center items-center h-64"
      aria-live="polite"
      aria-busy="true"
    >
      <span className="loading loading-spinner loading-lg"></span>
      <span className="sr-only">{loading}</span>
    </div>
  );
};

export default Loader;