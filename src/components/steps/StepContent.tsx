
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
  planType = 'PGRS'
}) => {
  return (
    <div className="modern-card p-4 md:p-6 w-full overflow-auto">
      {isLastStep ? (
        <SummaryPanel planType={planType} />
      ) : (
        children
      )}
    </div>
  );
};

export default StepContent;
