
import React, { useState, useEffect } from 'react';
import { Image } from 'lucide-react';
import DocumentUpload from './DocumentUpload';
import AIProcessingPanel, { ProcessingField, ProcessingStatus } from './AIProcessingPanel';

type PhotosUploadProps = {
  planType: 'PGRS' | 'PGRSS';
};

const PhotosUpload: React.FC<PhotosUploadProps> = ({ planType }) => {
  const [processingStatus, setProcessingStatus] = useState<ProcessingStatus>('waiting');
  const [fields, setFields] = useState<ProcessingField[]>([]);

  // Define os campos com base no tipo de plano
  useEffect(() => {
    if (planType === 'PGRS') {
      setFields([
        { id: '1', name: 'Lixeiras de Resíduos Recicláveis', status: 'pending' },
        { id: '2', name: 'Lixeiras de Resíduos Não Recicláveis', status: 'pending' },
        { id: '3', name: 'Lixeiras de Resíduos Perigosos', status: 'pending' },
        { id: '4', name: 'Cores de Identificação', status: 'pending' },
        { id: '5', name: 'Sinalização', status: 'pending' },
        { id: '6', name: 'Estado de Conservação', status: 'pending' },
      ]);
    } else {
      setFields([
        { id: '1', name: 'Lixeiras do Grupo A (Infectantes)', status: 'pending' },
        { id: '2', name: 'Pedal e Tampa (Grupo A)', status: 'pending' },
        { id: '3', name: 'Saco Branco Leitoso (Grupo A)', status: 'pending' },
        { id: '4', name: 'Identificação com Símbolo (Grupo A)', status: 'pending' },
        { id: '5', name: 'Lixeiras do Grupo B (Químicos)', status: 'pending' },
        { id: '6', name: 'Material Resistente (Grupo B)', status: 'pending' },
        { id: '7', name: 'Saco Laranja (Grupo B)', status: 'pending' },
        { id: '8', name: 'Símbolo de Risco Químico (Grupo B)', status: 'pending' },
        { id: '9', name: 'Lixeiras do Grupo D (Recicláveis)', status: 'pending' },
        { id: '10', name: 'Lixeiras do Grupo E (Perfurocortantes)', status: 'pending' },
      ]);
    }
  }, [planType]);

  const getUploadTitle = () => {
    return planType === 'PGRS' 
      ? "Fotos das Lixeiras e Áreas de Armazenamento" 
      : "Fotos das Lixeiras de Resíduos de Serviços de Saúde";
  };

  const getUploadDescription = () => {
    return planType === 'PGRS'
      ? "Envie fotos das lixeiras de resíduos recicláveis, não recicláveis e perigosos. Nossa IA analisará as imagens para verificar a conformidade."
      : "Envie fotos das lixeiras dos Grupos A, B, D e E. Nossa IA verificará se atendem aos requisitos específicos para resíduos de serviços de saúde.";
  };

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
        if (planType === 'PGRS') {
          const sampleData = {
            'Lixeiras de Resíduos Recicláveis': 'Identificadas e em bom estado',
            'Lixeiras de Resíduos Não Recicláveis': 'Identificadas e em bom estado',
            'Lixeiras de Resíduos Perigosos': 'Identificadas com símbolo de risco',
            'Cores de Identificação': 'De acordo com a Resolução CONAMA',
            'Sinalização': 'Presente e legível',
            'Estado de Conservação': 'Bom estado geral',
          };
          
          // Atualiza os campos com os dados extraídos
          setFields(prev => prev.map(field => ({
            ...field,
            status: 'completed',
            value: sampleData[field.name as keyof typeof sampleData]
          })));
        } else {
          const sampleData = {
            'Lixeiras do Grupo A (Infectantes)': 'Identificadas corretamente',
            'Pedal e Tampa (Grupo A)': 'Presente e funcional',
            'Saco Branco Leitoso (Grupo A)': 'Presente conforme norma',
            'Identificação com Símbolo (Grupo A)': 'Símbolo de substância infectante visível',
            'Lixeiras do Grupo B (Químicos)': 'Identificadas corretamente',
            'Material Resistente (Grupo B)': 'Material resistente a ruptura e vazamento',
            'Saco Laranja (Grupo B)': 'Presente conforme norma',
            'Símbolo de Risco Químico (Grupo B)': 'Símbolo de risco visível',
            'Lixeiras do Grupo D (Recicláveis)': 'Identificadas conforme CONAMA',
            'Lixeiras do Grupo E (Perfurocortantes)': 'Caixas adequadas e identificadas',
          };
          
          // Atualiza os campos com os dados extraídos
          setFields(prev => prev.map(field => ({
            ...field,
            status: 'completed',
            value: sampleData[field.name as keyof typeof sampleData]
          })));
        }
        
        setProcessingStatus('completed');
      }, 8000);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <DocumentUpload
        title={getUploadTitle()}
        description={getUploadDescription()}
        acceptedFileTypes=".jpg,.jpeg,.png"
        maxFiles={10}
        icon={<Image className="h-10 w-10 text-pgrs-primary mb-2" />}
        onFilesUploaded={handleFilesUploaded}
      />
      
      <AIProcessingPanel
        status={processingStatus}
        fields={fields}
        documentType="Fotos das Lixeiras"
      />
    </div>
  );
};

export default PhotosUpload;
