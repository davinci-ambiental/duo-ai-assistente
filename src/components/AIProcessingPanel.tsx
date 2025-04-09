
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
    <div className={cn("bg-white rounded-lg shadow-sm border border-gray-100", className)}>
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <BrainCircuit className={cn(
            "h-6 w-6",
            status === 'processing' && "text-pgrs-accent animate-pulse-subtle",
            status === 'completed' && "text-pgrs-primary",
            status === 'error' && "text-pgrs-error",
            status === 'waiting' && "text-gray-400"
          )} />
          <h2 className="text-xl font-semibold text-gray-900">
            Processamento de IA
          </h2>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <p className="text-sm font-medium text-gray-700">Status:</p>
            {status === 'waiting' && (
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-500">
                Aguardando arquivos
              </span>
            )}
            {status === 'processing' && (
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700 flex items-center">
                <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                Processando {documentType}
              </span>
            )}
            {status === 'completed' && (
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700 flex items-center">
                <Check className="h-3 w-3 mr-1" />
                Processamento completo
              </span>
            )}
            {status === 'error' && (
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700 flex items-center">
                <AlertCircle className="h-3 w-3 mr-1" />
                Erro no processamento
              </span>
            )}
          </div>
          
          <p className="text-sm text-gray-600">
            {status === 'waiting' && 'Envie os documentos para iniciar a extração de informações.'}
            {status === 'processing' && 'Nossa IA está analisando e extraindo os dados dos documentos enviados.'}
            {status === 'completed' && 'Todos os dados foram extraídos com sucesso dos documentos.'}
            {status === 'error' && 'Ocorreu um erro durante o processamento. Por favor, verifique os documentos e tente novamente.'}
          </p>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700">Informações extraídas:</h3>
          
          <div className="bg-gray-50 rounded-md p-4 divide-y divide-gray-100">
            {fields.map((field) => (
              <div key={field.id} className="py-2 first:pt-0 last:pb-0">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{field.name}:</span>
                  <span className={cn(
                    "text-xs font-medium px-2 py-0.5 rounded-full",
                    field.status === 'pending' && "bg-gray-100 text-gray-500",
                    field.status === 'processing' && "bg-blue-100 text-blue-700",
                    field.status === 'completed' && "bg-green-100 text-green-700",
                    field.status === 'error' && "bg-red-100 text-red-700"
                  )}>
                    {field.status === 'pending' && 'Pendente'}
                    {field.status === 'processing' && (
                      <span className="flex items-center">
                        <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                        Processando
                      </span>
                    )}
                    {field.status === 'completed' && 'Extraído'}
                    {field.status === 'error' && 'Erro'}
                  </span>
                </div>
                {field.value && (
                  <p className="mt-1 text-sm text-gray-600 break-words">
                    {field.value}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIProcessingPanel;
