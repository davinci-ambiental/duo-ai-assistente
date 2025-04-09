
import React, { useState } from 'react';
import Header from '@/components/Header';
import StepIndicator, { StepStatus } from '@/components/StepIndicator';
import CNPJUpload from '@/components/CNPJUpload';
import LicensesUpload from '@/components/LicensesUpload';
import CertificatesUpload from '@/components/CertificatesUpload';
import PhotosUpload from '@/components/PhotosUpload';
import AIProcessingPanel from '@/components/AIProcessingPanel';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, SkipForward, Send } from 'lucide-react';

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

  // Function to handle submission (on the last step)
  const handleSubmit = () => {
    alert('Formulário enviado com sucesso!');
    // Here you could add API calls to submit the form data
  };

  return (
    <div className="min-h-screen bg-davinci-lightGray/30">
      <Header planType={planType} onChangePlanType={setPlanType} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <StepIndicator steps={steps} currentStep={currentStep} />
          </div>
          
          <div className="lg:col-span-6">
            <div className="space-y-8">
              {steps[currentStep].component}
              
              {/* Navigation buttons */}
              <div className="flex justify-end space-x-3 mt-8">
                {currentStep > 0 && (
                  <Button
                    variant="outline"
                    onClick={handleBackStep}
                    className="text-davinci-darkGray border-davinci-darkGray hover:bg-davinci-lightGray/50"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar
                  </Button>
                )}
                
                {currentStep < steps.length - 1 && (
                  <Button
                    variant="outline"
                    onClick={handleSkipStep}
                    className="text-davinci-silver border-davinci-silver hover:bg-davinci-lightGray/50"
                  >
                    <SkipForward className="mr-2 h-4 w-4" />
                    Pular Etapa
                  </Button>
                )}
                
                {currentStep < steps.length - 1 ? (
                  <Button
                    onClick={handleNextStep}
                    className="bg-davinci-teal hover:bg-davinci-darkGreen text-white"
                  >
                    Continuar
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="bg-davinci-teal hover:bg-davinci-darkGreen text-white"
                  >
                    Enviar
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <AIProcessingPanel 
              status={steps[currentStep].status === 'completed' ? 'completed' : 'waiting'}
              fields={[]} 
              documentType={steps[currentStep].title}
              className="h-auto"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
