
import React from 'react';
import { Image } from 'lucide-react';
import DocumentUpload from '@/components/document-upload';
import { PhotoItem as PhotoItemType } from './types';
import { PlanType } from '@/types/plans';
import { cn } from '@/lib/utils';

type PhotoItemProps = {
  item: PhotoItemType;
  categoryId: string;
  onFilesUploaded: (categoryId: string, itemId: string, files: File[]) => void;
  icon?: React.ReactNode;
  planType?: PlanType;
};

const PhotoItem: React.FC<PhotoItemProps> = ({ 
  item, 
  categoryId, 
  onFilesUploaded,
  icon,
  planType
}) => {
  const isPGRSS = planType === 'PGRSS';
  console.log("PhotoItem - Rendering item:", item.id, "with planType:", planType);
  
  return (
    <div key={item.id} className={cn(
      "modern-card p-4",
      isPGRSS && "border-l-4",
      isPGRSS && categoryId === 'waste-bins' && item.id === 'group-a' && "border-l-red-500",
      isPGRSS && categoryId === 'waste-bins' && item.id === 'group-b' && "border-l-orange-500",
      isPGRSS && categoryId === 'waste-bins' && item.id === 'group-d-recyclable' && "border-l-blue-500",
      isPGRSS && categoryId === 'waste-bins' && item.id === 'group-d-non-recyclable' && "border-l-gray-500",
      isPGRSS && categoryId === 'waste-bins' && item.id === 'group-e' && "border-l-yellow-500",
      isPGRSS && categoryId === 'temp-shelter' && "border-l-purple-500"
    )}>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-grow">
          <div className="flex items-center">
            {icon && <div className="mr-2">{icon}</div>}
            <h3 className="text-base font-medium text-davinci-darkGray">{item.name}</h3>
          </div>
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
            className={cn(
              "p-3 border border-dashed border-davinci-teal/50 bg-white",
              isPGRSS && categoryId === 'waste-bins' && item.id === 'group-a' && "border-red-300 hover:border-red-500",
              isPGRSS && categoryId === 'waste-bins' && item.id === 'group-b' && "border-orange-300 hover:border-orange-500",
              isPGRSS && categoryId === 'waste-bins' && item.id === 'group-d-recyclable' && "border-blue-300 hover:border-blue-500",
              isPGRSS && categoryId === 'waste-bins' && item.id === 'group-d-non-recyclable' && "border-gray-300 hover:border-gray-500",
              isPGRSS && categoryId === 'waste-bins' && item.id === 'group-e' && "border-yellow-300 hover:border-yellow-500",
              isPGRSS && categoryId === 'temp-shelter' && "border-purple-300 hover:border-purple-500"
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default PhotoItem;
