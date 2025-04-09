
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
      
      setSteps(updatedSteps);
      // Move to next step
      setCurrentStep(currentStep + 1);
    } else if (currentStep === steps.length - 1) {
      // If we're on the last step, move to the summary step
      const updatedSteps = [...steps];
      updatedSteps[currentStep] = {
        ...updatedSteps[currentStep],
        status: 'completed' as StepStatus
      };
      
      setSteps(updatedSteps);
      // Set to summary step (which is beyond the last step)
      setCurrentStep(steps.length);
    }
  };

  // Function to handle skip step
  const handleSkipStep = () => {
    if (currentStep < steps.length - 1) {
      // Update current step status to skipped (we'll use 'error' status for skipped)
      const updatedSteps = [...steps];
      updatedSteps[currentStep] = {
        ...updatedSteps[currentStep],
        status: 'error' as StepStatus // Using 'error' status for skipped steps
      };
      
      // Update next step status to active
      updatedSteps[currentStep + 1] = {
        ...updatedSteps[currentStep + 1],
        status: 'active' as StepStatus
      };
      
      setSteps(updatedSteps);
      // Move to next step
      setCurrentStep(currentStep + 1);
    }
  };

  // Function to handle back step
  const handleBackStep = () => {
    if (currentStep > 0 && currentStep <= steps.length) {
      // If we're on the summary step, just go back to the last content step
      if (currentStep === steps.length) {
        const updatedSteps = [...steps];
        updatedSteps[steps.length - 1] = {
          ...updatedSteps[steps.length - 1],
          status: 'active' as StepStatus
        };
        
        setSteps(updatedSteps);
        // Move to the last content step
        setCurrentStep(steps.length - 1);
      } else {
        // Normal step navigation
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
        
        setSteps(updatedSteps);
        // Move to previous step
        setCurrentStep(currentStep - 1);
      }
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
