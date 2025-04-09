
import React from 'react';
import { FileText, Trash2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { FileWithPreview } from './types';

type FileItemProps = {
  fileObj: FileWithPreview;
  onRemove: (id: string) => void;
};

const FileItem: React.FC<FileItemProps> = ({ fileObj, onRemove }) => {
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
    <div className="flex items-center p-3 border border-gray-100 rounded-md bg-davinci-lightGray/30">
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
          className="h-1.5 bg-gray-200"
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
            onClick={() => onRemove(fileObj.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default FileItem;
