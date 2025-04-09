
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { PhotoCategory as PhotoCategoryType } from './types';
import PhotoCategory from './PhotoCategory';
import { cn } from '@/lib/utils';
import { PlanType } from '@/types/plans';
import { getWasteTypeIcon } from './utils/iconUtils';

type PhotosCategoryTabsProps = {
  categories: PhotoCategoryType[];
  activeCategory: string;
  setActiveCategory: (categoryId: string) => void;
  onFilesUploaded: (categoryId: string, itemId: string, files: File[]) => void;
  planType: PlanType;
};

const PhotosCategoryTabs: React.FC<PhotosCategoryTabsProps> = ({
  categories,
  activeCategory,
  setActiveCategory,
  onFilesUploaded,
  planType
}) => {
  const isPGRSS = planType === 'PGRSS';

  return (
    <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
      <TabsList className={cn(
        "w-full flex mb-6 rounded-lg shadow-md", 
        isPGRSS 
          ? "bg-gradient-to-r from-davinci-lightGray/70 to-davinci-lightGray/40 p-1" 
          : "bg-davinci-lightGray/30"
      )}>
        {categories.map((category) => (
          <TabsTrigger 
            key={category.id} 
            value={category.id}
            className={cn(
              "flex-1 py-2.5 px-4 text-sm font-medium transition-all duration-200",
              isPGRSS && "data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-md"
            )}
          >
            {category.title}
          </TabsTrigger>
        ))}
      </TabsList>

      {categories.map((category) => (
        <TabsContent key={category.id} value={category.id} className="animate-fade-in">
          <div className="mb-4">
            <h3 className="text-md font-medium text-davinci-darkGray">{category.description}</h3>
            {planType === 'PGRSS' && category.id === 'waste-bins' && (
              <p className="text-sm text-davinci-silver mt-1 mb-4">
                Tire fotos das lixeiras para cada grupo de resíduos, certificando-se que é possível ver a cor do saco e a identificação de acordo com as especificações da RDC 222/2018.
              </p>
            )}
            {planType === 'PGRSS' && category.id === 'temp-shelter' && (
              <p className="text-sm text-davinci-silver mt-1 mb-4">
                Tire fotos de todas as características importantes do abrigo temporário conforme solicitado, mostrando claramente cada elemento para análise adequada.
              </p>
            )}
          </div>
          <PhotoCategory 
            category={category}
            onFilesUploaded={onFilesUploaded}
            getItemIcon={(itemId) => getWasteTypeIcon(itemId, planType)}
            planType={planType}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default PhotosCategoryTabs;
