
import React, { useState, useMemo, useEffect } from 'react';
import Header from '@/components/Header';
import StepIndicator from '@/components/StepIndicator';
import CNPJUpload from '@/components/CNPJUpload';
import LicensesUpload from '@/components/LicensesUpload';
import CertificatesUpload from '@/components/CertificatesUpload';
import PhotosUpload from '@/components/photos';
import ThreeColumnLayout from '@/components/layout/ThreeColumnLayout';
import StepContent from '@/components/steps/StepContent';
import StepNavigation from '@/components/navigation/StepNavigation';
import { useStepManager } from '@/hooks/useStepManager';
import { PlanType } from '@/types/plans';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [planType, setPlanType] = useState<PlanType>('PGRS');
  const { toast } = useToast();

  // Debug planType changes
  useEffect(() => {
    console.log("Index - Current plan type changed to:", planType);
  }, [planType]);

  // Create different steps based on plan type
  const initialSteps = useMemo(() => {
    // Shared steps (first three are the same for both plan types)
    const commonSteps = [
      {
        id: '1',
        title: 'Informações do Estabelecimento',
        description: 'Envio de Cartão CNPJ para extração de dados cadastrais',
        status: 'active' as const,
        component: <CNPJUpload />
      },
      {
        id: '2',
        title: 'Licenças Ambientais',
        description: 'Envio das licenças ambientais para validação e conformidade',
        status: 'pending' as const,
        component: <LicensesUpload />
      },
      {
        id: '3',
        title: 'Certificados de Destinação',
        description: 'Envio dos certificados de destinação final dos últimos 12 meses',
        status: 'pending' as const,
        component: <CertificatesUpload />
      }
    ];

    // Plan-specific photo step
    const photoStep = {
      id: '4',
      title: planType === 'PGRS' ? 'Fotos das Lixeiras' : 'Fotos das Lixeiras e Abrigo Temporário',
      description: planType === 'PGRS' 
        ? 'Fotos das lixeiras de resíduos recicláveis, não recicláveis e perigosos'
        : 'Fotos das lixeiras de resíduos por grupos (A, B, D, E) e do abrigo temporário',
      status: 'pending' as const,
      // Use a unique key to force re-rendering when planType changes
      component: <PhotosUpload planType={planType} key={`photos-upload-${planType}`} />
    };

    // Return the combined steps
    return [...commonSteps, photoStep];
  }, [planType]);

  // Reset step manager when plan type changes
  const { steps, currentStep, handleNextStep, handleSkipStep, handleBackStep } = useStepManager(initialSteps);

  // Effects to reset steps when planType changes
  useEffect(() => {
    console.log("Steps updated for plan type:", planType, initialSteps);
  }, [initialSteps, planType]);

  const handleSubmit = () => {
    toast({
      title: "Sucesso!",
      description: "Formulário enviado com sucesso!",
    });
  };

  // Check if we're on the last step or the summary step
  const isLastStep = currentStep === steps.length - 1;
  const isSummaryStep = currentStep === steps.length;

  return (
    <div className="min-h-screen bg-davinci-lightGray/30 w-full overflow-x-hidden">
      <Header planType={planType} onChangePlanType={setPlanType} />
      
      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-6">
        <ThreeColumnLayout
          leftSidebar={<StepIndicator steps={steps} currentStep={currentStep} />}
          mainContent={
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              <StepContent
                isLastStep={isSummaryStep}
                currentStep={currentStep}
                totalSteps={steps.length}
                planType={planType}
              >
                {!isSummaryStep && steps[currentStep].component}
              </StepContent>
              
              <StepNavigation
                currentStep={currentStep}
                totalSteps={steps.length}
                onNext={handleNextStep}
                onBack={handleBackStep}
                onSkip={handleSkipStep}
                onSubmit={handleSubmit}
              />
            </div>
          }
        />
      </main>
    </div>
  );
};

export default Index;
