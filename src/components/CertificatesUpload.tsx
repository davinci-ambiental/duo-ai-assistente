
import React, { useState } from 'react';
import { FileCheck } from 'lucide-react';
import DocumentUpload from './document-upload';
import AIProcessingPanel, { ProcessingField, ProcessingStatus } from './AIProcessingPanel';

const CertificatesUpload: React.FC = () => {
  const [processingStatus, setProcessingStatus] = useState<ProcessingStatus>('waiting');
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

      // Simulando a conclusão do processamento
      setTimeout(() => {
        const sampleData = {
          'Gerador': 'EMPRESA AMBIENTAL EXEMPLO LTDA',
          'Transportador': 'TRANS RESÍDUOS LTDA',
          'Destinador': 'ECO DESTINAÇÃO S.A.',
          'Tipo de Resíduo': 'Lâmpadas fluorescentes',
          'Classe do Resíduo': 'Classe I - Perigoso',
          'Quantidade': '250',
          'Unidade': 'kg',
          'Tipo de Tratamento/Destinação': 'Descontaminação e Reciclagem',
          'Data da Destinação': '15/03/2024',
          'Número do MTR/CDF': 'CDF-SP-12345678',
        };
        
        // Atualiza os campos com os dados extraídos
        setFields(prev => prev.map(field => ({
          ...field,
          status: 'completed',
          value: sampleData[field.name as keyof typeof sampleData]
        })));
        
        setProcessingStatus('completed');
      }, 7000);
    }
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
      
      <AIProcessingPanel
        status={processingStatus}
        fields={fields}
        documentType="Certificados de Destinação Final"
      />
    </div>
  );
};

export default CertificatesUpload;
