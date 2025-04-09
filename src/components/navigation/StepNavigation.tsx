
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, SkipForward, Send } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isSummaryStep = currentStep === totalSteps;
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col items-end space-y-2">
      <div className="flex flex-wrap justify-end gap-2 sm:gap-3 w-full">
        {!isFirstStep && (
          <Button
            variant="outline"
            onClick={onBack}
            className="text-davinci-darkGray border-davinci-darkGray hover:bg-davinci-lightGray/50 h-auto px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm"
          >
            <ArrowLeft className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            Voltar
          </Button>
        )}
        
        {!isSummaryStep ? (
          <Button
            onClick={onNext}
            className="bg-davinci-teal hover:bg-davinci-darkGreen text-white h-auto px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm"
          >
            Continuar
            <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        ) : (
          <Button
            onClick={onSubmit}
            className="bg-davinci-teal hover:bg-davinci-darkGreen text-white h-auto px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm"
          >
            Enviar
            <Send className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        )}
      </div>
      
      {!isSummaryStep && !isLastStep && (
        <Button
          variant="outline"
          onClick={onSkip}
          size="sm"
          className="text-davinci-silver border-davinci-silver hover:bg-davinci-lightGray/50 text-xs h-auto px-2 py-1 sm:text-sm"
        >
          <SkipForward className="mr-1 sm:mr-2 h-2.5 w-2.5 sm:h-3 sm:w-3" />
          Pular Etapa
        </Button>
      )}
    </div>
  );
};

export default StepNavigation;
