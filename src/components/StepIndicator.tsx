
import React from 'react';
import { CheckCircle, Circle, AlertCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

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
      return <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-davinci-teal" />;
    case 'active':
      return <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-davinci-lightGreen animate-pulse-subtle" />;
    case 'error':
      return <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500" />; // Changed to yellow for skipped steps
    default:
      return <Circle className="h-5 w-5 sm:h-6 sm:w-6 text-davinci-silver/50" />;
  }
};

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  const isMobile = useIsMobile();

  return (
    <div className="relative modern-card p-3 sm:p-4 h-full overflow-auto">
      <h2 className="text-base sm:text-lg font-semibold text-davinci-darkGray mb-3 sm:mb-4">Etapas do Processo</h2>
      <div className="step-indicator-line" />
      <ul className="space-y-3 sm:space-y-4">
        {steps.map((step, index) => (
          <li key={step.id} className="relative pl-7 sm:pl-8">
            <div className={cn(
              "absolute left-0 -mt-1",
              index < steps.length - 1 && "after:absolute after:top-6 after:left-2.5 sm:after:left-3 after:bottom-0 after:w-0.5 after:h-6 sm:after:h-8",
              index < steps.length - 1 && step.status === 'completed' ? "after:bg-davinci-teal" : "after:bg-gray-200"
            )}>
              <StepIcon status={step.status} />
            </div>
            <div className={cn(
              "pb-1 sm:pb-2 break-words",
              step.status === 'active' ? "text-davinci-darkGray" : "text-davinci-silver",
              step.status === 'completed' && "text-davinci-teal",
              step.status === 'error' && "text-yellow-500" // Changed to yellow for skipped steps
            )}>
              <h3 className="text-xs sm:text-sm font-medium">{step.title}</h3>
              <p className="mt-0.5 sm:mt-1 text-xs leading-tight">{step.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StepIndicator;
