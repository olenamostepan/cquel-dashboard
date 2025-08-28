import React from "react";
import { ExternalLink } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// Statistics Cards Component for Tenders
const TenderStatisticsCards: React.FC = () => {
  return (
    <div className="flex gap-5 w-full h-full">
      <Card elevated className="p-3 flex-1 h-full">
        <div className="flex flex-col items-start h-full">
          <div className="text-lg mb-auto">📊</div>
          <div className="text-[24px] font-extrabold text-[var(--text-primary)]">12</div>
          <div className="text-[14px] text-[var(--text-secondary)]">Active tenders</div>
        </div>
      </Card>
      
      <Card elevated className="p-3 flex-1 h-full">
        <div className="flex flex-col items-start h-full">
          <div className="text-lg mb-auto">⏰</div>
          <div className="text-[24px] font-extrabold text-[var(--text-primary)]">5.3</div>
          <div className="text-[14px] text-[var(--text-secondary)]">days avg response</div>
          <div className="text-[9px] text-[var(--text-tertiary)] mt-1">Last 30 days</div>
        </div>
      </Card>
      
      <Card elevated className="p-3 flex-1 h-full">
        <div className="flex flex-col items-start h-full">
          <div className="text-lg mb-auto">⚡</div>
          <div className="text-[24px] font-extrabold text-[var(--text-primary)]">78%</div>
          <div className="text-[14px] text-[var(--text-secondary)]">response rate</div>
          <div className="text-[9px] text-[var(--text-tertiary)] mt-1">Industry avg: 65%</div>
        </div>
      </Card>
    </div>
  );
};

// Responsibility Badge Component (reused from AllProjectsView)
const ResponsibilityBadge: React.FC<{ type: 'your' | 'cquel' | 'supplier' }> = ({ type }) => {
  const styles = {
    your: {
      background: '#fdeee9',
      text: '#e9571f',
      border: '#fbddd2'
    },
    cquel: {
      background: '#eaf8f1',
      text: '#126e53',
      border: '#d4f0e3'
    },
    supplier: {
      background: '#e8f1f8',
      text: '#004b75',
      border: '#d2e3f2'
    }
  };

  const labels = {
    your: 'Your Action',
    cquel: "CQuel's Action",
    supplier: "Supplier Action"
  };

  const style = styles[type];
  
  return (
    <span
      className="px-2 py-0.5 rounded-full text-[12px] font-bold border whitespace-nowrap"
      style={{
        backgroundColor: style.background,
        color: style.text,
        borderColor: style.border
      }}
    >
      {labels[type]}
    </span>
  );
};

// Tender Card Component
const TenderCard: React.FC<{
  id: string;
  projectName: string;
  location: string;
  responsibility: 'your' | 'cquel' | 'supplier';
  status: string;
  actionButton: string;
  solutionType: 'led' | 'solar' | 'heat-pumps' | 'ev-charging';
  hideResponsibility?: boolean;
}> = ({ id, projectName, location, responsibility, status, actionButton, solutionType, hideResponsibility = false }) => {
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

  return (
    <div 
      className="flex items-center justify-between p-4 border border-[var(--border-default)] rounded-lg bg-white"
      style={{ height: "72px" }}
    >
      <div className="flex items-center gap-4 flex-1">
        {/* Solution Type Icon */}
        <div className="w-14 h-14 flex items-center justify-center flex-shrink-0">
          <img
            src={getSolutionIcon(solutionType)}
            alt={solutionType}
            className="w-14 h-14 object-contain"
          />
        </div>
        
        {/* Project Info */}
        <div className="flex-1 min-w-0 max-w-[200px] mr-20">
          <div className="flex items-center gap-2 mb-1">
                            <span 
                  className="text-[14px] font-bold text-[var(--text-primary)] truncate cursor-pointer hover:text-[var(--brand-primary)]"
                          onClick={() => {
          window.location.href = `/?tab=project-detail&projectId=${id}&sourceTab=tenders`;
        }}
                >
                  {projectName}
                </span>
            <ExternalLink className="w-3 h-3 text-[var(--text-tertiary)] flex-shrink-0" />
          </div>
          <div className="text-[12px] text-[var(--text-secondary)] truncate">{location}</div>
        </div>
        
        {/* Responsibility Badge */}
        {!hideResponsibility && (
          <div className="flex items-center justify-center flex-shrink-0 w-[100px] mr-12">
            <ResponsibilityBadge type={responsibility} />
          </div>
        )}
        
        {/* Status */}
        <div className="text-[14px] text-[var(--text-primary)] w-[280px] flex-shrink-0">
          {status}
        </div>
      </div>
      
      {/* Action Button */}
      {actionButton && (
        <div className="ml-3 flex-shrink-0">
          <Button 
            variant="neutral" 
            size="custom" 
            className="w-[140px] whitespace-nowrap"
            onClick={() => {
              if (actionButton === "Go to Results" || actionButton === "Go to Tender results") {
                window.location.href = `/?tab=tender-results`;
              }
            }}
          >
            {actionButton}
          </Button>
        </div>
      )}
    </div>
  );
};

