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
      description: "Send your own contact",
      icon: "/assets/accept.svg"
    },
    {
      value: "request-help",
      label: "Request help",
      description: "CQuel will create contact",
      icon: "/assets/change.svg"
    }
  ];

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="text-[14px] font-bold focus:outline-none flex items-center justify-between w-full whitespace-nowrap"
        style={{
          display: "flex",
          width: "220px",
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
          style={{ width: "220px" }}
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
                <img
                  src={action.icon}
                  alt=""
                  className="w-5 h-5 object-contain"
                  style={{ filter: "brightness(0) saturate(100%) invert(70%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%) contrast(100%)" }}
                />
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

// Status Badge Component (matching app-wide ResponsibilityBadge styling)
const StatusBadge: React.FC<{ status: 'your-action' | 'cquel-action' | 'supplier-action' | 'completed'; customMessage?: string }> = ({ status, customMessage }) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'your-action':
        return {
          label: "Your Action",
          background: '#fdeee9',
          text: '#e9571f',
          border: '#fbddd2'
        };
      case 'cquel-action':
        return {
          label: customMessage || "CQuel's Action",
          background: '#eaf8f1',
          text: '#126e53',
          border: '#d4f0e3'
        };
      case 'supplier-action':
        return {
          label: "Supplier Action",
          background: '#e8f1f8',
          text: '#004b75',
          border: '#d2e3f2'
        };
      case 'completed':
        return {
          label: "Completed",
          background: '#eaf8f1',
          text: '#126e53',
          border: '#d4f0e3'
        };
      default:
        return {
          label: "Unknown",
          background: '#f3f4f6',
          text: '#6b7280',
          border: '#d1d5db'
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span
      className="px-2 py-0.5 rounded-full text-[12px] font-bold border whitespace-nowrap"
      style={{
        backgroundColor: config.background,
        color: config.text,
        borderColor: config.border
      }}
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
  solutionType?: 'led' | 'solar' | 'heat-pumps' | 'ev-charging';
  isHighlighted?: boolean;
  isSimplified?: boolean;
  isActiveContracts?: boolean;
  statusMessage?: string;
  onActionClick?: (action: string, contractId: string, projectName?: string) => void;
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
  solutionType = 'led',
  isHighlighted = false,
  isSimplified = false,
  isActiveContracts = false,
  statusMessage,
  onActionClick
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const getSolutionIcon = (type: string) => {
    switch (type) {
      case 'led':
        return '/assets/led.svg';
      case 'solar':
        return '/assets/solar.svg';
      case 'heat-pumps':
        return '/assets/heat pumps.svg';
      case 'ev-charging':
        return '/assets/ev charging.svg';
      default:
        return '/assets/led.svg';
    }
  };

  const handleActionClick = (action?: string) => {
    if (onActionClick) {
      onActionClick(action || actionType, id, projectName);
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
          <ContractUploadDropdown
            isOpen={dropdownOpen}
            onToggle={() => setDropdownOpen(!dropdownOpen)}
            onSelect={(action) => {
              if (action === 'upload-contract') {
                setIsUploadModalOpen(true);
              } else if (action === 'request-help') {
                handleActionClick('request-help');
              }
            }}
          />
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

  // Active Contracts simplified version - icon, project info, badge, and status text
  if (isActiveContracts) {
    return (
      <div 
        className="flex items-center p-4 border rounded-lg transition-colors hover:shadow-sm bg-white border-[var(--border-default)]"
        style={{ 
          height: "100px",
          borderRadius: "var(--CornerRadius, 8px)",
          border: "1px solid var(--Colours-BorderDark, #D3D7DC)",
          background: "var(--Colours-ContainerBg, #FFF)"
        }}
      >
        {/* LEFT SECTION - Project Info */}
        <div className="flex items-center flex-shrink-0 min-w-0" style={{ width: "300px" }}>
          {/* Solution Icon */}
          <div className="w-14 h-14 flex items-center justify-center mr-4 flex-shrink-0">
            <img
              src={getSolutionIcon(solutionType)}
              alt={solutionType}
              className="w-14 h-14 object-contain"
            />
          </div>

          {/* Project Details */}
          <div className="flex-1 min-w-0">
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
        </div>

        {/* CENTER SECTION - Status Badge (Fixed Position) */}
        <div className="flex items-center justify-center flex-shrink-0" style={{ width: "200px", marginLeft: "50px" }}>
          <StatusBadge status={status} customMessage="CQuel's Action" />
        </div>

        {/* RIGHT SECTION - Date and Status Text (Right-aligned to far edge) */}
        <div 
          style={{ 
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-end",
            flex: "1 0 0",
            alignSelf: "stretch"
          }}
        >
          <div className="text-[12px] text-[var(--text-secondary)] mb-1">
            Sent on 21 Aug 25
          </div>
          <div className="text-[14px] text-[var(--text-primary)]">
            {statusMessage}
          </div>
        </div>
      </div>
    );
  }

  if (isSimplified) {
    return (
      <div 
        className="flex items-center p-4 border rounded-lg transition-colors hover:shadow-sm bg-white border-[var(--border-default)]"
        style={{ 
          height: "100px",
          borderRadius: "var(--CornerRadius, 8px)",
          border: "1px solid var(--Colours-BorderDark, #D3D7DC)",
          background: "var(--Colours-ContainerBg, #FFF)"
        }}
      >
        {/* LEFT SECTION - Project Info */}
        <div className="flex items-center flex-shrink-0 min-w-0" style={{ width: "300px" }}>
          {/* Solution Icon */}
          <div className="w-14 h-14 flex items-center justify-center mr-4 flex-shrink-0">
            <img
              src={getSolutionIcon(solutionType)}
              alt={solutionType}
              className="w-14 h-14 object-contain"
            />
          </div>

          {/* Project Details */}
          <div className="flex-1 min-w-0">
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
        </div>

        {/* CENTER SECTION - Status Badge (Fixed Position) */}
        <div className="flex items-center justify-center flex-shrink-0" style={{ width: "200px", marginLeft: "50px" }}>
          <StatusBadge status={status} />
        </div>

        {/* RIGHT SECTION - Action Button (Right-aligned to far edge) */}
        <div className="flex-shrink-0 ml-auto">
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
  }

  return (
    <div
      className={`flex items-center p-4 border rounded-lg transition-colors hover:shadow-sm ${
        isHighlighted ? 'bg-green-50 border-green-200' : 'bg-white border-[var(--border-default)]'
      }`}
      style={{
        height: "100px",
        borderRadius: "var(--CornerRadius, 8px)",
        border: isHighlighted ? "1px solid #D4F0E3" : "1px solid var(--Colours-BorderDark, #D3D7DC)",
        background: isHighlighted ? "var(--Colours-BgGreen, #EAF8F1)" : "var(--Colours-ContainerBg, #FFF)"
      }}
    >
        {/* LEFT SECTION - Project Info */}
        <div className="flex items-center flex-shrink-0 min-w-0" style={{ width: "300px" }}>
          {/* Solution Icon */}
          <div className="w-14 h-14 flex items-center justify-center mr-4 flex-shrink-0">
            <img
              src={getSolutionIcon(solutionType)}
              alt={solutionType}
              className="w-14 h-14 object-contain"
            />
          </div>

          {/* Project Details */}
          <div className="flex-1 min-w-0">
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
          <div className="text-[14px] text-[var(--text-primary)] truncate mt-1">{contractFileInfo}</div>
        </div>
      </div>

        {/* CENTER SECTION - Status Badge (Fixed Position) */}
        <div className="flex items-center justify-center flex-shrink-0" style={{ width: "200px", marginLeft: "50px" }}>
          <StatusBadge status={status} />
        </div>

        {/* RIGHT SECTION - Date + Action Button (Right-aligned to far edge) */}
        <div className="flex flex-col items-end flex-shrink-0 ml-auto">
          <div className="text-[12px] text-[var(--text-secondary)] mb-2">{dateIssued}</div>
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
