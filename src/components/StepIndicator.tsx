
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
      return <CheckCircle className="h-8 w-8 text-davinci-teal" />;
    case 'active':
      return <Clock className="h-8 w-8 text-davinci-lightGreen animate-pulse-subtle" />;
    case 'error':
      return <AlertCircle className="h-8 w-8 text-red-500" />;
    default:
      return <Circle className="h-8 w-8 text-davinci-silver/50" />;
  }
};

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <div className="relative modern-card p-6">
      <h2 className="text-xl font-semibold text-davinci-darkGray mb-6">Etapas do Processo</h2>
      <div className="step-indicator-line" />
      <ul className="space-y-8">
        {steps.map((step, index) => (
          <li key={step.id} className="relative pl-12">
            <div className={cn(
              "absolute left-0 -mt-1",
              index < steps.length - 1 && "after:absolute after:top-8 after:left-4 after:bottom-0 after:w-0.5 after:h-12",
              index < steps.length - 1 && step.status === 'completed' ? "after:bg-davinci-teal" : "after:bg-gray-200"
            )}>
              <StepIcon status={step.status} />
            </div>
            <div className={cn(
              "pb-6",
              step.status === 'active' ? "text-davinci-darkGray" : "text-davinci-silver",
              step.status === 'completed' && "text-davinci-teal",
              step.status === 'error' && "text-red-500"
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
