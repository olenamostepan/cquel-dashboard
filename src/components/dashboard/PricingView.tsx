import React, { useState } from "react";
import { ExternalLink, ChevronDown, ChevronUp, Download } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import ResponsibilityBadge from "./ResponsibilityBadge";

// Statistics Cards Component
const PricingStatisticsCards: React.FC = () => {
  return (
    <div className="flex gap-5 w-full h-full">
      <Card elevated className="flex-1 h-full p-3">
        <div className="flex flex-col h-full">
          <div className="text-lg mb-auto">💰</div>
          <div className="text-[24px] font-extrabold text-[var(--text-primary)]">6</div>
          <div className="text-[14px] text-[var(--text-secondary)]">pricing documents received</div>
        </div>
      </Card>
      
      <Card elevated className="flex-1 h-full p-3">
        <div className="flex flex-col h-full">
          <div className="text-lg mb-auto">⏰</div>
          <div className="text-[24px] font-extrabold text-[var(--text-primary)]">2.1</div>
          <div className="text-[14px] text-[var(--text-secondary)]">days avg review time</div>
        </div>
      </Card>
      
      <Card elevated className="flex-1 h-full p-3">
        <div className="flex flex-col h-full">
          <div className="text-lg mb-auto">✅</div>
          <div className="text-[24px] font-extrabold text-[var(--text-primary)]">95%</div>
          <div className="text-[14px] text-[var(--text-secondary)]">approval rate</div>
        </div>
      </Card>
    </div>
  );
};

