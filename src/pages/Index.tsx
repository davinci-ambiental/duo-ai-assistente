
import React, { useState } from 'react';
import Header from '@/components/Header';
import StepIndicator from '@/components/StepIndicator';
import CNPJUpload from '@/components/CNPJUpload';
import LicensesUpload from '@/components/LicensesUpload';
import CertificatesUpload from '@/components/CertificatesUpload';
import PhotosUpload from '@/components/PhotosUpload';

const steps = [
  {
    id: 'cnpj',
    title: 'Cartão CNPJ',
    description: 'Envie o Cartão CNPJ para extração de informações cadastrais',
  },
  {
    id: 'licenses',
    title: 'Licenças Ambientais',
    description: 'Envie as licenças ambientais vigentes do empreendimento',
  },
  {
    id: 'certificates',
    title: 'Certificados de Destinação',
    description: 'Envie os CDFs dos últimos 12 meses',
  },
  {
    id: 'photos',
    title: 'Fotos das Lixeiras',
    description: 'Envie fotos das lixeiras e áreas de armazenamento',
  }
];

const Index = () => {
  const [planType, setPlanType] = useState<'PGRS' | 'PGRSS'>('PGRS');
  const [currentStep, setCurrentStep] = useState(0);
  const [stepStatus, setStepStatus] = useState(
    steps.map((_, index) => (index === 0 ? 'active' : 'pending') as 'active' | 'pending' | 'completed' | 'error')
  );

  // Combine steps with their status
  const stepsWithStatus = steps.map((step, index) => ({
    ...step,
    status: stepStatus[index]
  }));

  // Render current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <CNPJUpload />;
      case 1:
        return <LicensesUpload />;
      case 2:
        return <CertificatesUpload />;
      case 3:
        return <PhotosUpload planType={planType} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header planType={planType} onChangePlanType={setPlanType} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Left sidebar with steps */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Etapas do Processo</h2>
              <StepIndicator steps={stepsWithStatus} currentStep={currentStep} />
            </div>
          </div>
          
          {/* Main content */}
          <div className="md:col-span-3">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">
                {steps[currentStep].title}
              </h1>
              <p className="text-gray-600 mt-1">
                {steps[currentStep].description}
              </p>
            </div>
            
            {renderStepContent()}
            
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                disabled={currentStep === 0}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  currentStep === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white border border-pgrs-primary text-pgrs-primary hover:bg-pgrs-light/20'
                }`}
              >
                Etapa Anterior
              </button>
              
              <button
                onClick={() => {
                  // Mark current step as completed
                  const newStepStatus = [...stepStatus];
                  newStepStatus[currentStep] = 'completed';
                  
                  // If not last step, mark next step as active
                  if (currentStep < steps.length - 1) {
                    newStepStatus[currentStep + 1] = 'active';
                  }
                  
                  setStepStatus(newStepStatus);
                  
                  // Move to next step if not at the end
                  if (currentStep < steps.length - 1) {
                    setCurrentStep(prev => prev + 1);
                  }
                }}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  currentStep === steps.length - 1
                    ? 'bg-pgrs-success text-white hover:bg-pgrs-dark'
                    : 'bg-pgrs-primary text-white hover:bg-pgrs-success'
                }`}
              >
                {currentStep === steps.length - 1 ? 'Finalizar' : 'Próxima Etapa'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
