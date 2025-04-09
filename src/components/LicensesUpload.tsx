
import React, { useState } from 'react';
import { FileSpreadsheet } from 'lucide-react';
import DocumentUpload from './DocumentUpload';
import AIProcessingPanel, { ProcessingField, ProcessingStatus } from './AIProcessingPanel';

const LicensesUpload: React.FC = () => {
  const [processingStatus, setProcessingStatus] = useState<ProcessingStatus>('waiting');
  const [fields, setFields] = useState<ProcessingField[]>([
    { id: '1', name: 'Razão Social', status: 'pending' },
    { id: '2', name: 'Número da Licença', status: 'pending' },
    { id: '3', name: 'Tipo de Licença', status: 'pending' },
    { id: '4', name: 'Órgão Emissor', status: 'pending' },
    { id: '5', name: 'Data de Emissão', status: 'pending' },
    { id: '6', name: 'Data de Validade', status: 'pending' },
    { id: '7', name: 'Atividades Licenciadas', status: 'pending' },
    { id: '8', name: 'Condicionantes', status: 'pending' },
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
          'Número da Licença': 'LO-12345/2023',
          'Tipo de Licença': 'Licença de Operação',
          'Órgão Emissor': 'CETESB',
          'Data de Emissão': '01/06/2023',
          'Data de Validade': '01/06/2028',
          'Atividades Licenciadas': 'Coleta e transporte de resíduos sólidos não perigosos',
          'Condicionantes': 'Monitoramento semestral de efluentes; Relatório anual de gestão de resíduos',
        };
        
        // Atualiza os campos com os dados extraídos
        setFields(prev => prev.map(field => ({
          ...field,
          status: 'completed',
          value: sampleData[field.name as keyof typeof sampleData]
        })));
        
        setProcessingStatus('completed');
      }, 6000);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <DocumentUpload
        title="Licenças Ambientais"
        description="Envie as licenças ambientais vigentes da empresa (Licença de Operação, Licença de Instalação, etc). Nossa IA irá extrair automaticamente as informações relevantes."
        acceptedFileTypes=".pdf,.jpg,.jpeg,.png"
        maxFiles={5}
        icon={<FileSpreadsheet className="h-10 w-10 text-pgrs-primary mb-2" />}
        onFilesUploaded={handleFilesUploaded}
      />
      
      <AIProcessingPanel
        status={processingStatus}
        fields={fields}
        documentType="Licenças Ambientais"
      />
    </div>
  );
};

export default LicensesUpload;
