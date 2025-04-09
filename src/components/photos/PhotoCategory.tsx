
import React from 'react';
import PhotoItem from './PhotoItem';
import { PhotoCategory as PhotoCategoryType } from './types';
import { PlanType } from '@/types/plans';

type PhotoCategoryProps = {
  category: PhotoCategoryType;
  onFilesUploaded: (categoryId: string, itemId: string, files: File[]) => void;
  getItemIcon?: (itemId: string) => React.ReactNode;
  planType?: PlanType;
};

const PhotoCategory: React.FC<PhotoCategoryProps> = ({ 
  category, 
  onFilesUploaded, 
  getItemIcon,
  planType
}) => {
  console.log("PhotoCategory - Rendering with planType:", planType);
  
  return (
    <div className="grid grid-cols-1 gap-6">
      {category.items.map((item) => (
        <PhotoItem 
          key={item.id} 
          item={item} 
          categoryId={category.id} 
          onFilesUploaded={onFilesUploaded}
          icon={getItemIcon ? getItemIcon(item.id) : undefined}
          planType={planType}
        />
      ))}
    </div>
  );
};

export default PhotoCategory;
