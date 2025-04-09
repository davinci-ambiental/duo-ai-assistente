import React, { useState, useEffect } from 'react';
import { PhotosUploadProps, PhotoCategory as PhotoCategoryType } from './types';
import { getCategoriesByPlanType, getSimulatedAnalysisResult } from './photosUtils';
import PhotosTitle from './PhotosTitle';
import PhotosAlert from './PhotosAlert';
import PhotosCategoryTabs from './PhotosCategoryTabs';
import PhotosImportantNote from './PhotosImportantNote';

const PhotosUpload: React.FC<PhotosUploadProps> = ({ planType }) => {
  const [categories, setCategories] = useState<PhotoCategoryType[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("");

  console.log("PhotosUpload - Rendering with planType:", planType);

  // Initialize categories when component mounts or planType changes
  useEffect(() => {
    console.log("PhotosUpload - useEffect triggered with planType:", planType);
    const initialCategories = getCategoriesByPlanType(planType);
    console.log("PhotosUpload - Categories loaded:", initialCategories);
    
    // Set the categories and default active category
    setCategories(initialCategories);
    
    // Only set active category if we have categories and it's not already set to a valid one
    if (initialCategories.length > 0) {
      setActiveCategory(prevCategory => {
        // If the previous category exists in the new categories, keep it
        const categoryExists = initialCategories.some(cat => cat.id === prevCategory);
        return categoryExists ? prevCategory : initialCategories[0].id;
      });
    }
  }, [planType]); // Re-run when planType changes

  const handleFilesUploaded = (categoryId: string, itemId: string, files: File[]) => {
    if (files.length > 0) {
      // Update the status of the specific item
      setCategories(prev => 
        prev.map(category => {
          if (category.id === categoryId) {
            return {
              ...category,
              items: category.items.map(item => {
                if (item.id === itemId) {
                  // Simulate processing and completion
                  setTimeout(() => {
                    setCategories(prevCategories => 
                      prevCategories.map(cat => {
                        if (cat.id === categoryId) {
                          return {
                            ...cat,
                            items: cat.items.map(itm => {
                              if (itm.id === itemId) {
                                return { 
                                  ...itm, 
                                  status: 'completed' as const,
                                  value: getSimulatedAnalysisResult(categoryId, itemId)
                                };
                              }
                              return itm;
                            })
                          };
                        }
                        return cat;
                      })
                    );
                  }, 3000);
                  
                  return { ...item, status: 'processing' as const };
                }
                return item;
              })
            };
          }
          return category;
        })
      );
    }
  };

  return (
    <div className="space-y-4">
      <PhotosTitle planType={planType} />
      <PhotosAlert planType={planType} />

      {categories.length > 0 && (
        <PhotosCategoryTabs 
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          onFilesUploaded={handleFilesUploaded}
          planType={planType}
        />
      )}
      
      <PhotosImportantNote />
    </div>
  );
};

export default PhotosUpload;
