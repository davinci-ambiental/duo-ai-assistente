
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, SkipForward, Send } from 'lucide-react';

type StepNavigationProps = {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
  onSubmit: () => void;
};

const StepNavigation: React.FC<StepNavigationProps> = ({
  currentStep,
  totalSteps,
  onNext,
  onBack,
  onSkip,
  onSubmit,
}) => {
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div className="flex flex-col items-end space-y-2">
      <div className="flex space-x-3">
        {!isFirstStep && (
          <Button
            variant="outline"
            onClick={onBack}
            className="text-davinci-darkGray border-davinci-darkGray hover:bg-davinci-lightGray/50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        )}
        
        {!isLastStep ? (
          <Button
            onClick={onNext}
            className="bg-davinci-teal hover:bg-davinci-darkGreen text-white"
          >
            Continuar
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={onSubmit}
            className="bg-davinci-teal hover:bg-davinci-darkGreen text-white"
          >
            Enviar
            <Send className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      
      {!isLastStep && (
        <Button
          variant="outline"
          onClick={onSkip}
          size="sm"
          className="text-davinci-silver border-davinci-silver hover:bg-davinci-lightGray/50"
        >
          <SkipForward className="mr-2 h-3 w-3" />
          Pular Etapa
        </Button>
      )}
    </div>
  );
};

export default StepNavigation;