// Search and Filter Bar Component
const SearchFilterBar: React.FC = () => {
  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        {/* Search Input */}
        <div className="relative" style={{ width: "300px" }}>
          <input
            type="text"
            placeholder="Search tenders..."
            className="w-full px-4 text-[14px] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
            style={{ 
              height: "40px", 
              padding: "var(--Distance-8, 8px) var(--Distance-12, 12px)",
              borderRadius: "var(--Distance-8, 8px)",
              border: "1px solid var(--Colours-BorderDark, #D3D7DC)",
              background: "var(--Colours-ContainerBgGrey, #F9FAFB)"
            }}
          />
        </div>
        
        {/* Filter Dropdown */}
        <div className="flex gap-4">
          <div className="relative">
            <button
              className="text-[14px] font-bold focus:outline-none flex items-center justify-between whitespace-nowrap"
              style={{ 
                display: "flex",
                width: "160px",
                padding: "var(--Distance-8, 8px) var(--Distance-12, 12px)",
                justifyContent: "space-between",
                alignItems: "center",
                alignSelf: "stretch",
                borderRadius: "var(--Distance-8, 8px)",
                border: "1px solid var(--Colours-BorderDark, #D3D7DC)",
                background: "var(--Colours-ContainerBgGrey, #F9FAFB)",
                color: "var(--text-primary)"
              }}
            >
              <span>Filter by: Next Step</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Needs Attention Section
const NeedsAttentionSection: React.FC = () => {
  const tenders = [
    {
      id: "1",
      projectName: "Stuttgart Office LED",
      location: "Berlin • AroundTown",
      responsibility: "your" as const,
      status: "Meeting with Supplier scheduled on 13:00 25 Aug 2025",
      actionButton: "",
      solutionType: "led" as const
    },
    {
      id: "2",
      projectName: "Sonnenstraße Solar PV",
      location: "Sonnenstraße 19, 80331 München",
      responsibility: "your" as const,
      status: "Choosing Supplier",
      actionButton: "Go to Results",
      solutionType: "solar" as const
    },
    {
      id: "3",
      projectName: "Avenue Victor Hugo LED",
      location: "120 Avenue Victor Hugo, 75116 Paris",
      responsibility: "your" as const,
      status: "Scheduling a meeting with Supplier",
      actionButton: "",
      solutionType: "led" as const
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-[18px] font-bold text-[var(--text-primary)] mb-6">Needs Attention</h2>
      <div className="space-y-4">
        {tenders.map((tender, index) => (
          <TenderCard key={index} {...tender} />
        ))}
      </div>
    </div>
  );
};

// Active Tenders Section
const ActiveTendersSection: React.FC = () => {
  const tenders = [
    {
      id: "4",
      projectName: "Liverpool Office EV Charging",
      location: "Liverpool • MerseyCorp",
      responsibility: "supplier" as const,
      status: "Gathering Responses",
      actionButton: "",
      solutionType: "ev-charging" as const
    },
    {
      id: "5",
      projectName: "Bristol Retail Heat Pumps",
      location: "Bristol • GreenSpace",
      responsibility: "supplier" as const,
      status: "Preparing Quotes",
      actionButton: "",
      solutionType: "heat-pumps" as const
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-[18px] font-bold text-[var(--text-primary)] mb-6">Active Tenders</h2>
      <div className="space-y-4">
        {tenders.map((tender, index) => (
          <TenderCard key={index} {...tender} />
        ))}
      </div>
    </div>
  );
};

// Tendering Complete Section
const TenderingCompleteSection: React.FC = () => {
  const tenders = [
    {
      id: "6",
      projectName: "Newcastle Facility Solar",
      location: "Newcastle • IndustrialPark",
      responsibility: "your" as const,
      status: "Meeting with Supplier happened on 25 Apr 2025",
      actionButton: "Go to Results",
      solutionType: "solar" as const
    },
    {
      id: "7",
      projectName: "Stuttgart Office Heat Pumps",
      location: "Berlin • AroundTown",
      responsibility: "your" as const,
      status: "Meeting with Supplier happened on 1 May 2025",
      actionButton: "Go to Results",
      solutionType: "heat-pumps" as const
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-[18px] font-bold text-[var(--text-primary)] mb-6">Tendering Complete</h2>
      <div className="space-y-4">
        {tenders.map((tender, index) => (
          <TenderCard key={index} {...tender} hideResponsibility={true} />
        ))}
      </div>
    </div>
  );
};

export const TendersView: React.FC = () => {
  return (
    <div className="space-y-6" style={{ marginTop: "32px" }}>
      {/* Header with Statistics and Meeting Widget */}
      <div className="flex gap-6 justify-between">
        {/* Left Container - Title and Statistics Cards */}
        <div className="flex-1 flex flex-col">
                  <h2 className="text-[24px] font-extrabold text-[var(--text-primary)] mb-6">
                                                 Welcome back, Michael
        </h2>
          <div className="flex gap-5 flex-1">
            <TenderStatisticsCards />
          </div>
        </div>
        
        {/* Right Container - Meeting Widget */}
        <div>
          <Card elevated className="p-5" style={{ width: "450px" }}>
              <div className="text-[20px] font-black text-[var(--text-primary)]">Your next meeting</div>
              <div className="mt-3 rounded-lg border border-[#D2E3F2] bg-[#E8F1F8] p-5">
                <div className="grid grid-cols-2 gap-6">
                  {/* Left: icon on top, text below */}
                  <div className="flex flex-col">
                    <span className="text-[28px] leading-none">⏰</span>
                    <div className="mt-4">
                      <div className="text-[14px] text-[var(--text-secondary)]">Date & Time:</div>
                      <div className="mt-2 text-[20px] font-extrabold text-[var(--text-primary)]">13:00 – 14:00</div>
                      <div className="mt-1 text-[16px] font-semibold text-[var(--text-primary)]">21 Aug 2025</div>
                    </div>
                  </div>

                  {/* Right: supplier + project */}
                  <div className="min-w-0">
                    <div className="text-[14px] text-[var(--text-secondary)]">Supplier:</div>
                    <div className="mt-1 flex items-center gap-2">
                      <div className="text-[16px] font-bold text-[var(--text-primary)] truncate">EcoTech Systems</div>
                      <ExternalLink size={18} className="text-[var(--text-tertiary)] shrink-0" />
                    </div>
                    <div className="my-3 h-px bg-[var(--border-light)]" />
                    <div className="text-[14px] text-[var(--text-secondary)]">Project:</div>
                    <div className="mt-1 text-[14px] font-bold text-[var(--text-primary)] truncate">Munich Warehouse Solar</div>
                    <div className="mt-1 text-[14px] text-[var(--text-secondary)] truncate">Munich • LogiCorp</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

      {/* Main Content - All Tenders */}
      <div className="bg-white rounded-lg border border-[var(--border-light)] p-6">
        <h2 className="text-[20px] font-extrabold text-[var(--text-primary)] mb-6">
          All Tenders
        </h2>
        
        {/* Search and Filter Bar */}
        <SearchFilterBar />
        
        {/* Tender Sections */}
        <div className="space-y-6 mt-6">
          <NeedsAttentionSection />
          <ActiveTendersSection />
          <TenderingCompleteSection />
        </div>
      </div>
    </div>
  );
};

export default TendersView;
