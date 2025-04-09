
import React, { useState, useCallback } from 'react';
import { Upload, FileText, Trash2, FilePlus, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

type FileWithPreview = {
  file: File;
  id: string;
  progress: number;
  status: 'uploading' | 'complete' | 'error';
};

type DocumentUploadProps = {
  title: string;
  description: string;
  acceptedFileTypes?: string;
  maxFiles?: number;
  icon?: React.ReactNode;
  onFilesUploaded?: (files: File[]) => void;
  className?: string;
};

const DocumentUpload: React.FC<DocumentUploadProps> = ({
  title,
  description,
  acceptedFileTypes = ".pdf,.doc,.docx,.jpg,.jpeg,.png",
  maxFiles = 10,
  icon = <Upload className="h-10 w-10 text-davinci-teal mb-2" />,
  onFilesUploaded,
  className,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  }, [maxFiles]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  }, [maxFiles]);

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

  const fileExtension = (filename: string) => {
    return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
  };

  const truncateFilename = (filename: string, maxLength = 20) => {
    if (filename.length <= maxLength) return filename;
    const ext = fileExtension(filename);
    const nameWithoutExt = filename.slice(0, filename.lastIndexOf('.'));
    return `${nameWithoutExt.slice(0, maxLength - ext.length - 3)}...${ext}`;
  };

  return (
    <div className={cn("modern-card p-6", className)}>
      <h2 className="text-xl font-semibold text-davinci-darkGray mb-2">{title}</h2>
      <p className="text-davinci-silver mb-6">{description}</p>
      
      <div
        className={cn(
          "file-drop-zone",
          isDragging && "active",
          files.length > 0 && "mb-6"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {icon}
        <p className="mb-2 text-sm font-medium text-davinci-darkGray">
          Arraste e solte seus arquivos aqui ou
        </p>
        <input
          id="file-upload"
          type="file"
          accept={acceptedFileTypes}
          multiple
          className="hidden"
          onChange={handleFileInput}
        />
        <Button 
          variant="outline" 
          onClick={() => document.getElementById('file-upload')?.click()}
          className="text-davinci-teal bg-white border-davinci-teal hover:bg-davinci-lightGray"
        >
          <FilePlus className="mr-2 h-4 w-4" />
          Escolher Arquivos
        </Button>
        <p className="mt-2 text-xs text-davinci-silver">
          Formatos aceitos: {acceptedFileTypes.split(',').join(', ')}
        </p>
      </div>
      
      {files.length > 0 && (
        <div className="space-y-3">
          {files.map((fileObj) => (
            <div 
              key={fileObj.id} 
              className="flex items-center p-3 border border-gray-100 rounded-md bg-davinci-lightGray/30"
            >
              <div className="flex-shrink-0 mr-3">
                <FileText className="h-8 w-8 text-davinci-teal" />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-davinci-darkGray">
                    {truncateFilename(fileObj.file.name)}
                  </span>
                  <span className="text-xs text-davinci-silver">
                    {(fileObj.file.size / 1024).toFixed(0)} KB
                  </span>
                </div>
                <Progress 
                  value={fileObj.progress} 
                  className="h-1.5"
                  indicatorClassName="bg-davinci-teal" 
                />
              </div>
              <div className="flex-shrink-0 ml-3">
                {fileObj.status === 'complete' ? (
                  <CheckCircle2 className="h-5 w-5 text-davinci-teal" />
                ) : (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-davinci-silver hover:text-red-500"
                    onClick={() => removeFile(fileObj.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
