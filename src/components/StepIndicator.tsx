
import React from 'react';
import { CheckCircle, Circle, AlertCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export type StepStatus = 'pending' | 'active' | 'completed' | 'error';

type Step = {
  id: string;
  title: string;
  description: string;
  status: StepStatus;
};

type StepIndicatorProps = {
  steps: Step[];
  currentStep: number;
};

const StepIcon = ({ status }: { status: StepStatus }) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="h-8 w-8 text-pgrs-primary" />;
    case 'active':
      return <Clock className="h-8 w-8 text-pgrs-accent animate-pulse-subtle" />;
    case 'error':
      return <AlertCircle className="h-8 w-8 text-pgrs-error" />;
    default:
      return <Circle className="h-8 w-8 text-gray-300" />;
  }
};

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <div className="relative">
      <div className="step-indicator-line" />
      <ul className="space-y-6">
        {steps.map((step, index) => (
          <li key={step.id} className="relative pl-12">
            <div className={cn(
              "absolute left-0 -mt-1",
              index < steps.length - 1 && "after:absolute after:top-8 after:left-4 after:bottom-0 after:w-0.5 after:h-8",
              index < steps.length - 1 && step.status === 'completed' ? "after:bg-pgrs-primary" : "after:bg-gray-200"
            )}>
              <StepIcon status={step.status} />
            </div>
            <div className={cn(
              "pb-6",
              step.status === 'active' ? "text-gray-900" : "text-gray-500",
              step.status === 'completed' && "text-pgrs-primary",
              step.status === 'error' && "text-pgrs-error"
            )}>
              <h3 className="text-lg font-medium">{step.title}</h3>
              <p className="mt-1 text-sm">{step.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StepIndicator;
