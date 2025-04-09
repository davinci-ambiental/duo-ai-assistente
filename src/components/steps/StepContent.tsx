
import React from 'react';
import SummaryPanel from '@/components/summary/SummaryPanel';
import { PlanType } from '@/types/plans';

type StepContentProps = {
  children: React.ReactNode;
  isLastStep?: boolean;
  currentStep?: number;
  totalSteps?: number;
  planType?: PlanType;
};

const StepContent: React.FC<StepContentProps> = ({ 
  children, 
  isLastStep = false, 
  currentStep,
  totalSteps,
  planType = 'PGRS'
}) => {
  return (
    <div className="modern-card p-3 sm:p-4 md:p-5 w-full max-h-[calc(100vh-180px)] sm:max-h-[calc(100vh-200px)] overflow-auto no-scrollbar">
      {isLastStep ? (
        <SummaryPanel planType={planType} />
      ) : (
        <div className="w-full break-words">
          {children}
        </div>
      )}
    </div>
  );
};

export default StepContent;
