
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { PlanType } from '@/types/plans';

type SummaryPanelProps = {
  planType: PlanType;
};

const SummaryPanel: React.FC<SummaryPanelProps> = ({ planType }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-davinci-darkGray">Resumo da Submissão</h2>
        <p className="text-davinci-silver">Verifique as informações abaixo antes de enviar</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações do Estabelecimento</CardTitle>
          <CardDescription>Dados cadastrais extraídos do CNPJ</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span className="text-davinci-silver">Tipo de Plano:</span>
              <span className="font-medium">{planType === 'PGRS' ? 'Plano de Gerenciamento de Resíduos Sólidos' : 'Plano de Gerenciamento de Resíduos de Serviços de Saúde'}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-davinci-silver">CNPJ:</span>
              <span className="font-medium">XX.XXX.XXX/0001-XX</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Licenças Ambientais</CardTitle>
          <CardDescription>Documentos enviados para validação</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-davinci-silver">2 documentos enviados</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Certificados de Destinação</CardTitle>
          <CardDescription>Documentos dos últimos 12 meses</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-davinci-silver">4 documentos enviados</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Fotos das Lixeiras</CardTitle>
          <CardDescription>{planType === 'PGRS' ? 'Fotos das lixeiras de resíduos' : 'Fotos das lixeiras de resíduos de serviços de saúde'}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-davinci-silver">3 fotos enviadas</p>
        </CardContent>
      </Card>

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-700">
          <strong>Importante:</strong> Ao clicar em "Enviar", você confirma que todas as informações fornecidas são verdadeiras.
        </p>
      </div>
    </div>
  );
};

export default SummaryPanel;
