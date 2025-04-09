
import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PhotosUploadProps, PhotoCategory as PhotoCategoryType } from './types';
import PhotoCategory from './PhotoCategory';
import { getCategoriesByPlanType, getSimulatedAnalysisResult } from './photosUtils';

const PhotosUpload: React.FC<PhotosUploadProps> = ({ planType }) => {
  const [categories, setCategories] = useState<PhotoCategoryType[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("");

  // Define categories based on plan type
  useEffect(() => {
    const initialCategories = getCategoriesByPlanType(planType);
    setCategories(initialCategories);
    setActiveCategory(initialCategories[0]?.id || '');
  }, [planType]);

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
      <div className="text-center mb-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-davinci-darkGray">
          {planType === 'PGRS' ? 'Fotos das Lixeiras de Resíduos' : 'Fotos das Lixeiras e Abrigo Temporário'}
        </h2>
        <p className="text-sm text-davinci-silver mt-1">
          {planType === 'PGRS' 
            ? 'Envie fotos das lixeiras de resíduos do seu estabelecimento conforme categorias abaixo.' 
            : 'Envie fotos das lixeiras de resíduos de saúde e do abrigo temporário conforme categorias abaixo.'}
        </p>
      </div>

      {categories.length > 0 && (
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <TabsList className="w-full flex mb-6 bg-davinci-lightGray/30">
            {categories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="flex-1 py-2 px-3 text-sm"
              >
                {category.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <PhotoCategory 
              key={category.id} 
              category={category} 
              onFilesUploaded={handleFilesUploaded} 
            />
          ))}
        </Tabs>
      )}
      
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-700">
          <strong>Importante:</strong> Envie fotos nítidas e bem iluminadas. Nossa IA necessita de imagens claras para 
          analisar corretamente os elementos de conformidade.
        </p>
      </div>
    </div>
  );
};

export default PhotosUpload;
