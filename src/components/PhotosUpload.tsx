
import React, { useState, useEffect } from 'react';
import { Image, FolderOpen } from 'lucide-react';
import DocumentUpload from './document-upload';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { PlanType } from '@/types/plans';

type PhotosUploadProps = {
  planType: PlanType;
};

type PhotoCategory = {
  id: string;
  title: string;
  description: string;
  items: PhotoItem[];
};

type PhotoItem = {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  value?: string;
};

const PhotosUpload: React.FC<PhotosUploadProps> = ({ planType }) => {
  const [categories, setCategories] = useState<PhotoCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("");

  // Define categories based on plan type
  useEffect(() => {
    if (planType === 'PGRS') {
      const pgrsCategories = [
        {
          id: 'waste-bins',
          title: 'Lixeiras',
          description: 'Fotos das lixeiras de resíduos do estabelecimento',
          items: [
            { 
              id: 'recyclable', 
              name: 'Resíduos Recicláveis', 
              description: 'Lixeiras específicas para resíduos recicláveis',
              status: 'pending' 
            },
            { 
              id: 'non-recyclable', 
              name: 'Resíduos Não Recicláveis', 
              description: 'Lixeiras para resíduos comuns não recicláveis',
              status: 'pending' 
            },
            { 
              id: 'hazardous', 
              name: 'Resíduos Perigosos', 
              description: 'Lixeiras específicas para resíduos perigosos',
              status: 'pending' 
            }
          ]
        }
      ];
      setCategories(pgrsCategories);
      setActiveCategory('waste-bins');
    } else {
      // PGRSS Categories
      const pgrssCategories = [
        {
          id: 'waste-bins',
          title: 'Lixeiras',
          description: 'Fotos das lixeiras de resíduos do estabelecimento de saúde',
          items: [
            { 
              id: 'group-a', 
              name: 'Resíduos do Grupo A (Infectantes)', 
              description: 'Verificar: pedal, tampa, saco branco leitoso e identificação com símbolo',
              status: 'pending' 
            },
            { 
              id: 'group-b', 
              name: 'Resíduos do Grupo B (Químicos)', 
              description: 'Verificar: estrutura rígida, saco laranja e identificação com símbolo de risco químico',
              status: 'pending' 
            },
            { 
              id: 'group-d-recyclable', 
              name: 'Resíduos do Grupo D (Recicláveis)', 
              description: 'Verificar: saco azul e identificação com símbolo de reciclável',
              status: 'pending' 
            },
            { 
              id: 'group-d-non-recyclable', 
              name: 'Resíduos do Grupo D (Não Recicláveis)', 
              description: 'Verificar: saco preto e identificação com símbolo de não reciclável',
              status: 'pending' 
            },
            { 
              id: 'group-e', 
              name: 'Resíduos do Grupo E (Perfurocortantes)', 
              description: 'Verificar: embalagem de papelão amarela fixada em suporte na parede',
              status: 'pending' 
            }
          ]
        },
        {
          id: 'temp-shelter',
          title: 'Abrigo Temporário',
          description: 'Fotos do abrigo temporário de resíduos',
          items: [
            { 
              id: 'door', 
              name: 'Porta do Abrigo', 
              description: 'Verificar: identificação com nome e símbolo de resíduo infectante',
              status: 'pending' 
            },
            { 
              id: 'internal', 
              name: 'Interno do Abrigo', 
              description: 'Verificar: recipientes elevados em pallets, identificação com nome e símbolo',
              status: 'pending' 
            },
            { 
              id: 'walls-floor', 
              name: 'Paredes e Pisos', 
              description: 'Verificar: materiais de fácil higienização',
              status: 'pending' 
            },
            { 
              id: 'lighting', 
              name: 'Iluminação', 
              description: 'Verificar: presença de iluminação artificial ou natural',
              status: 'pending' 
            },
            { 
              id: 'ventilation', 
              name: 'Ventilação', 
              description: 'Verificar: janelas ou aberturas com tela de proteção contra insetos e roedores',
              status: 'pending' 
            }
          ]
        }
      ];
      setCategories(pgrssCategories);
      setActiveCategory('waste-bins');
    }
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
                                  status: 'completed',
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
                  
                  return { ...item, status: 'processing' };
                }
                return item;
              }
            };
          }
          return category;
        })
      );
    }
  };

  // Simulate analysis results
  const getSimulatedAnalysisResult = (categoryId: string, itemId: string): string => {
    const results: Record<string, Record<string, string>> = {
      'waste-bins': {
        'recyclable': 'Lixeira identificada corretamente com símbolo de reciclagem.',
        'non-recyclable': 'Lixeira identificada corretamente para resíduos comuns.',
        'hazardous': 'Lixeira identificada com símbolo de risco, conforme norma.',
        'group-a': 'Lixeira com pedal e tampa funcionais, saco branco leitoso presente e símbolo de infectante visível.',
        'group-b': 'Recipiente com estrutura rígida, saco laranja presente e símbolo de risco químico visível.',
        'group-d-recyclable': 'Lixeira com saco azul e símbolo de reciclável visível.',
        'group-d-non-recyclable': 'Lixeira com saco preto e identificação de resíduo comum.',
        'group-e': 'Caixa amarela para perfurocortantes fixada corretamente na parede.'
      },
      'temp-shelter': {
        'door': 'Porta com identificação e símbolo de resíduo infectante visível.',
        'internal': 'Recipientes elevados em pallets plásticos e identificados corretamente.',
        'walls-floor': 'Paredes e piso com revestimento lavável de fácil higienização.',
        'lighting': 'Iluminação artificial adequada presente no local.',
        'ventilation': 'Janelas com tela de proteção contra insetos e roedores instaladas.'
      }
    };
    
    return results[categoryId]?.[itemId] || 'Análise concluída com sucesso.';
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
            <TabsContent key={category.id} value={category.id} className="pt-2">
              <div className="grid grid-cols-1 gap-6">
                {category.items.map((item) => (
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
                          onFilesUploaded={(files) => handleFilesUploaded(category.id, item.id, files)}
                          className="p-3 border border-dashed border-davinci-teal/50 bg-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
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
