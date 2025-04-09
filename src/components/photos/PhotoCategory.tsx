
import React from 'react';
import PhotoItem from './PhotoItem';
import { PhotoCategory as PhotoCategoryType } from './types';

type PhotoCategoryProps = {
  category: PhotoCategoryType;
  onFilesUploaded: (categoryId: string, itemId: string, files: File[]) => void;
};

const PhotoCategory: React.FC<PhotoCategoryProps> = ({ category, onFilesUploaded }) => {
  return (
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
  );
};

export default PhotoCategory;
