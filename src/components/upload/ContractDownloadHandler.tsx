"use client";

import React, { useState } from "react";
import { Download, FileText, AlertCircle, CheckCircle } from "lucide-react";
import Button from "@/components/ui/Button";

interface ContractDownloadHandlerProps {
  contractId: string;
  fileName: string;
  fileType: string;
  fileSize?: number;
  onDownload?: (contractId: string) => void;
  onError?: (error: string) => void;
}

export const ContractDownloadHandler: React.FC<ContractDownloadHandlerProps> = ({
  contractId,
  fileName,
  fileType,
  fileSize,
  onDownload,
  onError
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'downloading' | 'success' | 'error'>('idle');

  const handleDownload = async () => {
    setIsDownloading(true);
    setDownloadStatus('downloading');

    try {
      // Simulate download process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate file download
      const blob = new Blob(['Contract content'], { type: fileType });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setDownloadStatus('success');
      onDownload?.(contractId);
      
      // Reset status after 2 seconds
      setTimeout(() => setDownloadStatus('idle'), 2000);
    } catch (error) {
      setDownloadStatus('error');
      onError?.(`Failed to download ${fileName}`);
      
      // Reset status after 3 seconds
      setTimeout(() => setDownloadStatus('idle'), 3000);
    } finally {
      setIsDownloading(false);
    }
  };

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return '📄';
    if (type.includes('word') || type.includes('document')) return '📝';
    if (type.includes('image')) return '🖼️';
    return '📁';
  };

  const formatFileSize = (bytes?: number): string => {
    if (!bytes) return '';
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return ` • ${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  const getStatusIcon = () => {
    switch (downloadStatus) {
      case 'downloading':
        return <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Download className="w-4 h-4" />;
    }
  };

  const getButtonText = () => {
    switch (downloadStatus) {
      case 'downloading':
        return 'Downloading...';
      case 'success':
        return 'Downloaded';
      case 'error':
        return 'Retry';
      default:
        return 'Download & Review';
    }
  };

  const getButtonVariant = (): "primary" | "secondary" | "ghost" | "neutral" => {
    switch (downloadStatus) {
      case 'success':
        return 'secondary';
      case 'error':
        return 'ghost';
      default:
        return 'neutral';
    }
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <span className="text-[16px]">{getFileIcon(fileType)}</span>
        <div className="min-w-0 flex-1">
          <div className="text-[12px] font-bold text-[var(--text-primary)] truncate">
            {fileName}
          </div>
          <div className="text-[10px] text-[var(--text-secondary)]">
            {fileType.toUpperCase()}{formatFileSize(fileSize)}
          </div>
        </div>
      </div>
      
      <Button
        variant={getButtonVariant()}
        size="custom"
        className="w-[140px] whitespace-nowrap flex items-center gap-2"
        onClick={handleDownload}
        disabled={isDownloading}
      >
        {getStatusIcon()}
        {getButtonText()}
      </Button>
    </div>
  );
};

export default ContractDownloadHandler;
