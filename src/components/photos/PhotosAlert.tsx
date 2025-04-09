
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';
import { PlanType } from '@/types/plans';

type PhotosAlertProps = {
  planType: PlanType;
};

const PhotosAlert: React.FC<PhotosAlertProps> = ({ planType }) => {
  if (planType === 'PGRSS') {
    return (
      <Alert className="bg-blue-50 border-blue-200 mb-4">
        <InfoIcon className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          As fotos devem mostrar claramente as lixeiras com suas identificações, sacos de cores específicas e o abrigo temporário com suas características estruturais. Nossa IA analisará cada elemento para verificar a conformidade com as normas da RDC 222/2018.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert className="bg-blue-50 border-blue-200 mb-4">
      <InfoIcon className="h-4 w-4 text-blue-600" />
      <AlertDescription className="text-blue-800">
        As fotos devem ser claras e mostrar claramente as lixeiras e suas identificações para análise adequada.
      </AlertDescription>
    </Alert>
  );
};

export default PhotosAlert;
