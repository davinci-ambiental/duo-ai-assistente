
import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import DocumentUpload from './document-upload';
import AIProcessingPanel, { ProcessingField, ProcessingStatus } from './AIProcessingPanel';

const CNPJUpload: React.FC = () => {
  const [processingStatus, setProcessingStatus] = useState<ProcessingStatus>('waiting');
  const [fields, setFields] = useState<ProcessingField[]>([
    { id: '1', name: 'Razão Social', status: 'pending' },
    { id: '2', name: 'Nome Fantasia', status: 'pending' },
    { id: '3', name: 'CNPJ', status: 'pending' },
    { id: '4', name: 'Endereço', status: 'pending' },
    { id: '5', name: 'Município', status: 'pending' },
    { id: '6', name: 'UF', status: 'pending' },
    { id: '7', name: 'CEP', status: 'pending' },
    { id: '8', name: 'CNAEs', status: 'pending' },
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
          'Razão Social': 'EMPRESA AMBIENTAL EXEMPLO LTDA',
          'Nome Fantasia': 'ECO SOLUÇÕES',
          'CNPJ': '12.345.678/0001-90',
          'Endereço': 'AV. AMBIENTAL, 123, SALA 45',
          'Município': 'SÃO PAULO',
          'UF': 'SP',
          'CEP': '01234-567',
          'CNAEs': '38.11-4-00 - Coleta de resíduos não-perigosos; 38.12-2-00 - Coleta de resíduos perigosos',
        };
        
        // Atualiza os campos com os dados extraídos
        setFields(prev => prev.map(field => ({
          ...field,
          status: 'completed',
          value: sampleData[field.name as keyof typeof sampleData]
        })));
        
        setProcessingStatus('completed');
      }, 5000);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <DocumentUpload
        title="Cartão CNPJ"
        description="Envie o Cartão CNPJ ou o Comprovante de Inscrição e Situação Cadastral para extração automática das informações do estabelecimento."
        acceptedFileTypes=".pdf,.jpg,.jpeg,.png"
        maxFiles={1}
        icon={<FileText className="h-10 w-10 text-pgrs-primary mb-2" />}
        onFilesUploaded={handleFilesUploaded}
      />
      
      <AIProcessingPanel
        status={processingStatus}
        fields={fields}
        documentType="Cartão CNPJ"
      />
    </div>
  );
};

export default CNPJUpload;
