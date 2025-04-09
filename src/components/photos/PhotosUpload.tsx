import React, { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { PhotosUploadProps, PhotoCategory as PhotoCategoryType } from './types';
import PhotoCategory from './PhotoCategory';
import { getCategoriesByPlanType, getSimulatedAnalysisResult } from './photosUtils';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  InfoIcon, 
  BiohazardIcon, 
  FlaskConicalIcon, 
  RecycleIcon, 
  Trash2Icon, 
  ScissorsIcon, 
  DoorClosedIcon,
  LightbulbIcon,
  Wind
} from 'lucide-react';
import { cn } from '@/lib/utils';

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

  // Get the appropriate icon for waste types
  const getWasteTypeIcon = (itemId: string) => {
    if (planType === 'PGRSS') {
      switch (itemId) {
        case 'group-a':
          return <BiohazardIcon className="h-5 w-5 text-red-600" />;
        case 'group-b':
          return <FlaskConicalIcon className="h-5 w-5 text-orange-600" />;
        case 'group-d-recyclable':
          return <RecycleIcon className="h-5 w-5 text-blue-600" />;
        case 'group-d-non-recyclable':
          return <Trash2Icon className="h-5 w-5 text-gray-600" />;
        case 'group-e':
          return <ScissorsIcon className="h-5 w-5 text-yellow-600" />;
        case 'door':
          return <DoorClosedIcon className="h-5 w-5 text-purple-600" />;
        case 'internal':
          return <Trash2Icon className="h-5 w-5 text-purple-600" />;
        case 'walls-floor':
          return <InfoIcon className="h-5 w-5 text-purple-600" />;
        case 'lighting':
          return <LightbulbIcon className="h-5 w-5 text-purple-600" />;
        case 'ventilation':
          return <Wind className="h-5 w-5 text-purple-600" />;
        default:
          return null;
      }
    } else {
      // PGRS icons
      switch (itemId) {
        case 'recyclable':
          return <RecycleIcon className="h-5 w-5 text-blue-600" />;
        case 'non-recyclable':
          return <Trash2Icon className="h-5 w-5 text-gray-600" />;
        case 'hazardous':
          return <FlaskConicalIcon className="h-5 w-5 text-red-600" />;
        default:
          return null;
      }
    }
  };

  // Determine if this is PGRSS to apply special styles
  const isPGRSS = planType === 'PGRSS';

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

      {planType === 'PGRSS' && (
        <Alert className="bg-blue-50 border-blue-200 mb-4">
          <InfoIcon className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            As fotos devem mostrar claramente as lixeiras com suas identificações, sacos de cores específicas e o abrigo temporário com suas características estruturais. Nossa IA analisará cada elemento para verificar a conformidade com as normas da RDC 222/2018.
          </AlertDescription>
        </Alert>
      )}

      {planType === 'PGRS' && (
        <Alert className="bg-blue-50 border-blue-200 mb-4">
          <InfoIcon className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            As fotos devem ser claras e mostrar claramente as lixeiras e suas identificações para análise adequada.
          </AlertDescription>
        </Alert>
      )}

      {categories.length > 0 && (
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
                onFilesUploaded={handleFilesUploaded}
                getItemIcon={getWasteTypeIcon}
                planType={planType}
              />
            </TabsContent>
          ))}
        </Tabs>
      )}
      
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg shadow-md">
        <p className="text-sm text-yellow-700">
          <strong>Importante:</strong> Envie fotos nítidas e bem iluminadas. Nossa IA necessita de imagens claras para 
          analisar corretamente os elementos de conformidade.
        </p>
      </div>
    </div>
  );
};

export default PhotosUpload;
