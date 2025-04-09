
import React, { useState, useMemo } from 'react';
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

  const initialSteps = useMemo(() => [
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
    },
    {
      id: '4',
      title: 'Fotos das Lixeiras',
      description: planType === 'PGRS' 
        ? 'Fotos das lixeiras de resíduos recicláveis, não recicláveis e perigosos'
        : 'Fotos das lixeiras específicas para resíduos de serviços de saúde',
      status: 'pending' as const,
      component: <PhotosUpload planType={planType} />
    }
  ], [planType]);

  const { steps, currentStep, handleNextStep, handleSkipStep, handleBackStep } = useStepManager(initialSteps);

  const handleSubmit = () => {
    toast({
      title: "Sucesso!",
      description: "Formulário enviado com sucesso!",
    });
  };

  // The problem is here - we need to show the summary only after the photos step
  const isLastStep = currentStep === steps.length;

  return (
    <div className="min-h-screen bg-davinci-lightGray/30 w-full overflow-x-hidden">
      <Header planType={planType} onChangePlanType={setPlanType} />
      
      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-6">
        <ThreeColumnLayout
          leftSidebar={<StepIndicator steps={steps} currentStep={currentStep} />}
          mainContent={
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              <StepContent
                isLastStep={isLastStep}
                currentStep={currentStep}
                totalSteps={steps.length}
                planType={planType}
              >
                {!isLastStep && steps[currentStep].component}
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
