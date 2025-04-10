
import React, { useState } from 'react';
import { FileCheck, AlertCircle } from 'lucide-react';
import DocumentUpload from './document-upload';
import AIProcessingPanel, { ProcessingField, ProcessingStatus } from './AIProcessingPanel';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const CertificatesUpload: React.FC = () => {
  const [processingStatus, setProcessingStatus] = useState<ProcessingStatus>('waiting');
  const { toast } = useToast();
  const [fields, setFields] = useState<ProcessingField[]>([
    { id: '1', name: 'Gerador', status: 'pending' },
    { id: '2', name: 'Transportador', status: 'pending' },
    { id: '3', name: 'Destinador', status: 'pending' },
    { id: '4', name: 'Tipo de Resíduo', status: 'pending' },
    { id: '5', name: 'Classe do Resíduo', status: 'pending' },
    { id: '6', name: 'Quantidade', status: 'pending' },
    { id: '7', name: 'Unidade', status: 'pending' },
    { id: '8', name: 'Tipo de Tratamento/Destinação', status: 'pending' },
    { id: '9', name: 'Data da Destinação', status: 'pending' },
    { id: '10', name: 'Número do MTR/CDF', status: 'pending' },
  ]);

  const handleFilesUploaded = (files: File[]) => {
    if (files.length > 0) {
      // Simulando o processamento
      setProcessingStatus('processing');
      
      // Atualiza os campos para "processing"
      setTimeout(() => {
        setFields(prev => prev.map(field => ({
          ...field,
          status: 'processing'
        })));
      }, 500);

      // Simulando falha no processamento após alguns segundos
      setTimeout(() => {
        setFields(prev => prev.map(field => ({
          ...field,
          status: 'error',
          errorMessage: 'Não foi possível extrair este dado do documento.'
        })));
        
        setProcessingStatus('error');
        
        toast({
          title: "Erro no processamento",
          description: "Não foi possível extrair as informações dos certificados enviados. Por favor, tente novamente com documentos mais legíveis.",
          variant: "destructive",
        });
      }, 5000);
    }
  };

  const handleRetry = () => {
    // Reinicia o estado para waiting
    setProcessingStatus('waiting');
    setFields(prev => prev.map(field => ({
      ...field,
      status: 'pending',
      errorMessage: undefined,
      value: undefined
    })));
    
    toast({
      title: "Pronto para tentar novamente",
      description: "Envie os documentos para iniciar um novo processamento.",
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <DocumentUpload
        title="Certificados de Destinação Final (CDF)"
        description="Envie os Certificados de Destinação Final (CDF) dos últimos 12 meses. Nossa IA extrairá informações sobre o gerador, transportador, destinador, tipo de resíduo, quantidade e tratamento."
        acceptedFileTypes=".pdf,.jpg,.jpeg,.png"
        maxFiles={10}
        icon={<FileCheck className="h-10 w-10 text-pgrs-primary mb-2" />}
        onFilesUploaded={handleFilesUploaded}
      />
      
      <div className="space-y-4">
        <AIProcessingPanel
          status={processingStatus}
          fields={fields}
          documentType="Certificados de Destinação Final"
        />
        
        {processingStatus === 'error' && (
          <div className="flex flex-col gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-red-700">Falha no processamento</h3>
                <p className="text-xs text-red-600 mt-1">
                  A IA não conseguiu extrair as informações dos certificados. Isso pode ocorrer devido à baixa qualidade das imagens, texto não reconhecível ou formato incompatível.
                </p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="self-end bg-white text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
              onClick={handleRetry}
            >
              Tentar novamente
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificatesUpload;
