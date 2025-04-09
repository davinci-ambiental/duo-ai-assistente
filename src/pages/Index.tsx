
import React, { useState } from 'react';
import Header from '@/components/Header';
import StepIndicator, { StepStatus } from '@/components/StepIndicator';
import CNPJUpload from '@/components/CNPJUpload';
import LicensesUpload from '@/components/LicensesUpload';
import CertificatesUpload from '@/components/CertificatesUpload';
import PhotosUpload from '@/components/PhotosUpload';
import { Button } from '@/components/ui/button';
import { ArrowRight, SkipForward } from 'lucide-react';

type Step = {
  id: string;
  title: string;
  description: string;
  status: StepStatus;
  component: React.ReactNode;
};

const Index = () => {
  const [planType, setPlanType] = useState<'PGRS' | 'PGRSS'>('PGRS');
  const [currentStep, setCurrentStep] = useState(0);

  // Define the steps based on the current plan type
  const steps = [
    {
      id: '1',
      title: 'Informações do Estabelecimento',
      description: 'Envio de Cartão CNPJ para extração de dados cadastrais',
      status: 'active' as StepStatus,
      component: <CNPJUpload />
    },
    {
      id: '2',
      title: 'Licenças Ambientais',
      description: 'Envio das licenças ambientais para validação e conformidade',
      status: 'pending' as StepStatus,
      component: <LicensesUpload />
    },
    {
      id: '3',
      title: 'Certificados de Destinação',
      description: 'Envio dos certificados de destinação final dos últimos 12 meses',
      status: 'pending' as StepStatus,
      component: <CertificatesUpload />
    },
    {
      id: '4',
      title: 'Fotos das Lixeiras',
      description: planType === 'PGRS' 
        ? 'Fotos das lixeiras de resíduos recicláveis, não recicláveis e perigosos'
        : 'Fotos das lixeiras específicas para resíduos de serviços de saúde',
      status: 'pending' as StepStatus,
      component: <PhotosUpload planType={planType} />
    }
  ];

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

  return (
    <div className="min-h-screen bg-davinci-lightGray/30">
      <Header planType={planType} onChangePlanType={setPlanType} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <StepIndicator steps={steps} currentStep={currentStep} />
          </div>
          
          <div className="lg:col-span-3">
            <div className="space-y-8">
              {steps[currentStep].component}
              
              {/* Navigation buttons */}
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={handleSkipStep}
                  className="text-davinci-silver border-davinci-silver hover:bg-davinci-lightGray/50"
                  disabled={currentStep === steps.length - 1}
                >
                  <SkipForward className="mr-2 h-4 w-4" />
                  Pular Etapa
                </Button>
                
                <Button
                  onClick={handleNextStep}
                  className="bg-davinci-teal hover:bg-davinci-darkGreen text-white"
                  disabled={currentStep === steps.length - 1}
                >
                  Continuar
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
