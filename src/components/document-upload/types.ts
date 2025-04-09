
export type FileWithPreview = {
  file: File;
  id: string;
  progress: number;
  status: 'uploading' | 'complete' | 'error';
};

export type DocumentUploadProps = {
  title: string;
  description: string;
  acceptedFileTypes?: string;
  maxFiles?: number;
  icon?: React.ReactNode;
  onFilesUploaded?: (files: File[]) => void;
  className?: string;
};
