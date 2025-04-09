
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import PhotoItem from './PhotoItem';
import { PhotoCategory as PhotoCategoryType } from './types';

type PhotoCategoryProps = {
  category: PhotoCategoryType;
  onFilesUploaded: (categoryId: string, itemId: string, files: File[]) => void;
};

const PhotoCategory: React.FC<PhotoCategoryProps> = ({ category, onFilesUploaded }) => {
  return (
    <TabsContent key={category.id} value={category.id} className="pt-2">
      <div className="grid grid-cols-1 gap-6">
        {category.items.map((item) => (
          <PhotoItem 
            key={item.id} 
            item={item} 
            categoryId={category.id} 
            onFilesUploaded={onFilesUploaded} 
          />
        ))}
      </div>
    </TabsContent>
  );
};

export default PhotoCategory;
