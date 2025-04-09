
import React from 'react';
import { Image } from 'lucide-react';
import DocumentUpload from '@/components/document-upload';
import { PhotoItem as PhotoItemType } from './types';

type PhotoItemProps = {
  item: PhotoItemType;
  categoryId: string;
  onFilesUploaded: (categoryId: string, itemId: string, files: File[]) => void;
};

const PhotoItem: React.FC<PhotoItemProps> = ({ item, categoryId, onFilesUploaded }) => {
  return (
    <div key={item.id} className="modern-card p-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-grow">
          <h3 className="text-base font-medium text-davinci-darkGray">{item.name}</h3>
          <p className="text-sm text-davinci-silver mt-1">{item.description}</p>
          
          {item.status === 'completed' && item.value && (
            <div className="mt-3 p-3 bg-green-50 border border-green-100 rounded-md">
              <p className="text-sm text-green-700">
                <span className="font-semibold">Análise:</span> {item.value}
              </p>
            </div>
          )}
          
          {item.status === 'processing' && (
            <div className="mt-3 p-3 bg-blue-50 border border-blue-100 rounded-md">
              <p className="text-sm text-blue-700 flex items-center">
                <span className="mr-2 animate-spin">⟳</span>
                Analisando imagem...
              </p>
            </div>
          )}
        </div>
        
        <div className="sm:w-1/3 lg:w-1/4">
          <DocumentUpload
            title=""
            description=""
            acceptedFileTypes=".jpg,.jpeg,.png"
            maxFiles={3}
            icon={<Image className="h-8 w-8 text-davinci-teal" />}
            onFilesUploaded={(files) => onFilesUploaded(categoryId, item.id, files)}
            className="p-3 border border-dashed border-davinci-teal/50 bg-white"
          />
        </div>
      </div>
    </div>
  );
};

export default PhotoItem;