// Advanced Action Dropdown Component
const AdvancedActionDropdown: React.FC<{
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (action: string) => void;
}> = ({ isOpen, onToggle, onSelect }) => {
  const actions = [
    { 
      value: "accept", 
      label: "Accept pricing", 
      description: "Approve and proceed",
      icon: "/assets/accept.svg"
    },
    { 
      value: "request-change", 
      label: "Request a change", 
      description: "Modify the proposal",
      icon: "/assets/change.svg"
    },
    { 
      value: "negotiate", 
      label: "Negotiate a price", 
      description: "Discuss pricing terms",
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
        <span>Actions</span>
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

// Pricing Card Component
interface PricingCardProps {
  id: string;
  projectName: string;
  location: string;
  responsibility?: "your" | "supplier" | "accepted";
  _fileName: string;
  status: string;
  actionButton?: string;
  showDropdown?: boolean;
  solutionType?: "solar" | "heat-pumps" | "led" | "ev-charging";
  isActiveProject?: boolean;
  isAccepted?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({ 
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
  isAccepted = false
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
          window.location.href = `/?tab=project-detail&projectId=${id}&sourceTab=pricing`;
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
          <div className="text-[14px] font-bold text-[var(--text-primary)]">Pricing Pack.zip</div>
          <span className="text-[12px] text-[var(--text-secondary)]">from Heat Pumps LTD</span>
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
          <>
            <div className="text-[12px] text-[var(--text-secondary)]">
              Sent on 21 Aug 25
            </div>
            <div className="text-[14px] text-[var(--text-secondary)]">
              {status}
            </div>
          </>
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
                onSelect={(action) => console.log(`Selected action: ${action}`)}
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

// Search and Filter Bar Component
const SearchFilterBar: React.FC = () => {
  const [statusOpen, setStatusOpen] = useState(false);
  const [_selectedStatus, setSelectedStatus] = useState<string>("");

  const statusOptions = [
    { value: "needs-attention", label: "Needs Attention" },
    { value: "active", label: "Active Projects" },
    { value: "accepted", label: "Accepted" }
  ];

  return (
    <div className="flex items-center justify-between mb-6">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search pricing documents..."
        className="w-[300px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
        style={{
          padding: "var(--Distance-8, 8px) var(--Distance-12, 12px)",
          borderRadius: "var(--Distance-8, 8px)",
          border: "1px solid var(--Colours-BorderDark, #D3D7DC)",
          background: "var(--Colours-ContainerBgGrey, #F9FAFB)"
        }}
      />

      {/* Filter Dropdown */}
      <div className="relative">
        <button
          onClick={() => setStatusOpen(!statusOpen)}
          className="text-[14px] font-bold focus:outline-none flex items-center justify-between w-full whitespace-nowrap"
          style={{ 
            display: "flex",
            width: "160px",
            padding: "var(--Distance-8, 8px) var(--Distance-12, 12px)",
            justifyContent: "space-between",
            alignItems: "center",
            alignSelf: "stretch",
            borderRadius: "var(--Distance-8, 8px)",
            border: "1px solid var(--Colours-BorderDark, #D3D7DC)",
            background: "var(--Colours-ContainerBgGrey, #F9FAFB)"
          }}
        >
          <span>Filter by: Status</span>
          {statusOpen ? (
            <ChevronUp className="w-4 h-4 text-[var(--text-tertiary)]" />
          ) : (
            <ChevronDown className="w-4 h-4 text-[var(--text-tertiary)]" />
          )}
        </button>
        
        {statusOpen && (
          <div 
            className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-lg z-10"
            style={{ width: "160px" }}
          >
            {statusOptions.map((option) => (
              <button
                key={option.value}
                className="w-full text-left px-3 py-2 text-[14px] hover:bg-[var(--Colours-ContainerBgGrey, #F9FAFB)] focus:outline-none"
                onClick={() => {
                  setSelectedStatus(option.value);
                  setStatusOpen(false);
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Needs Attention Section
const NeedsAttentionSection: React.FC = () => {
  const pricingItems = [
    {
      id: "1",
      projectName: "Rue de la République EV Charging",
      location: "85 Rue de la République, 69002 Lyon",
      responsibility: "your" as const,
      _fileName: "Pricing Pack.zip from Heat Pumps LTD",
      status: "Ready for your review",
      showDropdown: true,
      solutionType: "ev-charging" as const
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-[18px] font-bold text-[var(--text-primary)] mb-6">Needs Attention</h2>
      <div className="space-y-4">
        {pricingItems.map((item, index) => (
          <PricingCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

// Active Projects Section
const ActiveProjectsSection: React.FC = () => {
  const pricingItems = [
    {
      id: "2",
      projectName: "Avenue Victor Hugo Solar PV",
      location: "120 Avenue Victor Hugo, 75116 Paris",
      responsibility: "supplier" as const,
      _fileName: "Pricing Pack.zip from Solar Solutions LTD",
      status: "Awaiting revised quote",
      solutionType: "solar" as const
    },
    {
      id: "3",
      projectName: "Friedrichstraße HVAC",
      location: "Friedrichstraße 44, 10117 Berlin",
      responsibility: "supplier" as const,
      _fileName: "Pricing Pack.zip from Heat Pumps LTD",
      status: "Preparing detailed breakdown",
      solutionType: "heat-pumps" as const
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-[18px] font-bold text-[var(--text-primary)] mb-6">Active Projects</h2>
      <div className="space-y-4">
        {pricingItems.map((item, index) => (
          <PricingCard key={index} {...item} isActiveProject={true} />
        ))}
      </div>
    </div>
  );
};

// Accepted Section
const AcceptedSection: React.FC = () => {
  const pricingItems = [
    {
      id: "4",
      projectName: "Argyle Street EV Charging",
      location: "36 Argyle Street, Glasgow, G2 8BX",
      responsibility: "accepted" as const,
      _fileName: "Pricing Pack.zip from EV Solutions LTD",
      status: "Accepted",
      solutionType: "ev-charging" as const
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-[18px] font-bold text-[var(--text-primary)] mb-6">Accepted</h2>
      <div className="space-y-4">
        {pricingItems.map((item, index) => (
          <PricingCard key={index} {...item} isAccepted={true} />
        ))}
      </div>
    </div>
  );
};

export const PricingView: React.FC = () => {
  return (
    <div className="space-y-6" style={{ marginTop: "32px" }}>
      {/* Header with Statistics and Latest Updates Widget */}
      <div className="flex gap-6 justify-between">
        {/* Left Container - Title and Statistics Cards */}
        <div className="flex-1 flex flex-col">
                  <h2 className="text-[24px] font-extrabold text-[var(--text-primary)] mb-6">
                                                 Welcome back Gideon
        </h2>
          <div className="flex gap-5 flex-1">
            <PricingStatisticsCards />
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
                  <span className="text-[28px] leading-none mb-auto">⏰</span>
                  <div>
                    <div className="text-[14px] text-[var(--text-secondary)]">Final pricing pack:</div>
                    <div className="mt-2 text-[16px] font-bold text-[var(--text-primary)]">Ready for your review</div>
                    <div className="mt-1 text-[12px] font-normal text-[var(--text-primary)]">2 hours ago • Due in 2 months</div>
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

      {/* Main Content - All Pricing */}
      <div className="bg-white rounded-lg border border-[var(--border-light)] p-6">
        <h2 className="text-[20px] font-extrabold text-[var(--text-primary)] mb-6">
          All Pricing
        </h2>
        
        {/* Search and Filter Bar */}
        <SearchFilterBar />
        
        {/* Pricing Sections */}
        <div className="space-y-6 mt-6">
          <NeedsAttentionSection />
          <ActiveProjectsSection />
          <AcceptedSection />
        </div>
      </div>
    </div>
  );
};

export default PricingView;
