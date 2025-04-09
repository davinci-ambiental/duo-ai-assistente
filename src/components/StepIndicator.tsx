
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
      return <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-davinci-teal" />;
    case 'active':
      return <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-davinci-lightGreen animate-pulse-subtle" />;
    case 'error':
      return <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />;
    default:
      return <Circle className="h-4 w-4 sm:h-5 sm:w-5 text-davinci-silver/50" />;
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
    <div className="relative modern-card p-2 sm:p-3 md:p-4 h-full overflow-auto no-scrollbar">
      <h2 className="text-sm sm:text-base font-semibold text-davinci-darkGray mb-2 sm:mb-3 md:mb-4">Etapas do Processo</h2>
      <div className="step-indicator-line" />
      <ul className="space-y-2 sm:space-y-3 md:space-y-4">
        {allSteps.map((step, index) => (
          <li key={step.id} className="relative pl-6 sm:pl-7">
            <div className={cn(
              "absolute left-0 top-0",
              index < allSteps.length - 1 && "after:absolute after:top-5 sm:after:top-6 after:left-2 sm:after:left-2.5 after:bottom-0 after:w-0.5 after:h-6 sm:after:h-7 md:after:h-8",
              index < allSteps.length - 1 && step.status === 'completed' ? "after:bg-davinci-teal" : "after:bg-gray-200"
            )}>
              {index === allSteps.length - 1 && step.status !== 'active' && step.status !== 'completed' ? 
                <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-davinci-silver/50" /> : 
                <StepIcon status={step.status} />
              }
            </div>
            <div className={cn(
              "pb-1 sm:pb-2 break-words max-w-full",
              step.status === 'active' ? "text-davinci-darkGray" : "text-davinci-silver",
              step.status === 'completed' && "text-davinci-teal",
              step.status === 'error' && "text-yellow-500"
            )}>
              <h3 className="text-xs sm:text-sm font-medium line-clamp-1 break-anywhere">{step.title}</h3>
              <p className="mt-0.5 text-xs leading-tight line-clamp-2 break-anywhere">{step.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StepIndicator;
