
import { PhotoCategory } from './types';

// Get categories based on plan type
export const getCategoriesByPlanType = (planType: 'PGRS' | 'PGRSS'): PhotoCategory[] => {
  if (planType === 'PGRS') {
    return [
      {
        id: 'waste-bins',
        title: 'Lixeiras',
        description: 'Fotos das lixeiras de resíduos do estabelecimento',
        items: [
          { 
            id: 'recyclable', 
            name: 'Resíduos Recicláveis', 
            description: 'Lixeiras específicas para resíduos recicláveis',
            status: 'pending' as const
          },
          { 
            id: 'non-recyclable', 
            name: 'Resíduos Não Recicláveis', 
            description: 'Lixeiras para resíduos comuns não recicláveis',
            status: 'pending' as const
          },
          { 
            id: 'hazardous', 
            name: 'Resíduos Perigosos', 
            description: 'Lixeiras específicas para resíduos perigosos',
            status: 'pending' as const
          }
        ]
      }
    ];
  } else {
    // PGRSS Categories
    return [
      {
        id: 'waste-bins',
        title: 'Lixeiras',
        description: 'Fotos das lixeiras de resíduos do estabelecimento de saúde',
        items: [
          { 
            id: 'group-a', 
            name: 'Resíduos do Grupo A (Infectantes)', 
            description: 'Verificar: pedal, tampa, saco branco leitoso e identificação com símbolo',
            status: 'pending' as const
          },
          { 
            id: 'group-b', 
            name: 'Resíduos do Grupo B (Químicos)', 
            description: 'Verificar: estrutura rígida, saco laranja e identificação com símbolo de risco químico',
            status: 'pending' as const
          },
          { 
            id: 'group-d-recyclable', 
            name: 'Resíduos do Grupo D (Recicláveis)', 
            description: 'Verificar: saco azul e identificação com símbolo de reciclável',
            status: 'pending' as const
          },
          { 
            id: 'group-d-non-recyclable', 
            name: 'Resíduos do Grupo D (Não Recicláveis)', 
            description: 'Verificar: saco preto e identificação com símbolo de não reciclável',
            status: 'pending' as const
          },
          { 
            id: 'group-e', 
            name: 'Resíduos do Grupo E (Perfurocortantes)', 
            description: 'Verificar: embalagem de papelão amarela fixada em suporte na parede',
            status: 'pending' as const
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
            status: 'pending' as const
          },
          { 
            id: 'internal', 
            name: 'Interno do Abrigo', 
            description: 'Verificar: recipientes elevados em pallets, identificação com nome e símbolo',
            status: 'pending' as const
          },
          { 
            id: 'walls-floor', 
            name: 'Paredes e Pisos', 
            description: 'Verificar: materiais de fácil higienização',
            status: 'pending' as const
          },
          { 
            id: 'lighting', 
            name: 'Iluminação', 
            description: 'Verificar: presença de iluminação artificial ou natural',
            status: 'pending' as const
          },
          { 
            id: 'ventilation', 
            name: 'Ventilação', 
            description: 'Verificar: janelas ou aberturas com tela de proteção contra insetos e roedores',
            status: 'pending' as const
          }
        ]
      }
    ];
  }
};

// Simulate analysis results
export const getSimulatedAnalysisResult = (categoryId: string, itemId: string): string => {
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
