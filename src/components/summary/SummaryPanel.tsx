
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { PlanType } from '@/types/plans';

type SummaryPanelProps = {
  planType: PlanType;
};

const SummaryPanel: React.FC<SummaryPanelProps> = ({ planType }) => {
  // Determine if we're showing PGRS or PGRSS content
  const isPGRS = planType === 'PGRS';
  
  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-6">
      <div className="text-center mb-3 sm:mb-4 md:mb-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-davinci-darkGray">Resumo da Submissão</h2>
        <p className="text-xs sm:text-sm md:text-base text-davinci-silver">Verifique as informações abaixo antes de enviar</p>
      </div>

      <Card className="border-l-4 border-l-davinci-teal">
        <CardHeader className="bg-gray-50">
          <CardTitle className="text-sm sm:text-base md:text-lg">Informações do Estabelecimento</CardTitle>
          <CardDescription className="text-xs md:text-sm">Dados cadastrais extraídos do CNPJ</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
              <span className="text-davinci-silver whitespace-nowrap">Tipo de Plano:</span>
              <span className="font-medium break-words sm:text-right sm:max-w-[70%]">
                {isPGRS 
                  ? 'Plano de Gerenciamento de Resíduos Sólidos' 
                  : 'Plano de Gerenciamento de Resíduos de Serviços de Saúde'}
              </span>
            </li>
            <li className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
              <span className="text-davinci-silver whitespace-nowrap">CNPJ:</span>
              <span className="font-medium sm:text-right">XX.XXX.XXX/0001-XX</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-davinci-secondary">
        <CardHeader className="bg-gray-50">
          <CardTitle className="text-sm sm:text-base md:text-lg">Licenças Ambientais</CardTitle>
          <CardDescription className="text-xs md:text-sm">Documentos enviados para validação</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-xs md:text-sm text-davinci-silver">2 documentos enviados</p>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-davinci-teal">
        <CardHeader className="bg-gray-50">
          <CardTitle className="text-sm sm:text-base md:text-lg">Certificados de Destinação</CardTitle>
          <CardDescription className="text-xs md:text-sm">Documentos dos últimos 12 meses</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-xs md:text-sm text-davinci-silver">4 documentos enviados</p>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-davinci-secondary">
        <CardHeader className="bg-gray-50">
          <CardTitle className="text-sm sm:text-base md:text-lg">
            {isPGRS ? 'Fotos das Lixeiras' : 'Fotos das Lixeiras e Abrigo Temporário'}
          </CardTitle>
          <CardDescription className="text-xs md:text-sm">
            {isPGRS 
              ? 'Fotos das lixeiras de resíduos recicláveis, não recicláveis e perigosos' 
              : 'Fotos das lixeiras de resíduos por grupos (A, B, D, E) e do abrigo temporário'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-xs md:text-sm text-davinci-silver">
            {isPGRS ? '3 fotos enviadas' : '6 fotos enviadas'}
          </p>
        </CardContent>
      </Card>

      <div className="mt-3 sm:mt-4 md:mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg shadow-sm">
        <p className="text-xs md:text-sm text-yellow-700">
          <strong>Importante:</strong> Ao clicar em "Enviar", você confirma que todas as informações fornecidas são verdadeiras.
        </p>
      </div>
    </div>
  );
};

export default SummaryPanel;
