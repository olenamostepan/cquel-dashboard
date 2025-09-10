"use client";

import React, { useState, useCallback } from "react";
import { Upload, File, Trash2, FileText, Download } from "lucide-react";
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
  const [uploadType, setUploadType] = useState<'upload' | 'request-help'>('upload');

  const validateFile = (file: File): string | null => {
    const allowedTypes = [
      'application/pdf', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'text/plain',
      'image/jpeg', 
      'image/png'
    ];
    const maxSize = 15 * 1024 * 1024; // 15MB for contracts

    if (!allowedTypes.includes(file.type)) {
      return 'File type not supported. Please upload PDF, DOC, DOCX, TXT, JPG, or PNG files.';
    }

    if (file.size > maxSize) {
      return 'File size too large. Maximum size is 15MB.';
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
    if (uploadType === 'request-help') {
      // Handle request help flow
      setIsUploading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsUploading(false);
      
      // Create a placeholder file for the help request
      const helpRequestFile: ContractFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: `Contract_Help_Request_${contractId || 'new'}.txt`,
        size: 0,
        type: 'text/plain',
        uploadedAt: new Date(),
        contractType: 'generated'
      };
      
      onSuccess([helpRequestFile]);
      return;
    }

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
        <div className="flex items-center justify-between p-6 border-b border-[var(--border-light)]">
          <div>
            <h2 className="text-[20px] font-bold text-[var(--text-primary)]">
              Upload Contract
            </h2>
            {projectName && (
              <p className="text-[14px] text-[var(--text-secondary)] mt-1">
                {projectName} • {companyName}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
          >
            <span className="text-[18px] text-[var(--text-secondary)]">×</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Upload Type Selection */}
          <div className="mb-6">
            <h3 className="text-[16px] font-bold text-[var(--text-primary)] mb-3">
              Choose upload method:
            </h3>
            <div className="space-y-3">
              <label className="flex items-center p-4 border border-[var(--border-light)] rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="uploadType"
                  value="upload"
                  checked={uploadType === 'upload'}
                  onChange={(e) => setUploadType(e.target.value as 'upload')}
                  className="mr-3"
                />
                <div>
                  <div className="text-[14px] font-bold text-[var(--text-primary)]">
                    Upload your own contract
                  </div>
                  <div className="text-[12px] text-[var(--text-secondary)]">
                    Upload a contract file you've prepared
                  </div>
                </div>
              </label>
              
              <label className="flex items-center p-4 border border-[var(--border-light)] rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="uploadType"
                  value="request-help"
                  checked={uploadType === 'request-help'}
                  onChange={(e) => setUploadType(e.target.value as 'request-help')}
                  className="mr-3"
                />
                <div>
                  <div className="text-[14px] font-bold text-[var(--text-primary)]">
                    Request help from CQuel
                  </div>
                  <div className="text-[12px] text-[var(--text-secondary)]">
                    CQuel will create the contract for you
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* File Upload Area */}
          {uploadType === 'upload' && (
            <div className="mb-6">
              <h3 className="text-[16px] font-bold text-[var(--text-primary)] mb-3">
                Select contract files:
              </h3>
              
              {/* Drop Zone */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  isDragOver 
                    ? 'border-[var(--brand-primary)] bg-blue-50' 
                    : 'border-[var(--border-default)] hover:border-[var(--brand-primary)]'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <Upload className="w-12 h-12 text-[var(--text-tertiary)] mx-auto mb-4" />
                <p className="text-[16px] font-bold text-[var(--text-primary)] mb-2">
                  Drop files here or click to browse
                </p>
                <p className="text-[14px] text-[var(--text-secondary)] mb-4">
                  PDF, DOC, DOCX, TXT, JPG, PNG (max 15MB each)
                </p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileSelect(e.target.files)}
                  className="hidden"
                  id="contract-file-input"
                />
                <label
                  htmlFor="contract-file-input"
                  className="inline-block px-4 py-2 bg-[var(--brand-primary)] text-white rounded-lg cursor-pointer hover:bg-[var(--brand-primary-dark)] transition-colors"
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
          )}

          {/* Help Request Info */}
          {uploadType === 'request-help' && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="text-[14px] font-bold text-blue-800 mb-1">
                    CQuel Contract Creation
                  </h4>
                  <p className="text-[12px] text-blue-700">
                    Our team will create a professional contract for this project. 
                    You'll receive a notification when it's ready for review.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-[var(--border-light)]">
          <Button
            variant="neutral"
            onClick={onClose}
            disabled={isUploading}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleContinue}
            disabled={isUploading || (uploadType === 'upload' && files.length === 0)}
          >
            {isUploading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {uploadType === 'request-help' ? 'Requesting Help...' : 'Uploading...'}
              </div>
            ) : (
              uploadType === 'request-help' ? 'Request Help' : 'Upload Contract'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContractUploadModal;
