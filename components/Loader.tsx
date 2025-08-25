import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 my-10">
      <div className="w-16 h-16 border-4 border-t-4 border-[var(--color-border)] border-t-[var(--color-primary)] rounded-full animate-spin shadow-[0_0_15px_var(--color-glow-primary)]"></div>
      <p className="text-[var(--color-primary-light)] font-semibold tracking-wider">Generating Your Future...</p>
    </div>
  );
};

export default Loader;
