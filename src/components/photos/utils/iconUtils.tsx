
import React from 'react';
import { 
  BiohazardIcon, 
  FlaskConicalIcon, 
  RecycleIcon, 
  Trash2Icon, 
  ScissorsIcon, 
  DoorClosedIcon,
  LightbulbIcon,
  Wind,
  Skull,
  InfoIcon
} from 'lucide-react';
import { PlanType } from '@/types/plans';

// Get the appropriate icon for waste types
export const getWasteTypeIcon = (itemId: string, planType: PlanType): React.ReactNode => {
  if (planType === 'PGRSS') {
    switch (itemId) {
      case 'group-a':
        return <BiohazardIcon className="h-5 w-5 text-red-600" />;
      case 'group-b':
        return <Skull className="h-5 w-5 text-red-600" />;
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
        return <Skull className="h-5 w-5 text-red-600" />;
      default:
        return null;
    }
  }
};
