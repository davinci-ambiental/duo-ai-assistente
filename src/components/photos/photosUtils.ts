
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
        description: 'Fotos das lixeiras de resíduos de serviços de saúde',
        items: [
          { 
            id: 'group-a', 
            name: 'Resíduos do Grupo A (Infectantes)', 
            description: 'A foto deve mostrar se a lixeira possui pedal e tampa, saco de lixo branco leitoso e identificação na lixeira com nome e símbolo de resíduos infectantes',
            status: 'pending' as const
          },
          { 
            id: 'group-b', 
            name: 'Resíduos do Grupo B (Químicos)', 
            description: 'A foto deve mostrar se a lixeira possui material de estrutura rígida, e se possuir saco de lixo que ele seja da cor laranja, e que a identificação na lixeira deve ter nome e símbolo de resíduos químicos ou perigosos',
            status: 'pending' as const
          },
          { 
            id: 'group-d-recyclable', 
            name: 'Resíduos do Grupo D (Recicláveis)', 
            description: 'Verificar se possui saco de lixo de cor azul e que a identificação na lixeira deve ter nome e símbolo de resíduo reciclável',
            status: 'pending' as const
          },
          { 
            id: 'group-d-non-recyclable', 
            name: 'Resíduos do Grupo D (Não Recicláveis)', 
            description: 'Verificar se possui saco de lixo de cor preta e que a identificação na lixeira deve ter nome e símbolo de resíduo NÃO reciclável ou comum',
            status: 'pending' as const
          },
          { 
            id: 'group-e', 
            name: 'Resíduos do Grupo E (Perfurocortantes)', 
            description: 'Possuir embalagem de papelão de cor amarela, fixada em suporte na parede',
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
            name: 'Foto da Porta', 
            description: 'A IA deve avaliar se a porta possui identificação com nome e simbologia dos resíduos infectante',
            status: 'pending' as const
          },
          { 
            id: 'internal', 
            name: 'Foto Interna do Abrigo', 
            description: 'Os recipientes (bombonas, lixeiras ou tambores) devem estar elevados por pallets plásticos, não devem estar em contato direto com o chão. E os recipientes devem ser identificados com nome e simbologia do resíduos armazenado',
            status: 'pending' as const
          },
          { 
            id: 'walls-floor', 
            name: 'Paredes e Pisos', 
            description: 'As paredes e pisos devem ser de materiais de fácil higienização',
            status: 'pending' as const
          },
          { 
            id: 'lighting', 
            name: 'Iluminação', 
            description: 'Identificar se no local há iluminação artificial ou natural',
            status: 'pending' as const
          },
          { 
            id: 'ventilation', 
            name: 'Ventilação', 
            description: 'Identificar se no local há janelas ou locais de passagem de ar. Se sim, devem possuir telas de proteção contra insetos e roedores',
            status: 'pending' as const
          }
        ]
      }
    ];
  }
};

// Simulate analysis results with improved feedback specific to each item type
export const getSimulatedAnalysisResult = (categoryId: string, itemId: string): string => {
  const results: Record<string, Record<string, string>> = {
    'waste-bins': {
      // PGRS results
      'recyclable': 'Lixeira identificada corretamente com símbolo de reciclagem.',
      'non-recyclable': 'Lixeira identificada corretamente para resíduos comuns.',
      'hazardous': 'Lixeira identificada com símbolo de risco, conforme norma.',
      
      // PGRSS results
      'group-a': 'Identificado: lixeira com pedal e tampa funcionais, saco branco leitoso presente e símbolo de resíduos infectantes visível.',
      'group-b': 'Identificado: recipiente com estrutura rígida, saco laranja presente e símbolo de resíduos químicos visível.',
      'group-d-recyclable': 'Identificado: lixeira com saco azul e símbolo de resíduo reciclável visível.',
      'group-d-non-recyclable': 'Identificado: lixeira com saco preto e símbolo de resíduo não reciclável visível.',
      'group-e': 'Identificado: caixa amarela para perfurocortantes fixada corretamente na parede.'
    },
    'temp-shelter': {
      'door': 'Identificado: porta com sinalização adequada e símbolo de resíduo infectante visível.',
      'internal': 'Identificado: recipientes elevados em pallets plásticos e adequadamente identificados com símbolo do tipo de resíduo.',
      'walls-floor': 'Identificado: paredes e piso com revestimento lavável de fácil higienização.',
      'lighting': 'Identificado: iluminação artificial adequada presente no local.',
      'ventilation': 'Identificado: aberturas com tela de proteção contra insetos e roedores instaladas.'
    }
  };
  
  return results[categoryId]?.[itemId] || 'Análise concluída com sucesso.';
};
