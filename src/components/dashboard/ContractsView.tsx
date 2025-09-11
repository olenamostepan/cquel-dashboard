"use client";

import React, { useState } from "react";
import Card from "@/components/ui/Card";
import ContractItemCard, { ContractItemCardProps } from "@/components/dashboard/ContractItemCard";
import ContractSuccessBanner from "@/components/upload/ContractSuccessBanner";
import ContractUploadModal from "@/components/upload/ContractUploadModal";
import ContractRequestHelpModal from "@/components/upload/ContractRequestHelpModal";
import AcceptContractModal from "@/components/upload/AcceptContractModal";
import ContractAcceptedModal from "@/components/upload/ContractAcceptedModal";
import DeclineContractModal from "@/components/upload/DeclineContractModal";
import { ExternalLink, ChevronDown, ChevronUp, Download } from "lucide-react";
import Button from "@/components/ui/Button";
import ResponsibilityBadge from "./ResponsibilityBadge";

// Advanced Action Dropdown Component - Exact copy from PricingView
const AdvancedActionDropdown: React.FC<{
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (action: string) => void;
}> = ({ isOpen, onToggle, onSelect }) => {
  const actions = [
    { 
      value: "accept", 
      label: "Accept contract", 
      description: "Approve and proceed",
      icon: "/assets/accept.svg"
    },
    { 
      value: "decline", 
      label: "Decline contract", 
      description: "Modify the contract",
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
        <span>Accept contract</span>
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

// Statistics Cards Component for Contracts
const ContractStatisticsCards: React.FC = () => {
  return (
    <div className="flex gap-5 w-full h-full">
      <Card elevated className="p-3 flex-1 h-full">
        <div className="flex flex-col items-start h-full">
          <div className="text-lg mb-auto">💰</div>
          <div className="text-[24px] font-extrabold text-[var(--text-primary)]">6</div>
          <div className="text-[14px] text-[var(--text-secondary)]">contracts uploaded</div>
        </div>
      </Card>
      
      <Card elevated className="p-3 flex-1 h-full">
        <div className="flex flex-col items-start h-full">
          <div className="text-lg mb-auto">⏰</div>
          <div className="text-[24px] font-extrabold text-[var(--text-primary)]">2</div>
          <div className="text-[14px] text-[var(--text-secondary)]">contracts signed</div>
        </div>
      </Card>
      
      <Card elevated className="p-3 flex-1 h-full">
        <div className="flex flex-col items-start h-full">
          <div className="text-lg mb-auto">✅</div>
          <div className="text-[24px] font-extrabold text-[var(--text-primary)]">2</div>
          <div className="text-[14px] text-[var(--text-secondary)]">contracts sent</div>
        </div>
      </Card>
    </div>
  );
};


// Tab Bar Component
const ContractTabBar: React.FC<{ activeTab: string; onTabChange: (tab: string) => void }> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex border-b border-[var(--Colours-BorderLight,#F3F4F6)] mb-6">
      <button
        onClick={() => onTabChange('ready')}
        className={`pl-0 pr-6 py-3 text-[14px] relative ${
          activeTab === 'ready' 
            ? 'text-[var(--text-primary)] font-bold' 
            : 'text-[var(--text-secondary)] font-normal'
        }`}
      >
        Ready to Create Contracts
        {activeTab === 'ready' && (
          <div className="absolute bottom-0 left-0 right-6 h-0.5 bg-[#29b273]"></div>
        )}
      </button>
      <button
        onClick={() => onTabChange('generated')}
        className={`px-6 py-3 text-[14px] relative ${
          activeTab === 'generated' 
            ? 'text-[var(--text-primary)] font-bold' 
            : 'text-[var(--text-secondary)] font-normal'
        }`}
      >
        Generated Contracts
        {activeTab === 'generated' && (
          <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-[#29b273]"></div>
        )}
      </button>
    </div>
  );
};

// Ready to Create Contracts Section
const ReadyToCreateSection: React.FC<{ onActionClick: (action: string, contractId: string, projectName?: string) => void }> = ({ onActionClick }) => {
  return (
    <div className="space-y-8">
      {/* Needs Attention Section */}
      <div>
        <h3 className="text-[18px] font-bold text-[var(--text-primary)] mb-4">Needs attention</h3>
        <div className="space-y-3">
          <ContractItemCard
            id="contract-1"
            projectName="Hamburg Office HVAC"
            location="Hamburg • TechCorp"
            contractFileInfo="Contract.zip for Heat Pumps LTD"
            status="your-action"
            dateIssued="Issued 15 Dec 2024"
            actionType="upload"
            actionButtonText="Upload Contract"
            companyName="Heat Pumps LTD"
            solutionType="heat-pumps"
            isHighlighted={false}
            isSimplified={true}
            onActionClick={onActionClick}
          />
        </div>
      </div>

      {/* Active Projects Section */}
      <div>
        <h3 className="text-[18px] font-bold text-[var(--text-primary)] mb-4">Active Projects</h3>
        <div className="space-y-3">
          <ContractItemCard
            id="contract-3"
            projectName="Leeds Retail HVAC"
            location="Leeds • ShopCentre"
            contractFileInfo=""
            status="cquel-action"
            dateIssued=""
            actionType="create"
            actionButtonText=""
            companyName="ClimateControl Ltd"
            solutionType="heat-pumps"
            isActiveContracts={true}
            statusMessage="CQuel is creating contract draft"
            onActionClick={onActionClick}
          />
          <ContractItemCard
            id="contract-4"
            projectName="Birmingham Warehouse Solar"
            location="Birmingham • LogisPark"
            contractFileInfo=""
            status="cquel-action"
            dateIssued=""
            actionType="create"
            actionButtonText=""
            companyName="GreenEnergy Corp"
            solutionType="solar"
            isActiveContracts={true}
            statusMessage="CQuel is reviewing your contract"
            onActionClick={onActionClick}
          />
        </div>
      </div>

    </div>
  );
};

// Contract Card Component - Exact copy of PricingCard structure
interface ContractCardProps {
  id: string;
  projectName: string;
  location: string;
  responsibility?: "your" | "cquel" | "supplier" | "accepted";
  _fileName: string;
  status: string;
  actionButton?: string;
  showDropdown?: boolean;
  solutionType?: "solar" | "heat-pumps" | "led" | "ev-charging";
  isActiveProject?: boolean;
  isAccepted?: boolean;
  onActionClick?: (action: string, contractId: string, projectName?: string) => void;
}

const ContractCard: React.FC<ContractCardProps> = ({ 
  id,
  projectName, 
  location, 
  responsibility, 
  _fileName, 
  status, 
  actionButton,
  showDropdown = false,
  solutionType,
  isActiveProject = false,
  isAccepted = false,
  onActionClick
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getSolutionIcon = (type?: string) => {
    switch (type) {
      case "solar":
        return "/assets/solar.svg";
      case "heat-pumps":
        return "/assets/heat pumps.svg";
      case "led":
        return "/assets/led.svg";
      case "ev-charging":
        return "/assets/ev charging.svg";
      default:
        return "/assets/solar.svg"; // default fallback
    }
  };

  return (
    <div className="flex items-center justify-between p-4" style={{ 
      height: "100px",
      borderRadius: "var(--CornerRadius, 8px)",
      border: "1px solid var(--Colours-BorderDark, #D3D7DC)",
      background: "var(--Colours-ContainerBg, #FFF)"
    }}>
      {/* Project Icon */}
      <div className="w-14 h-14 flex items-center justify-center mr-4 flex-shrink-0">
        <img
          src={getSolutionIcon(solutionType)}
          alt=""
          className="w-14 h-14 object-contain"
        />
      </div>

      {/* Project Info */}
      <div className="flex-1 min-w-0 max-w-[200px] mr-20">
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

      {/* Responsibility Badge */}
      <div className="w-[100px] mr-12 flex-shrink-0">
        {responsibility && responsibility !== "accepted" ? (
          <ResponsibilityBadge responsibility={responsibility} />
        ) : (
          <div className="h-6"></div>
        )}
      </div>

      {/* File Name and Download Link */}
      <div className="flex-1 min-w-0 max-w-[280px] mr-12">
        <div className="flex items-center gap-2 mb-1">
          <Download size={16} className="text-[var(--text-tertiary)] shrink-0" />
          <div className="text-[14px] font-bold text-[var(--text-primary)]">Contract.zip</div>
          <span className="text-[12px] text-[var(--text-secondary)]">from {_fileName.split(" from ")[1]}</span>
        </div>
        <div className="mt-1 ml-6">
          <a 
            href="#" 
            className="text-[14px] font-bold text-[var(--link-blue)] hover:underline"
            onClick={(e) => e.preventDefault()}
          >
            Download & Review
          </a>
        </div>
      </div>

      {/* Issues Due and Action Dropdown */}
      <div className="flex flex-col items-start gap-2 ml-3 flex-shrink-0" style={{ width: "220px" }}>
        {isAccepted ? (
          <div className="text-[14px] text-[var(--text-secondary)]">
            Accepted
          </div>
        ) : isActiveProject ? (
          <div 
            style={{ 
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flex: "1 0 0",
              alignSelf: "stretch"
            }}
          >
            <div className="text-[12px] text-[var(--text-secondary)] text-right">
              Sent on 21 Aug 25
            </div>
            <div className="text-[14px] text-[var(--text-secondary)] text-right">
              {status}
            </div>
          </div>
        ) : (
          <>
            <div className="text-[12px] text-[var(--text-secondary)]">
              <span>Issued on 21 Aug 25</span>
              <span className="inline-block w-1 h-1 bg-[#e9571f] rounded-full mx-1"></span>
              <span className="text-[#e9571f]">Due 21 Aug 25</span>
            </div>
            {showDropdown ? (
              <AdvancedActionDropdown 
                isOpen={dropdownOpen}
                onToggle={() => setDropdownOpen(!dropdownOpen)}
                onSelect={(action) => {
                  if (action === 'accept') {
                    onActionClick('accept-contract', id, projectName);
                  } else if (action === 'decline') {
                    onActionClick('decline-contract', id, projectName);
                  }
                }}
              />
            ) : (
              <Button variant="neutral" size="custom" className="w-[140px] whitespace-nowrap">
                {actionButton}
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// Generated Contracts Section - Needs Attention
const GeneratedNeedsAttentionSection: React.FC<{ onActionClick: (action: string, contractId: string, projectName?: string) => void }> = ({ onActionClick }) => {
  const contractItems = [
    {
      id: "1",
      projectName: "Rue de la République EV Charging",
      location: "85 Rue de la République, 69002 Lyon",
      responsibility: "your" as const,
      _fileName: "Contract.zip from Heat Pumps LTD",
      status: "Ready for your review",
      showDropdown: true,
      solutionType: "ev-charging" as const
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-[18px] font-bold text-[var(--text-primary)] mb-6">Needs Attention</h2>
      <div className="space-y-4">
        {contractItems.map((item, index) => (
          <ContractCard key={index} {...item} onActionClick={onActionClick} />
        ))}
      </div>
    </div>
  );
};

// Generated Contracts Section - Active Projects
const GeneratedActiveProjectsSection: React.FC<{ onActionClick: (action: string, contractId: string, projectName?: string) => void }> = ({ onActionClick }) => {
  const contractItems = [
    {
      id: "2",
      projectName: "Avenue Victor Hugo Solar PV",
      location: "120 Avenue Victor Hugo, 75116 Paris",
      responsibility: "cquel" as const,
      _fileName: "Contract.zip from Solar Solutions LTD",
      status: "CQuel preparing new contract version",
      solutionType: "solar" as const
    },
    {
      id: "3",
      projectName: "Friedrichstraße HVAC",
      location: "Friedrichstraße 44, 10117 Berlin",
      responsibility: "cquel" as const,
      _fileName: "Contract.zip from Heat Pumps LTD",
      status: "CQuel preparing new contract version",
      solutionType: "heat-pumps" as const
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-[18px] font-bold text-[var(--text-primary)] mb-6">Active Projects</h2>
      <div className="space-y-4">
        {contractItems.map((item, index) => (
          <ContractCard key={index} {...item} isActiveProject={true} onActionClick={onActionClick} />
        ))}
      </div>
    </div>
  );
};

// Generated Contracts Section - Accepted
const GeneratedAcceptedSection: React.FC<{ onActionClick: (action: string, contractId: string, projectName?: string) => void }> = ({ onActionClick }) => {
  const contractItems = [
    {
      id: "4",
      projectName: "Argyle Street EV Charging",
      location: "36 Argyle Street, Glasgow, G2 8BX",
      responsibility: "accepted" as const,
      _fileName: "Contract.zip from EV Solutions LTD",
      status: "Accepted",
      solutionType: "ev-charging" as const
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-[18px] font-bold text-[var(--text-primary)] mb-6">Accepted</h2>
      <div className="space-y-4">
        {contractItems.map((item, index) => (
          <ContractCard key={index} {...item} isAccepted={true} onActionClick={onActionClick} />
        ))}
      </div>
    </div>
  );
};

// Generated Contracts Section
const GeneratedContractsSection: React.FC<{ onActionClick: (action: string, contractId: string, projectName?: string) => void }> = ({ onActionClick }) => {
  return (
    <div className="space-y-6">
      <GeneratedNeedsAttentionSection onActionClick={onActionClick} />
      <GeneratedActiveProjectsSection onActionClick={onActionClick} />
      <GeneratedAcceptedSection onActionClick={onActionClick} />
    </div>
  );
};

const ContractsView: React.FC = () => {
  const [activeContractTab, setActiveContractTab] = useState("ready");
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [successBannerData, setSuccessBannerData] = useState<{
    contractCount: number;
    contractType: 'upload' | 'request-help' | 'decline';
    projectName?: string;
  } | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isRequestHelpModalOpen, setIsRequestHelpModalOpen] = useState(false);
  const [isAcceptContractModalOpen, setIsAcceptContractModalOpen] = useState(false);
  const [currentContractId, setCurrentContractId] = useState<string>("");
  const [currentProjectName, setCurrentProjectName] = useState<string>("");
  const [currentContractData, setCurrentContractData] = useState<{
    supplier: string;
    projectName: string;
    contractId: string;
    projectId: string;
  } | null>(null);
  const [isContractAcceptedModalOpen, setIsContractAcceptedModalOpen] = useState(false);
  const [acceptedContractData, setAcceptedContractData] = useState<{
    fileName: string;
    downloadUrl: string;
    projectName: string;
    supplier: string;
  } | null>(null);
  const [isDeclineContractModalOpen, setIsDeclineContractModalOpen] = useState(false);
  const [declinedContractData, setDeclinedContractData] = useState<{
    contractId: string;
    projectName: string;
    supplier: string;
    projectId: string;
  } | null>(null);

  // Contract action handler
  const handleContractAction = (action: string, contractId: string, projectName?: string) => {
    console.log(`Contract action: ${action} for contract: ${contractId}`);
    // Handle different contract actions here
    switch (action) {
      case 'upload-contract':
        setCurrentContractId(contractId);
        setCurrentProjectName(projectName || 'Contract Project');
        setIsUploadModalOpen(true);
        break;
      case 'request-help':
        setCurrentContractId(contractId);
        setCurrentProjectName(projectName || 'Contract Project');
        setIsRequestHelpModalOpen(true);
        break;
      case 'accept-contract':
        // Set contract data for the modal
        setCurrentContractData({
          supplier: 'Heat Pumps LTD', // This should come from contract data
          projectName: projectName || 'Contract Project',
          contractId: contractId,
          projectId: contractId // Using contractId as projectId for now
        });
        setIsAcceptContractModalOpen(true);
        break;
      case 'decline-contract':
        // Set contract data for the decline modal
        setDeclinedContractData({
          contractId: contractId,
          projectName: projectName || 'Contract Project',
          supplier: 'Heat Pumps LTD', // This should come from contract data
          projectId: 'project-1' // This should come from contract data
        });
        setIsDeclineContractModalOpen(true);
        break;
      case 'upload-success':
        console.log('Contract uploaded successfully');
        setSuccessBannerData({
          contractCount: 1,
          contractType: 'upload',
          projectName: 'Contract Project'
        });
        setShowSuccessBanner(true);
        break;
      case 'request-help-success':
        console.log('Help request sent successfully');
        setSuccessBannerData({
          contractCount: 1,
          contractType: 'request-help',
          projectName: currentProjectName
        });
        setShowSuccessBanner(true);
        break;
      case 'accept-contract-success':
        console.log('Contract accepted successfully');
        setSuccessBannerData({
          contractCount: 1,
          contractType: 'upload', // Using upload type for now
          projectName: currentContractData?.projectName || 'Contract Project'
        });
        setShowSuccessBanner(true);
        break;
      case 'download-success':
        console.log('Contract downloaded successfully');
        break;
      case 'download-error':
        console.log('Contract download failed');
        break;
      case 'accept':
        console.log('Accepting contract');
        break;
      case 'create':
        console.log('Creating new contract');
        break;
      default:
        console.log('Unknown action:', action);
    }
  };

  // Contract acceptance handler
  const handleAcceptContract = async (contractId: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Set up contract data for success modal
      if (currentContractData) {
        setAcceptedContractData({
          fileName: `${currentContractData.projectName.replace(/\s+/g, '_')}_Contract_Final.pdf`,
          downloadUrl: `/api/contracts/${contractId}/download`,
          projectName: currentContractData.projectName,
          supplier: currentContractData.supplier
        });
        setIsContractAcceptedModalOpen(true);
      }
      
      // Close the accept modal
      setIsAcceptContractModalOpen(false);
    } catch (error) {
      console.error('Error accepting contract:', error);
      throw error;
    }
  };

  // Contract decline handler
  const handleDeclineContract = async (contractId: string, feedback: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log(`Contract ${contractId} declined with feedback: ${feedback}`);
      
      // Close the decline modal
      setIsDeclineContractModalOpen(false);
      setDeclinedContractData(null);
      
      // Show success banner
      setSuccessBannerData({
        contractCount: 1,
        contractType: 'decline',
        projectName: declinedContractData?.projectName || 'Contract Project'
      });
      setShowSuccessBanner(true);
      
      // Note: In a real application, this would trigger a state update
      // to move the contract from its current location to the Generated Contracts tab
      // and update its status to "CQuel preparing new contract version"
      
    } catch (error) {
      console.error('Error declining contract:', error);
      throw error;
    }
  };

  // Contract download handler
  const handleDownloadContract = async (downloadUrl: string, fileName: string) => {
    try {
      // Simulate file download
      const blob = new Blob(['Contract content'], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      console.log(`Downloaded contract: ${fileName}`);
    } catch (error) {
      console.error('Error downloading contract:', error);
      throw error;
    }
  };

  // Return to dashboard handler
  const handleReturnToDashboard = () => {
    setIsContractAcceptedModalOpen(false);
    setAcceptedContractData(null);
    // Refresh contracts list or update UI as needed
  };

  return (
    <div className="space-y-6" style={{ marginTop: "32px" }}>
      {/* Header with Statistics and Latest Updates Widget */}
      <div className="flex gap-6 justify-between">
        {/* Left Container - Title and Statistics Cards */}
        <div className="flex-1 flex flex-col">
          <h2 className="text-[24px] font-extrabold text-[var(--text-primary)] mb-6">
            Welcome back Gemma
          </h2>
          <div className="flex gap-5 flex-1">
            <ContractStatisticsCards />
          </div>
        </div>
        
        {/* Right Container - Latest Updates Widget */}
        <div>
          <Card elevated className="p-5" style={{ width: "450px" }}>
            <div className="text-[20px] font-extrabold text-[var(--text-primary)]">Latest updates</div>
            <div className="mt-3 rounded-lg border border-[#D2E3F2] bg-[#E8F1F8] p-5">
              <div className="grid grid-cols-2 gap-6">
                {/* Left: icon on top, text below */}
                <div className="flex flex-col">
                  <span className="text-[28px] leading-none mb-auto">🕐</span>
                  <div>
                    <div className="text-[14px] text-[var(--text-secondary)]">Contract:</div>
                    <div className="mt-2 text-[16px] font-bold text-[var(--text-primary)]">Ready for your review</div>
                    <div className="mt-1 text-[12px] font-normal text-[var(--text-primary)]">2 hours ago</div>
                  </div>
                </div>

                {/* Right: supplier + project */}
                <div className="min-w-0">
                  <div className="text-[14px] text-[var(--text-secondary)]">Supplier:</div>
                  <div className="mt-1 flex items-center gap-2">
                    <div className="text-[16px] font-bold text-[var(--text-primary)] truncate">Solar House LTD</div>
                    <ExternalLink size={18} className="text-[var(--text-tertiary)] shrink-0" />
                  </div>
                  <div className="my-3 h-px bg-[var(--border-light)]" />
                  <div className="text-[14px] text-[var(--text-secondary)]">Project:</div>
                  <div className="mt-1 text-[14px] font-bold text-[var(--text-primary)] truncate">Stuttgart Office LED</div>
                  <div className="mt-1 text-[14px] text-[var(--text-secondary)] truncate">Berlin • AroundTown</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white border border-[var(--border-light)] rounded-lg p-6">
        <h2 className="text-[20px] font-extrabold text-[var(--text-primary)] mb-6">
          All Contracts
        </h2>
        
        {/* Tab Bar */}
        <ContractTabBar activeTab={activeContractTab} onTabChange={setActiveContractTab} />
        
        {/* Tab Content */}
        <div>
          {/* Success Banner */}
          {successBannerData && (
            <ContractSuccessBanner
              isVisible={showSuccessBanner}
              onDismiss={() => setShowSuccessBanner(false)}
              contractCount={successBannerData.contractCount}
              contractType={successBannerData.contractType}
              projectName={successBannerData.projectName}
            />
          )}
          
          {activeContractTab === 'ready' && <ReadyToCreateSection onActionClick={handleContractAction} />}
          {activeContractTab === 'generated' && <GeneratedContractsSection onActionClick={handleContractAction} />}
        </div>
      </div>

      {/* Contract Upload Modal */}
      <ContractUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSuccess={(files) => {
          console.log('Contract files uploaded:', files);
          setIsUploadModalOpen(false);
          handleContractAction('upload-success', currentContractId);
        }}
        contractId={currentContractId}
        projectName="Contract Project"
        companyName="Company Name"
      />

      {/* Contract Request Help Modal */}
      <ContractRequestHelpModal
        isOpen={isRequestHelpModalOpen}
        onClose={() => setIsRequestHelpModalOpen(false)}
        onSendRequest={(projectId, projectName) => {
          console.log('Help request sent for project:', projectName);
          setIsRequestHelpModalOpen(false);
          handleContractAction('request-help-success', projectId, projectName);
        }}
        projectId={currentContractId}
        projectName={currentProjectName}
        companyName="Company Name"
      />

      {/* Accept Contract Modal */}
      {currentContractData && (
        <AcceptContractModal
          isOpen={isAcceptContractModalOpen}
          onClose={() => setIsAcceptContractModalOpen(false)}
          contractData={currentContractData}
          onAccept={handleAcceptContract}
        />
      )}

      {/* Contract Accepted Success Modal */}
      {acceptedContractData && (
        <ContractAcceptedModal
          isOpen={isContractAcceptedModalOpen}
          contractData={acceptedContractData}
          onReturnToDashboard={handleReturnToDashboard}
          onDownloadContract={handleDownloadContract}
        />
      )}

      {/* Decline Contract Modal */}
      {declinedContractData && (
        <DeclineContractModal
          isOpen={isDeclineContractModalOpen}
          onClose={() => {
            setIsDeclineContractModalOpen(false);
            setDeclinedContractData(null);
          }}
          contractData={declinedContractData}
          onDeclineContract={handleDeclineContract}
        />
      )}
    </div>
  );
};

export default ContractsView;
