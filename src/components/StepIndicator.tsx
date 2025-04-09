
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
      return <CheckCircle className="h-6 w-6 text-davinci-teal" />;
    case 'active':
      return <Clock className="h-6 w-6 text-davinci-lightGreen animate-pulse-subtle" />;
    case 'error':
      return <AlertCircle className="h-6 w-6 text-red-500" />;
    default:
      return <Circle className="h-6 w-6 text-davinci-silver/50" />;
  }
};

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <div className="relative modern-card p-4">
      <h2 className="text-lg font-semibold text-davinci-darkGray mb-4">Etapas do Processo</h2>
      <div className="step-indicator-line" />
      <ul className="space-y-4">
        {steps.map((step, index) => (
          <li key={step.id} className="relative pl-8">
            <div className={cn(
              "absolute left-0 -mt-1",
              index < steps.length - 1 && "after:absolute after:top-6 after:left-3 after:bottom-0 after:w-0.5 after:h-8",
              index < steps.length - 1 && step.status === 'completed' ? "after:bg-davinci-teal" : "after:bg-gray-200"
            )}>
              <StepIcon status={step.status} />
            </div>
            <div className={cn(
              "pb-2",
              step.status === 'active' ? "text-davinci-darkGray" : "text-davinci-silver",
              step.status === 'completed' && "text-davinci-teal",
              step.status === 'error' && "text-red-500"
            )}>
              <h3 className="text-sm font-medium">{step.title}</h3>
              <p className="mt-1 text-xs">{step.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StepIndicator;
