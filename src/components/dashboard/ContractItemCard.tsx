"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import Avatar from "@/components/ui/Avatar";
import { ExternalLink, ChevronDown, ChevronUp, Download, Upload, FileText } from "lucide-react";
import ContractUploadModal from "@/components/upload/ContractUploadModal";
import ContractDownloadHandler from "@/components/upload/ContractDownloadHandler";

// Contract Upload Dropdown Component
const ContractUploadDropdown: React.FC<{
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (action: string) => void;
}> = ({ isOpen, onToggle, onSelect }) => {
  const actions = [
    { 
      value: "upload-contract", 
      label: "Upload contract", 
      description: "Send your own contract",
      icon: Upload
    },
    { 
      value: "request-help", 
      label: "Request help", 
      description: "CQuel will create contract",
      icon: FileText
    }
  ];

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="text-[14px] font-bold focus:outline-none flex items-center justify-between w-full whitespace-nowrap"
        style={{ 
          display: "flex",
          width: "180px",
          padding: "var(--Distance-8, 8px) var(--Distance-12, 12px)",
          justifyContent: "space-between",
          alignItems: "center",
          alignSelf: "stretch",
          borderRadius: "var(--Distance-8, 8px)",
          border: "1px solid var(--Colours-BorderDark, #D3D7DC)",
          background: "var(--Colours-ContainerBgGrey, #F9FAFB)"
        }}
      >
        <span>Upload Contract</span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-[var(--text-tertiary)]" />
        ) : (
          <ChevronDown className="w-4 h-4 text-[var(--text-tertiary)]" />
        )}
      </button>
      
      {isOpen && (
        <div 
          className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-lg z-10"
          style={{ width: "180px" }}
        >
          {actions.map((action) => (
            <button
              key={action.value}
              className="w-full text-left px-3 py-3 hover:bg-[#e8f1f8] hover:text-[#004b75] focus:outline-none flex items-start gap-3 transition-colors"
              onClick={() => {
                onSelect(action.value);
                onToggle();
              }}
            >
              <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                <action.icon className="w-4 h-4 text-[var(--text-tertiary)]" />
              </div>
              <div className="flex flex-col items-start">
                <div className="text-[14px] font-bold text-[var(--text-primary)]">
                  {action.label}
                </div>
                <div className="text-[12px] text-[var(--text-secondary)]">
                  {action.description}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Status Badge Component
const StatusBadge: React.FC<{ status: 'your-action' | 'cquel-action' | 'supplier-action' | 'completed' }> = ({ status }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'your-action':
        return {
          label: "Your Action",
          className: "bg-orange-100 text-orange-800 border-orange-200"
        };
      case 'cquel-action':
        return {
          label: "CQuel's Action",
          className: "bg-blue-100 text-blue-800 border-blue-200"
        };
      case 'supplier-action':
        return {
          label: "Supplier Action",
          className: "bg-purple-100 text-purple-800 border-purple-200"
        };
      case 'completed':
        return {
          label: "Completed",
          className: "bg-green-100 text-green-800 border-green-200"
        };
      default:
        return {
          label: "Unknown",
          className: "bg-gray-100 text-gray-800 border-gray-200"
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span 
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${config.className}`}
    >
      {config.label}
    </span>
  );
};

// Contract Item Card Component
export interface ContractItemCardProps {
  id: string;
  projectName: string;
  location: string;
  contractFileInfo: string;
  status: 'your-action' | 'cquel-action' | 'supplier-action' | 'completed';
  dateIssued: string;
  actionType: 'upload' | 'download' | 'accept' | 'create';
  actionButtonText: string;
  companyName: string;
  companyLogo?: string;
  isHighlighted?: boolean;
  onActionClick?: (action: string, contractId: string) => void;
}

export const ContractItemCard: React.FC<ContractItemCardProps> = ({
  id,
  projectName,
  location,
  contractFileInfo,
  status,
  dateIssued,
  actionType,
  actionButtonText,
  companyName,
  companyLogo,
  isHighlighted = false,
  onActionClick
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const handleActionClick = (action?: string) => {
    if (onActionClick) {
      onActionClick(action || actionType, id);
    }
  };

  const handleUploadSuccess = (files: any[]) => {
    console.log('Contract files uploaded:', files);
    setIsUploadModalOpen(false);
    // Handle successful upload
    handleActionClick('upload-success');
  };

  const handleDownloadSuccess = (contractId: string) => {
    console.log('Contract downloaded:', contractId);
    handleActionClick('download-success');
  };

  const handleDownloadError = (error: string) => {
    console.error('Download error:', error);
    handleActionClick('download-error');
  };

  const renderActionButton = () => {
    switch (actionType) {
      case 'upload':
        return (
          <Button 
            variant="neutral" 
            size="custom" 
            className="w-[140px] whitespace-nowrap flex items-center gap-2"
            onClick={() => setIsUploadModalOpen(true)}
          >
            <Upload className="w-4 h-4" />
            {actionButtonText}
          </Button>
        );
      case 'download':
        return (
          <ContractDownloadHandler
            contractId={id}
            fileName={contractFileInfo.split(' for ')[0] || 'contract.pdf'}
            fileType="application/pdf"
            fileSize={1024000}
            onDownload={handleDownloadSuccess}
            onError={handleDownloadError}
          />
        );
      case 'accept':
        return (
          <Button 
            variant="primary" 
            size="custom" 
            className="w-[140px] whitespace-nowrap"
            onClick={() => handleActionClick()}
          >
            {actionButtonText}
          </Button>
        );
      case 'create':
        return (
          <Button 
            variant="neutral" 
            size="custom" 
            className="w-[140px] whitespace-nowrap"
            onClick={() => handleActionClick()}
          >
            {actionButtonText}
          </Button>
        );
      default:
        return (
          <Button 
            variant="neutral" 
            size="custom" 
            className="w-[140px] whitespace-nowrap"
            onClick={() => handleActionClick()}
          >
            {actionButtonText}
          </Button>
        );
    }
  };

  return (
    <div 
      className={`flex items-center justify-between p-4 border rounded-lg transition-colors hover:shadow-sm ${
        isHighlighted ? 'bg-green-50 border-green-200' : 'bg-white border-[var(--border-default)]'
      }`}
      style={{ 
        height: "100px",
        borderRadius: "var(--CornerRadius, 8px)",
        border: isHighlighted ? "1px solid #D4F0E3" : "1px solid var(--Colours-BorderDark, #D3D7DC)",
        background: isHighlighted ? "var(--Colours-BgGreen, #EAF8F1)" : "var(--Colours-ContainerBg, #FFF)"
      }}
    >
      {/* Company Avatar */}
      <div className="w-14 h-14 flex items-center justify-center mr-4 flex-shrink-0">
        <Avatar 
          name={companyName} 
          src={companyLogo} 
          size={56}
        />
      </div>

      {/* Project Info */}
      <div className="flex-1 min-w-0 max-w-[200px] mr-6">
        <div className="flex items-center gap-2 mb-1">
          <div 
            className="text-[14px] font-bold text-[var(--text-primary)] truncate cursor-pointer hover:text-[var(--brand-primary)]"
            onClick={() => {
              window.location.href = `/?tab=project-detail&projectId=${id}&sourceTab=contracts`;
            }}
          >
            {projectName}
          </div>
          <ExternalLink size={16} className="text-[var(--text-tertiary)] shrink-0" />
        </div>
        <div className="text-[12px] text-[var(--text-secondary)] truncate">{location}</div>
      </div>

      {/* Contract File Info */}
      <div className="flex-1 min-w-0 max-w-[200px] mr-6">
        <div className="text-[14px] text-[var(--text-primary)] truncate">{contractFileInfo}</div>
      </div>

      {/* Status Badge */}
      <div className="flex items-center justify-center flex-shrink-0 w-[120px] mr-6">
        <StatusBadge status={status} />
      </div>

      {/* Date Issued */}
      <div className="flex-1 min-w-0 max-w-[120px] mr-6">
        <div className="text-[12px] text-[var(--text-secondary)]">{dateIssued}</div>
      </div>

      {/* Action Button */}
      <div className="ml-3 flex-shrink-0">
        {renderActionButton()}
      </div>

      {/* Upload Modal */}
      <ContractUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSuccess={handleUploadSuccess}
        contractId={id}
        projectName={projectName}
        companyName={companyName}
      />
    </div>
  );
};

export default ContractItemCard;
