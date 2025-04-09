
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { PlanType } from '@/types/plans';

type SummaryPanelProps = {
  planType: PlanType;
};

const SummaryPanel: React.FC<SummaryPanelProps> = ({ planType }) => {
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="text-center mb-4 md:mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-davinci-darkGray">Resumo da Submissão</h2>
        <p className="text-sm md:text-base text-davinci-silver">Verifique as informações abaixo antes de enviar</p>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="p-3 md:p-4">
          <CardTitle className="text-base md:text-lg">Informações do Estabelecimento</CardTitle>
          <CardDescription className="text-xs md:text-sm">Dados cadastrais extraídos do CNPJ</CardDescription>
        </CardHeader>
        <CardContent className="p-3 md:p-4 pt-0">
          <ul className="space-y-2 text-sm">
            <li className="flex flex-col sm:flex-row sm:justify-between">
              <span className="text-davinci-silver">Tipo de Plano:</span>
              <span className="font-medium break-words">{planType === 'PGRS' ? 'Plano de Gerenciamento de Resíduos Sólidos' : 'Plano de Gerenciamento de Resíduos de Serviços de Saúde'}</span>
            </li>
            <li className="flex flex-col sm:flex-row sm:justify-between">
              <span className="text-davinci-silver">CNPJ:</span>
              <span className="font-medium">XX.XXX.XXX/0001-XX</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader className="p-3 md:p-4">
          <CardTitle className="text-base md:text-lg">Licenças Ambientais</CardTitle>
          <CardDescription className="text-xs md:text-sm">Documentos enviados para validação</CardDescription>
        </CardHeader>
        <CardContent className="p-3 md:p-4 pt-0">
          <p className="text-xs md:text-sm text-davinci-silver">2 documentos enviados</p>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader className="p-3 md:p-4">
          <CardTitle className="text-base md:text-lg">Certificados de Destinação</CardTitle>
          <CardDescription className="text-xs md:text-sm">Documentos dos últimos 12 meses</CardDescription>
        </CardHeader>
        <CardContent className="p-3 md:p-4 pt-0">
          <p className="text-xs md:text-sm text-davinci-silver">4 documentos enviados</p>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader className="p-3 md:p-4">
          <CardTitle className="text-base md:text-lg">Fotos das Lixeiras</CardTitle>
          <CardDescription className="text-xs md:text-sm">{planType === 'PGRS' ? 'Fotos das lixeiras de resíduos' : 'Fotos das lixeiras de resíduos de serviços de saúde'}</CardDescription>
        </CardHeader>
        <CardContent className="p-3 md:p-4 pt-0">
          <p className="text-xs md:text-sm text-davinci-silver">3 fotos enviadas</p>
        </CardContent>
      </Card>

      <div className="mt-4 md:mt-6 p-3 md:p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-xs md:text-sm text-yellow-700">
          <strong>Importante:</strong> Ao clicar em "Enviar", você confirma que todas as informações fornecidas são verdadeiras.
        </p>
      </div>
    </div>
  );
};

export default SummaryPanel;
