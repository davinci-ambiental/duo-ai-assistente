
import { PlanType } from '@/types/plans';

export type PhotosUploadProps = {
  planType: PlanType;
};

export type PhotoCategory = {
  id: string;
  title: string;
  description: string;
  items: PhotoItem[];
};

export type PhotoItem = {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  value?: string;
};
