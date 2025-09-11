"use client";

import React, { useState, useCallback } from "react";
import { Upload, File, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";

interface ContractFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadedAt: Date;
  contractType?: 'upload' | 'generated';
}

interface ContractUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (files: ContractFile[]) => void;
  contractId?: string;
  projectName?: string;
  companyName?: string;
}

export const ContractUploadModal: React.FC<ContractUploadModalProps> = ({ 
  isOpen, 
  onClose, 
  onSuccess, 
  contractId,
  projectName,
  companyName 
}) => {
  const [files, setFiles] = useState<ContractFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const validateFile = (file: File): string | null => {
    const allowedTypes = [
      'application/pdf', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'image/jpeg', 
      'image/png'
    ];
    const maxSize = 10 * 1024 * 1024; // 10MB for contracts

    if (!allowedTypes.includes(file.type)) {
      return 'File type not supported. Please upload PDF, DOCX, JPG, or PNG files.';
    }

    if (file.size > maxSize) {
      return 'File size too large. Maximum size is 10MB.';
    }

    return null;
  };

  const handleFileSelect = useCallback((selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles: ContractFile[] = [];
    const errors: string[] = [];

    Array.from(selectedFiles).forEach((file) => {
      const error = validateFile(file);
      if (error) {
        errors.push(`${file.name}: ${error}`);
      } else {
        newFiles.push({
          id: Math.random().toString(36).substr(2, 9),
          name: file.name,
          size: file.size,
          type: file.type,
          uploadedAt: new Date(),
          contractType: 'upload'
        });
      }
    });

    if (errors.length > 0) {
      alert(errors.join('\n'));
    }

    if (newFiles.length > 0) {
      setFiles(prev => [...prev, ...newFiles]);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  }, [handleFileSelect]);

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const handleContinue = async () => {
    if (files.length === 0) return;

    setIsUploading(true);
    
    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsUploading(false);
    onSuccess(files);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return '📄';
    if (type.includes('word') || type.includes('document')) return '📝';
    if (type.includes('image')) return '🖼️';
    return '📁';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <img
              src="/assets/New project.svg"
              alt=""
              className="w-14 h-14"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cGF0aCBkPSJNMTIgNVYxOU0xOSAxMkg1IiBzdHJva2U9IiNmOTczMjIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=";
              }}
            />
            <div>
              <h2 className="text-gray-900" style={{ fontSize: "20px", fontWeight: "800" }}>
                Upload your contract
              </h2>
              <p className="text-gray-600 mt-1" style={{ fontSize: "14px" }}>
                We'll review your contract template and prepare it for signing with your selected supplier
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Upload Area */}
          <div
            className={`text-center transition-colors ${
              isDragOver 
                ? 'border-green-500 bg-green-50' 
                : ''
            }`}
            style={{
              borderRadius: "var(--CornerRadius, 8px)",
              border: isDragOver ? "2px dashed #10b981" : "1px dashed var(--Colours-BorderDark, #D3D7DC)",
              background: isDragOver ? "#f0fdf4" : "var(--Colours-ContainerBgGrey, #F9FAFB)",
              padding: "20px"
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-900 mb-2" style={{ fontSize: "14px" }}>
              <span className="text-green-600 cursor-pointer hover:text-green-700">
                Upload a file
              </span>
            </p>
            <p className="text-gray-900 mb-2" style={{ fontSize: "14px" }}>
              or drag and drop
            </p>
            <p className="text-[#1E2832]" style={{ fontSize: "14px" }}>
              PDF, DOCX, JPG or PNG up to 10MB
            </p>
            <input
              type="file"
              multiple
              accept=".pdf,.docx,.jpg,.jpeg,.png"
              onChange={(e) => handleFileSelect(e.target.files)}
              className="hidden"
              id="contract-file-input"
            />
            <label htmlFor="contract-file-input" className="cursor-pointer">
              <div className="mt-4"></div>
            </label>
          </div>

          {/* Selected Files */}
          {files.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-bold text-gray-900 mb-3">Selected Files ({files.length})</h3>
              <div className="space-y-2">
                {files.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <File className="w-5 h-5 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{file.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(file.id)}
                      className="p-1 hover:bg-gray-200 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center gap-4 px-6 pb-6">
          <Button variant="neutral" onClick={onClose} className="min-w-[300px]">
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleContinue}
            disabled={files.length === 0 || isUploading}
            className="min-w-[300px]"
          >
            {isUploading ? 'Uploading...' : 'Upload Contract'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContractUploadModal;
