
import { useState } from 'react';
import { StepStatus } from '@/components/StepIndicator';

export type Step = {
  id: string;
  title: string;
  description: string;
  status: StepStatus;
  component: React.ReactNode;
};

export const useStepManager = (initialSteps: Step[]) => {
  const [steps, setSteps] = useState<Step[]>(initialSteps);
  const [currentStep, setCurrentStep] = useState(0);

  // Function to handle next step navigation
  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      // Update current step status to completed
      const updatedSteps = [...steps];
      updatedSteps[currentStep] = {
        ...updatedSteps[currentStep],
        status: 'completed' as StepStatus
      };
      
      // Update next step status to active
      updatedSteps[currentStep + 1] = {
        ...updatedSteps[currentStep + 1],
        status: 'active' as StepStatus
      };
      
      // Move to next step
      setCurrentStep(currentStep + 1);
    }
  };

  // Function to handle skip step
  const handleSkipStep = () => {
    if (currentStep < steps.length - 1) {
      // Update current step status to pending
      const updatedSteps = [...steps];
      updatedSteps[currentStep] = {
        ...updatedSteps[currentStep],
        status: 'pending' as StepStatus
      };
      
      // Update next step status to active
      updatedSteps[currentStep + 1] = {
        ...updatedSteps[currentStep + 1],
        status: 'active' as StepStatus
      };
      
      // Move to next step
      setCurrentStep(currentStep + 1);
    }
  };

  // Function to handle back step
  const handleBackStep = () => {
    if (currentStep > 0) {
      // Update current step status to pending
      const updatedSteps = [...steps];
      updatedSteps[currentStep] = {
        ...updatedSteps[currentStep],
        status: 'pending' as StepStatus
      };
      
      // Update previous step status to active
      updatedSteps[currentStep - 1] = {
        ...updatedSteps[currentStep - 1],
        status: 'active' as StepStatus
      };
      
      // Move to previous step
      setCurrentStep(currentStep - 1);
    }
  };

  return {
    steps,
    currentStep,
    handleNextStep,
    handleSkipStep,
    handleBackStep
  };
};
