
import React from 'react';
import { PlanType } from '@/types/plans';

type PhotosTitleProps = {
  planType: PlanType;
};

const PhotosTitle: React.FC<PhotosTitleProps> = ({ planType }) => {
  return (
    <div className="text-center mb-6">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-davinci-darkGray to-davinci-darkGray/80 bg-clip-text text-transparent">
        {planType === 'PGRS' ? 'Fotos das Lixeiras de Resíduos' : 'Fotos das Lixeiras e Abrigo Temporário'}
      </h2>
      <p className="text-sm text-davinci-silver mt-1">
        {planType === 'PGRS' 
          ? 'Envie fotos das lixeiras de resíduos do seu estabelecimento conforme categorias abaixo.' 
          : 'Envie fotos das lixeiras de resíduos de saúde e do abrigo temporário conforme categorias abaixo.'}
      </p>
    </div>
  );
};

export default PhotosTitle;
