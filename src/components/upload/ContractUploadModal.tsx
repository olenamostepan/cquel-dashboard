"use client";

import React, { useState, useCallback } from "react";
import { Upload, File, Trash2, FileText, Download, X } from "lucide-react";
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
      <div className="relative bg-white rounded-lg shadow-xl max-w-lg w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--border-light)]">
          <div className="flex items-center gap-4">
            {/* Cloud Icon with Document */}
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center relative">
              <FileText className="w-8 h-8 text-blue-600" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-sm flex items-center justify-center">
                <div className="w-2 h-2 bg-yellow-600 rounded-sm"></div>
              </div>
            </div>
            <div>
              <h2 className="text-[20px] font-bold text-[var(--text-primary)]">
                Upload your contract
              </h2>
              <p className="text-[14px] text-[var(--text-secondary)] mt-1">
                We'll review your contract template and prepare it for signing with your selected supplier
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-[var(--text-secondary)]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* File Upload Area */}
          <div className="mb-6">
            {/* Drop Zone */}
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragOver 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-gray-300 hover:border-green-500'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <p className="text-[16px] font-bold text-green-600 mb-2">
                Upload a file
              </p>
              <p className="text-[14px] text-gray-600 mb-4">
                or drag and drop
              </p>
              <p className="text-[12px] text-gray-500 mb-4">
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
              <label
                htmlFor="contract-file-input"
                className="inline-block px-4 py-2 bg-green-600 text-white rounded-lg cursor-pointer hover:bg-green-700 transition-colors"
              >
                Choose Files
              </label>
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                <h4 className="text-[14px] font-bold text-[var(--text-primary)]">
                  Selected Files ({files.length}):
                </h4>
                {files.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-[20px]">{getFileIcon(file.type)}</span>
                      <div>
                        <div className="text-[14px] font-bold text-[var(--text-primary)]">
                          {file.name}
                        </div>
                        <div className="text-[12px] text-[var(--text-secondary)]">
                          {formatFileSize(file.size)}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(file.id)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-red-100 rounded-full transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-[var(--border-light)]">
          <button
            onClick={onClose}
            disabled={isUploading}
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleContinue}
            disabled={isUploading || files.length === 0}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            {isUploading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Uploading...
              </div>
            ) : (
              'Upload'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContractUploadModal;
