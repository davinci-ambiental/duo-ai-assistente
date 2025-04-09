
import React from 'react';
import { CheckCircle, Circle, AlertCircle, Clock, FileText } from 'lucide-react';
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
  totalSteps?: number;
};

const StepIcon = ({ status }: { status: StepStatus }) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-davinci-teal" />;
    case 'active':
      return <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-davinci-lightGreen animate-pulse-subtle" />;
    case 'error':
      return <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500" />;
    default:
      return <Circle className="h-5 w-5 sm:h-6 sm:w-6 text-davinci-silver/50" />;
  }
};

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep, totalSteps }) => {
  const isMobile = useIsMobile();
  
  // Create a summary step object
  const summaryStep = {
    id: 'summary',
    title: 'Resumo',
    description: 'Revisão e envio dos dados',
    status: currentStep === steps.length ? 'active' : (currentStep > steps.length ? 'completed' : 'pending') as StepStatus
  };
  
  // Combine regular steps with summary step
  const allSteps = [...steps, summaryStep];

  return (
    <div className="relative modern-card p-3 sm:p-4 h-full overflow-auto">
      <h2 className="text-base sm:text-lg font-semibold text-davinci-darkGray mb-3 sm:mb-4">Etapas do Processo</h2>
      <div className="step-indicator-line" />
      <ul className="space-y-3 sm:space-y-4">
        {allSteps.map((step, index) => (
          <li key={step.id} className="relative pl-7 sm:pl-8">
            <div className={cn(
              "absolute left-0 -mt-1",
              index < allSteps.length - 1 && "after:absolute after:top-6 after:left-2.5 sm:after:left-3 after:bottom-0 after:w-0.5 after:h-6 sm:after:h-8",
              index < allSteps.length - 1 && step.status === 'completed' ? "after:bg-davinci-teal" : "after:bg-gray-200"
            )}>
              {index === allSteps.length - 1 && step.status !== 'active' && step.status !== 'completed' ? 
                <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-davinci-silver/50" /> : 
                <StepIcon status={step.status} />
              }
            </div>
            <div className={cn(
              "pb-1 sm:pb-2 break-words max-w-full",
              step.status === 'active' ? "text-davinci-darkGray" : "text-davinci-silver",
              step.status === 'completed' && "text-davinci-teal",
              step.status === 'error' && "text-yellow-500"
            )}>
              <h3 className="text-xs sm:text-sm font-medium truncate">{step.title}</h3>
              <p className="mt-0.5 sm:mt-1 text-xs leading-tight line-clamp-2">{step.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StepIndicator;
