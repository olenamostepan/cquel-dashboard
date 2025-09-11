"use client";

import React, { useState } from "react";
import Card from "@/components/ui/Card";
import ContractItemCard, { ContractItemCardProps } from "@/components/dashboard/ContractItemCard";
import ContractSuccessBanner from "@/components/upload/ContractSuccessBanner";
import { ExternalLink } from "lucide-react";

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
const ReadyToCreateSection: React.FC<{ onActionClick: (action: string, contractId: string) => void }> = ({ onActionClick }) => {
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

      {/* Active Contracts Section */}
      <div>
        <h3 className="text-[18px] font-bold text-[var(--text-primary)] mb-4">Active Contracts</h3>
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

// Generated Contracts Section
const GeneratedContractsSection: React.FC<{ onActionClick: (action: string, contractId: string) => void }> = ({ onActionClick }) => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-[18px] font-bold text-[var(--text-primary)] mb-4">Generated Contracts</h3>
        <div className="space-y-3">
          <ContractItemCard
            id="contract-6"
            projectName="Frankfurt EV Charging"
            location="Frankfurt • AutoCorp"
            contractFileInfo="EV_Charging_Contract.pdf for ChargePoint Solutions"
            status="your-action"
            dateIssued="Generated 14 Dec 2024"
            actionType="accept"
            actionButtonText="Send for signature"
            companyName="ChargePoint Solutions"
            solutionType="ev-charging"
            onActionClick={onActionClick}
          />
          <ContractItemCard
            id="contract-7"
            projectName="Cologne Smart Metering"
            location="Cologne • EnergyCorp"
            contractFileInfo="Smart_Meter_Agreement.docx for MeterTech GmbH"
            status="cquel-action"
            dateIssued="Generated 13 Dec 2024"
            actionType="download"
            actionButtonText="Review contract"
            companyName="MeterTech GmbH"
            solutionType="led"
            onActionClick={onActionClick}
          />
        </div>
      </div>
    </div>
  );
};

const ContractsView: React.FC = () => {
  const [activeContractTab, setActiveContractTab] = useState("ready");
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [successBannerData, setSuccessBannerData] = useState<{
    contractCount: number;
    contractType: 'upload' | 'request-help';
    projectName?: string;
  } | null>(null);

  // Contract action handler
  const handleContractAction = (action: string, contractId: string) => {
    console.log(`Contract action: ${action} for contract: ${contractId}`);
    // Handle different contract actions here
    switch (action) {
      case 'upload-success':
        console.log('Contract uploaded successfully');
        setSuccessBannerData({
          contractCount: 1,
          contractType: 'upload',
          projectName: 'Contract Project'
        });
        setShowSuccessBanner(true);
        break;
      case 'request-help':
        console.log('Requesting CQuel help for contract creation');
        setSuccessBannerData({
          contractCount: 1,
          contractType: 'request-help',
          projectName: 'Contract Project'
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
    </div>
  );
};

export default ContractsView;
