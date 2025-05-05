
import React, { useState, useCallback } from 'react';
import { Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import DropZone from './DropZone';
import FileItem from './FileItem';
import { DocumentUploadProps, FileWithPreview } from './types';

const DocumentUpload: React.FC<DocumentUploadProps> = ({
  title,
  description,
  acceptedFileTypes = ".pdf,.doc,.docx,.jpg,.jpeg,.png",
  maxFiles = 10,
  icon = <Upload className="h-10 w-10 text-davinci-teal mb-2" />,
  onFilesUploaded,
  className,
}) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const handleFiles = useCallback((fileList: FileList) => {
    if (files.length >= maxFiles) {
      alert(`Máximo de ${maxFiles} arquivos permitidos`);
      return;
    }

    const newFiles = Array.from(fileList).slice(0, maxFiles - files.length).map(file => ({
      file,
      id: Math.random().toString(36).substring(2, 9),
      progress: 0,
      status: 'uploading' as const
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach(fileObj => {
      const interval = setInterval(() => {
        setFiles(prevFiles => {
          const updatedFiles = prevFiles.map(prevFile => {
            if (prevFile.id === fileObj.id) {
              const newProgress = prevFile.progress + 10;
              
              if (newProgress >= 100) {
                clearInterval(interval);
                return { ...prevFile, progress: 100, status: 'complete' as const };
              }
              
              return { ...prevFile, progress: newProgress };
            }
            return prevFile;
          });
          
          return updatedFiles;
        });
      }, 300);
    });
    
    if (onFilesUploaded) {
      onFilesUploaded(Array.from(fileList).slice(0, maxFiles - files.length));
    }
  }, [files, maxFiles, onFilesUploaded]);

  const removeFile = useCallback((id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
  }, []);

  return (
    <div className={cn("document-card", className)}>
      <div className="document-card-header">
        <h2 className="text-xl font-semibold text-davinci-darkGray mb-2">{title}</h2>
        <p className="text-davinci-silver mb-6">{description}</p>
      </div>
      
      <div className="p-6">
        <DropZone
          onFilesSelected={handleFiles}
          acceptedFileTypes={acceptedFileTypes}
          icon={icon}
        />
        
        {files.length > 0 && (
          <div className="space-y-3 mt-6">
            {files.map((fileObj) => (
              <FileItem 
                key={fileObj.id} 
                fileObj={fileObj} 
                onRemove={removeFile} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentUpload;
