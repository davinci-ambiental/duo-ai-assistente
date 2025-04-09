
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
  return (
    <div className="grid grid-cols-1 gap-3 sm:gap-4 md:gap-5 w-full">
      {category.items.map((item) => (
        <PhotoItem 
          key={`${planType}-${category.id}-${item.id}`} 
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
