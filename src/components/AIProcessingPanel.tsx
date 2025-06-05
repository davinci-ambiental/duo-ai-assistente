
import React from 'react';
import { Check, AlertCircle, Loader2, BrainCircuit, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ProcessingField = {
  id: string;
  name: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  value?: string;
  errorMessage?: string;
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
    <div className={cn("processing-panel border-t-4 border-t-davinci-teal shadow-md", className)}>
      <div className={cn(
        "processing-header",
        status === 'error' ? "processing-header-error" : 
        status === 'waiting' ? "processing-header-waiting" : 
        "processing-header-success"
      )}>
        <div className="flex items-center space-x-2">
          <div className="bg-white/90 p-1.5 rounded-full">
            <BrainCircuit className={cn(
              "h-5 w-5",
              status === 'processing' && "text-davinci-teal animate-pulse",
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
      
      <div className="processing-content">
        <div className="mb-3">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <p className="text-xs font-medium text-davinci-darkGray">Status:</p>
            {status === 'waiting' && (
              <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-300 text-gray-700">
                Aguardando arquivos
              </span>
            )}
            {status === 'processing' && (
              <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-500 text-white flex items-center">
                <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                Processando {documentType}
              </span>
            )}
            {status === 'completed' && (
              <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-500 text-white flex items-center">
                <Check className="h-3 w-3 mr-1" />
                Processamento completo
              </span>
            )}
            {status === 'error' && (
              <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-red-500 text-white flex items-center">
                <AlertCircle className="h-3 w-3 mr-1" />
                Erro no processamento
              </span>
            )}
          </div>
          
          <p className="text-xs text-davinci-silver">
            {status === 'waiting' && 'Envie os documentos para iniciar a extração de informações.'}
            {status === 'processing' && 'Nossa IA está analisando e extraindo os dados dos documentos enviados.'}
            {status === 'completed' && 'Todos os dados foram extraídos com sucesso dos documentos.'}
            {status === 'error' && 'Falha ao extrair as informações. Os documentos podem estar ilegíveis ou em formato não suportado.'}
          </p>
        </div>
        
        {fields.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xs font-medium text-davinci-darkGray">Informações extraídas:</h3>
            
            <div className="bg-gray-50 rounded-lg p-2 divide-y divide-gray-100 shadow-inner">
              {fields.map((field) => (
                <div key={field.id} className="py-2 first:pt-0 last:pb-0">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-medium text-davinci-darkGray">{field.name}:</span>
                    <span className={cn(
                      "text-xs font-medium px-1.5 py-0.5 rounded-full whitespace-nowrap",
                      field.status === 'pending' && "bg-gray-200 text-gray-700",
                      field.status === 'processing' && "bg-blue-200 text-blue-800",
                      field.status === 'completed' && "bg-green-200 text-green-800",
                      field.status === 'error' && "bg-red-200 text-red-800"
                    )}>
                      {field.status === 'pending' && 'Pendente'}
                      {field.status === 'processing' && (
                        <span className="flex items-center">
                          <Loader2 className="h-2 w-2 mr-1 animate-spin" />
                          Processando
                        </span>
                      )}
                      {field.status === 'completed' && 'Extraído'}
                      {field.status === 'error' && (
                        <span className="flex items-center">
                          <XCircle className="h-2 w-2 mr-1" />
                          Falha
                        </span>
                      )}
                    </span>
                  </div>
                  {field.value && (
                    <p className="mt-1 text-xs text-davinci-silver break-words line-clamp-3">
                      {field.value}
                    </p>
                  )}
                  {field.status === 'error' && field.errorMessage && (
                    <p className="mt-1 text-xs text-red-500 break-words line-clamp-3">
                      {field.errorMessage}
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
