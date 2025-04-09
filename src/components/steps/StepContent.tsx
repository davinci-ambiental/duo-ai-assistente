
import React from 'react';

type StepContentProps = {
  children: React.ReactNode;
};

const StepContent: React.FC<StepContentProps> = ({ children }) => {
  return (
    <div className="modern-card p-6">
      {children}
    </div>
  );
};

export default StepContent;
