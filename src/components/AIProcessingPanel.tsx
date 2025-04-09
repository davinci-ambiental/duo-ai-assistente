
import React from 'react';
import { Check, AlertCircle, Loader2, BrainCircuit } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ProcessingField = {
  id: string;
  name: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  value?: string;
};

export type ProcessingStatus = 'waiting' | 'processing' | 'completed' | 'error';

type AIProcessingPanelProps = {
  status: ProcessingStatus;
  fields: ProcessingField[];
  documentType: string;
  className?: string;
};

const AIProcessingPanel: React.FC<AIProcessingPanelProps> = ({
  status,
  fields,
  documentType,
  className,
}) => {
  return (
    <div className={cn("modern-card overflow-hidden", className)}>
      <div className="bg-gradient-to-r from-davinci-teal to-davinci-lightGreen p-3">
        <div className="flex items-center space-x-2">
          <div className="bg-white/90 p-1.5 rounded-full">
            <BrainCircuit className={cn(
              "h-5 w-5",
              status === 'processing' && "text-davinci-teal animate-pulse-subtle",
              status === 'completed' && "text-davinci-teal",
              status === 'error' && "text-red-500",
              status === 'waiting' && "text-davinci-silver"
            )} />
          </div>
          <h2 className="text-base font-semibold text-white">
            Processamento de IA
          </h2>
        </div>
      </div>
      
      <div className="p-4">
        <div className="mb-3">
          <div className="flex items-center space-x-2 mb-1">
            <p className="text-xs font-medium text-davinci-darkGray">Status:</p>
            {status === 'waiting' && (
              <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-davinci-lightGray text-davinci-silver">
                Aguardando arquivos
              </span>
            )}
            {status === 'processing' && (
              <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-700 flex items-center">
                <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                Processando {documentType}
              </span>
            )}
            {status === 'completed' && (
              <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-700 flex items-center">
                <Check className="h-3 w-3 mr-1" />
                Processamento completo
              </span>
            )}
            {status === 'error' && (
              <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-700 flex items-center">
                <AlertCircle className="h-3 w-3 mr-1" />
                Erro no processamento
              </span>
            )}
          </div>
          
          <p className="text-xs text-davinci-silver">
            {status === 'waiting' && 'Envie os documentos para iniciar a extração de informações.'}
            {status === 'processing' && 'Nossa IA está analisando e extraindo os dados dos documentos enviados.'}
            {status === 'completed' && 'Todos os dados foram extraídos com sucesso dos documentos.'}
            {status === 'error' && 'Ocorreu um erro durante o processamento. Por favor, verifique os documentos e tente novamente.'}
          </p>
        </div>
        
        {fields.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xs font-medium text-davinci-darkGray">Informações extraídas:</h3>
            
            <div className="bg-davinci-lightGray/30 rounded-lg p-2 divide-y divide-gray-100">
              {fields.map((field) => (
                <div key={field.id} className="py-2 first:pt-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-davinci-darkGray">{field.name}:</span>
                    <span className={cn(
                      "text-xs font-medium px-1.5 py-0.5 rounded-full",
                      field.status === 'pending' && "bg-davinci-lightGray text-davinci-silver",
                      field.status === 'processing' && "bg-blue-100 text-blue-700",
                      field.status === 'completed' && "bg-green-100 text-green-700",
                      field.status === 'error' && "bg-red-100 text-red-700"
                    )}>
                      {field.status === 'pending' && 'Pendente'}
                      {field.status === 'processing' && (
                        <span className="flex items-center">
                          <Loader2 className="h-2 w-2 mr-1 animate-spin" />
                          Processando
                        </span>
                      )}
                      {field.status === 'completed' && 'Extraído'}
                      {field.status === 'error' && 'Erro'}
                    </span>
                  </div>
                  {field.value && (
                    <p className="mt-1 text-xs text-davinci-silver break-words">
                      {field.value}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIProcessingPanel;
