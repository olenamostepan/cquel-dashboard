import React, { useState } from "react";
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import ResponsibilityBadge from "./ResponsibilityBadge";
import UploadModal from "@/components/upload/UploadModal";

import SuccessBanner from "@/components/upload/SuccessBanner";
import DocumentUploadsSection from "@/components/upload/DocumentUploadsSection";

// Brief Interface
interface Brief {
  id: string;
  name: string;
  location: string;
  type: 'HVAC' | 'Solar PV' | 'LED' | 'EV Charging';
  status: 'optimised' | 'generated' | 'published';
  courtStatus?: 'your' | 'cquel' | 'supplier';
  timestamp: string;
  action?: string;
}

// Briefs Metrics Section
const BriefsMetricsSection: React.FC<{ onStartNewProject: () => void }> = ({ onStartNewProject }) => {
  return (
    <div className="flex gap-6 mb-8">
      {/* Generated Briefs */}
      <Card elevated className="p-3" style={{ width: "280px" }}>
        <div className="flex flex-col items-start h-full">
          <div className="text-2xl mb-auto">📝</div>
          <div className="text-[24px] font-extrabold text-[var(--text-primary)]">12</div>
          <div className="text-[14px] text-[var(--text-secondary)]">generated briefs</div>
        </div>
      </Card>
      
      {/* Optimised Briefs */}
      <Card elevated className="p-3" style={{ width: "280px" }}>
        <div className="flex flex-col items-start h-full">
          <div className="text-2xl mb-auto">📈</div>
          <div className="text-[24px] font-extrabold text-[var(--text-primary)]">8</div>
          <div className="text-[14px] text-[var(--text-secondary)]">optimised briefs</div>
        </div>
      </Card>
      
      {/* Published Briefs */}
      <Card elevated className="p-3" style={{ width: "280px" }}>
        <div className="flex flex-col items-start h-full">
          <div className="text-2xl mb-auto">✅</div>
          <div className="text-[24px] font-extrabold text-[var(--text-primary)]">5</div>
          <div className="text-[14px] text-[var(--text-secondary)]">published briefs</div>
        </div>
      </Card>
      
      {/* Creating Brief CTA */}
      <Card elevated className="p-4" style={{
        width: "450px",
        background: "var(--Colours-BgGreen, #EAF8F1)",
        border: "1px solid var(--Colours-BorderGreen, #D4F0E3)"
      }}>
        <div className="flex flex-col items-start h-full">
          <div className="text-2xl mb-1">⚡</div>
          <div className="text-[18px] font-bold text-[var(--text-primary)] mb-1">Creating Brief</div>
          <div className="text-[14px] text-[var(--text-secondary)] mb-3 flex-grow">
            Upload your project documents to generate a brief ready for tendering
          </div>
          <Button 
            variant="primary" 
            className="w-full"
            style={{ background: "#29b273" }}
            onClick={onStartNewProject}
          >
            Start new project
          </Button>
        </div>
      </Card>
    </div>
  );
};

// Custom Dropdown Component
const CustomDropdown: React.FC<{ 
  options: { value: string; label: string }[];
  placeholder: string;
  isOpen?: boolean;
  onToggle?: () => void;
  onSelect?: (value: string, label: string) => void;
  selectedValue?: string;
}> = ({ options, placeholder, isOpen = false, onToggle, onSelect, selectedValue }) => {
  const selectedOption = options.find(opt => opt.value === selectedValue);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  return (
    <div className="relative">
      <button
        onClick={onToggle}
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
        <span>{displayText}</span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-[var(--text-tertiary)]" />
        ) : (
          <ChevronDown className="w-4 h-4 text-[var(--text-tertiary)]" />
        )}
      </button>
      
      {isOpen && (
        <div 
          className="absolute top-full left-0 right-0 mt-1 bg-white rounded-md shadow-lg z-10"
          style={{ width: "160px" }}
        >
          {options.map((option) => (
            <button
              key={option.value}
              className="w-full text-left px-3 py-2 text-[14px] hover:bg-[var(--Colours-ContainerBgGrey, #F9FAFB)] focus:outline-none"
              onClick={() => {
                onSelect?.(option.value, option.label);
                onToggle?.();
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Search and Filter Bar
const SearchFilterBar: React.FC = () => {
  const [courtOpen, setCourtOpen] = useState(false);
  const [solutionOpen, setSolutionOpen] = useState(false);
  const [nextStepOpen, setNextStepOpen] = useState(false);
  const [selectedCourt, setSelectedCourt] = useState<string>("");
  const [selectedSolution, setSelectedSolution] = useState<string>("");
  const [selectedNextStep, setSelectedNextStep] = useState<string>("");

  const courtOptions = [
    { value: "all", label: "All" },
    { value: "your-action", label: "Your Action" },
    { value: "cquel-action", label: "CQuel's Action" },
    { value: "supplier-action", label: "Supplier's Action" }
  ];

  const solutionOptions = [
    { value: "all", label: "All" },
    { value: "HVAC", label: "HVAC" },
    { value: "Solar PV", label: "Solar PV" },
    { value: "LED", label: "LED" },
    { value: "EV Charging", label: "EV Charging" }
  ];

  const nextStepOptions = [
    { value: "all", label: "All" },
    { value: "optimise", label: "Optimise Brief" },
    { value: "publish", label: "Publish Brief" },
    { value: "generating", label: "Generating" }
  ];

  return (
    <div className="flex items-center justify-between mb-6">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search..."
        className="text-[14px] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
        style={{
          width: "300px",
          padding: "var(--Distance-8, 8px) var(--Distance-12, 12px)",
          borderRadius: "var(--Distance-8, 8px)",
          border: "1px solid var(--Colours-BorderDark, #D3D7DC)",
          background: "var(--Colours-ContainerBgGrey, #F9FAFB)"
        }}
      />

      {/* Filters on the right */}
      <div className="flex items-center gap-4">
        {/* Court Filter */}
        <CustomDropdown
          options={courtOptions}
          placeholder="Action"
          isOpen={courtOpen}
          onToggle={() => setCourtOpen(!courtOpen)}
          onSelect={(value, _label) => {
            setSelectedCourt(value);
            setCourtOpen(false);
          }}
          selectedValue={selectedCourt}
        />

        {/* Solution Type Filter */}
        <CustomDropdown
          options={solutionOptions}
          placeholder="Solution Type"
          isOpen={solutionOpen}
          onToggle={() => setSolutionOpen(!solutionOpen)}
          onSelect={(value, _label) => {
            setSelectedSolution(value);
            setSolutionOpen(false);
          }}
          selectedValue={selectedSolution}
        />

        {/* Next Step Filter */}
        <CustomDropdown
          options={nextStepOptions}
          placeholder="Next Step"
          isOpen={nextStepOpen}
          onToggle={() => setNextStepOpen(!nextStepOpen)}
          onSelect={(value, _label) => {
            setSelectedNextStep(value);
            setNextStepOpen(false);
          }}
          selectedValue={selectedNextStep}
        />
      </div>
    </div>
  );
};

// Get Solution Icon
const getSolutionIcon = (type: string) => {
  switch (type) {
    case "HVAC":
      return "/assets/heat pumps.svg";
    case "Solar PV":
      return "/assets/solar.svg";
    case "LED":
      return "/assets/led.svg";
    case "EV Charging":
      return "/assets/ev charging.svg";
    default:
      return "/assets/heat pumps.svg";
  }
};

// Brief Card Component
const BriefCard: React.FC<{ brief: Brief }> = ({ brief }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg border" style={{ 
      height: "72px",
      borderRadius: "var(--CornerRadius, 8px)",
      border: "1px solid var(--Colours-BorderDark, #D3D7DC)",
      background: "var(--Colours-ContainerBg, #FFF)"
    }}>
      {/* Project Icon */}
      <div className="w-14 h-14 flex items-center justify-center mr-2 flex-shrink-0">
        <img
          src={getSolutionIcon(brief.type)}
          alt=""
          className="w-14 h-14 object-contain"
        />
      </div>

      {/* Project Info */}
      <div className="flex-1 min-w-0 max-w-[200px] mr-32">
        <div className="flex items-center gap-2 mb-1">
          <div 
            className="text-[14px] font-bold text-[var(--text-primary)] truncate cursor-pointer hover:text-[var(--brand-primary)]"
            onClick={() => {
              // Navigate to project detail page
              window.location.href = `/?tab=project-detail&projectId=${brief.id}&sourceTab=briefs`;
            }}
          >
            {brief.name}
          </div>
          <ExternalLink size={16} className="text-[var(--text-tertiary)] shrink-0" />
        </div>
        <div className="text-[12px] text-[var(--text-secondary)] truncate">{brief.location}</div>
      </div>

      {/* Responsibility Badge */}
      <div className="w-[100px] mr-12 flex-shrink-0">
        {brief.courtStatus ? (
          <ResponsibilityBadge responsibility={brief.courtStatus} />
        ) : (
          <div className="h-6"></div>
        )}
      </div>

      {/* Status */}
      <div className="flex-1 min-w-0 max-w-[280px] mr-12">
        <div className="text-[14px] text-[var(--text-secondary)]">{brief.timestamp}</div>
      </div>

      {/* Action Button */}
      <div className="ml-3 flex-shrink-0">
        {brief.action ? (
          <Button 
            variant="neutral" 
            size="custom" 
            className="w-[140px] whitespace-nowrap"
            onClick={() => {
              const briefBuilderUrl = `https://cquel-brief-builder.vercel.app/?briefId=${brief.id}&userId=456`;
              window.open(briefBuilderUrl, '_blank');
            }}
          >
            {brief.action}
          </Button>
        ) : (
          <div className="w-[140px]"></div>
        )}
      </div>
    </div>
  );
};

// Optimised Briefs Section
const OptimisedBriefsSection: React.FC = () => {
  const briefs: Brief[] = [
    {
      id: "1",
      name: "Manchester Office HVAC",
      location: "Manchester • TechHub",
      type: "HVAC",
      status: "optimised",
      courtStatus: "your",
      timestamp: "Optimised 14:30 26 Aug 2025",
      action: "Publish Brief"
    },
    {
      id: "2",
      name: "Birmingham Warehouse Solar",
      location: "Birmingham • LogisPark",
      type: "Solar PV",
      status: "optimised",
      courtStatus: "your",
      timestamp: "Optimised 16:45 27 Aug 2025",
      action: "Publish Brief"
    },
    {
      id: "3",
      name: "Edinburgh Data Centre LED",
      location: "Edinburgh • ScotTech",
      type: "LED",
      status: "optimised",
      courtStatus: "cquel",
      timestamp: "Updating 11:20 28 Aug 2025"
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-[18px] font-bold text-[var(--text-primary)] mb-6">Optimised Briefs ({briefs.length})</h2>
      <div className="space-y-2">
        {briefs.map((brief) => (
          <BriefCard key={brief.id} brief={brief} />
        ))}
      </div>
    </div>
  );
};

// Generated Briefs Section
const GeneratedBriefsSection: React.FC = () => {
  const briefs: Brief[] = [
    {
      id: "1",
      name: "Solar PV - Schenkendorfstraße",
      location: "München, DE",
      type: "Solar PV",
      status: "generated",
      courtStatus: "your",
      timestamp: "Created 10:30 30 Aug 2025",
      action: "Optimise Brief"
    },
    {
      id: "4",
      name: "Liverpool Office EV Charging",
      location: "Liverpool • MerseyCorp",
      type: "EV Charging",
      status: "generated",
      courtStatus: "your",
      timestamp: "Created 09:15 29 Aug 2025",
      action: "Optimise Brief"
    },
    {
      id: "5",
      name: "Bristol Retail Heat Pumps",
      location: "Bristol • GreenSpace",
      type: "HVAC",
      status: "generated",
      courtStatus: "cquel",
      timestamp: "Generating 15:10 25 Aug 2025"
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-[18px] font-bold text-[var(--text-primary)] mb-6">Generated Briefs ({briefs.length})</h2>
      <div className="space-y-2">
        {briefs.map((brief) => (
          <BriefCard key={brief.id} brief={brief} />
        ))}
      </div>
    </div>
  );
};



// Published Briefs Section
const PublishedBriefsSection: React.FC = () => {
  const briefs: Brief[] = [
    {
      id: "6",
      name: "Newcastle Facility Solar",
      location: "Newcastle • IndustrialPark",
      type: "Solar PV",
      status: "published",
      timestamp: "Published 15:10 25 May 2025",
      action: "Go to Brief"
    },
    {
      id: "7",
      name: "Stuttgart Office Heat Pumps",
      location: "Stuttgart • AroundTown",
      type: "HVAC",
      status: "published",
      timestamp: "Published 15:15 30 Apr 2025",
      action: "Go to Brief"
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-[18px] font-bold text-[var(--text-primary)] mb-6">Published Briefs ({briefs.length})</h2>
      <div className="space-y-2">
        {briefs.map((brief) => (
          <BriefCard key={brief.id} brief={brief} />
        ))}
      </div>
    </div>
  );
};

const BriefsView: React.FC<{ 
  onTabChange?: (handler: () => void) => void;
  showSuccessBanner?: boolean;
  onDismissSuccessBanner?: () => void;
  recentUpload?: {
    id: string;
    files: Array<{
      id: string;
      name: string;
      size: number;
      type: string;
      uploadedAt: Date;
    }>;
    status: 'processing' | 'completed' | 'error';
    uploadedAt: Date;
    userId: string;
    isHighlighted: boolean;
  } | null;
  onClearRecentUpload?: () => void;
  onStartNewProject?: () => void;
}> = ({ onTabChange, showSuccessBanner: externalShowSuccessBanner, onDismissSuccessBanner, recentUpload, onClearRecentUpload, onStartNewProject }) => {

  const [internalShowSuccessBanner, setInternalShowSuccessBanner] = useState(false);
  const showSuccessBanner = externalShowSuccessBanner !== undefined ? externalShowSuccessBanner : internalShowSuccessBanner;
  const setShowSuccessBanner = onDismissSuccessBanner || setInternalShowSuccessBanner;
  const [activeBriefsTab, setActiveBriefsTab] = useState("uploaded");
  const [uploads, setUploads] = useState<Array<{
    id: string;
    files: Array<{
      id: string;
      name: string;
      size: number;
      type: string;
      uploadedAt: Date;
    }>;
    status: 'uploading' | 'processing' | 'completed' | 'error';
    uploadedAt: Date;
    userId: string;
    isHighlighted?: boolean;
  }>>([
    {
      id: "default-1",
      files: [
        {
          id: "file-1",
          name: "Project_Plans.pdf",
          size: 2048576,
          type: "application/pdf",
          uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
        },
        {
          id: "file-2", 
          name: "Site_Photos.jpg",
          size: 1048576,
          type: "image/jpeg",
          uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
        }
      ],
      status: 'completed' as const,
      uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      userId: '456',
      isHighlighted: false
    },
    {
      id: "default-2",
      files: [
        {
          id: "file-3",
          name: "Energy_Audit.docx",
          size: 512000,
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          uploadedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
        }
      ],
      status: 'completed' as const,
      uploadedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      userId: '456',
      isHighlighted: false
    }
  ]);

  const handleStartNewProject = () => {
    if (onStartNewProject) {
      onStartNewProject();
    }
  };



  /**
   * Remove highlighting from a specific upload when user clicks on it
   * This indicates the user has seen/viewed the upload
   */
  const handleUploadClick = (uploadId: string) => {
    setUploads(prev => prev.map(upload => 
      upload.id === uploadId 
        ? { ...upload, isHighlighted: false }
        : upload
    ));
  };



  const handleSuccessBannerDismiss = () => {
    if (onDismissSuccessBanner) {
      onDismissSuccessBanner();
    } else {
      setInternalShowSuccessBanner(false);
    }
  };

  const handleTabChange = React.useCallback(() => {
    // Remove highlighting from all uploads when tab changes
    setUploads(prev => prev.map(upload => ({ ...upload, isHighlighted: false })));
    if (onDismissSuccessBanner) {
      onDismissSuccessBanner();
    } else {
      setInternalShowSuccessBanner(false);
    }
  }, [onDismissSuccessBanner]);

  /**
   * Handle click on Uploaded Plans tab
   * Removes highlighting from all uploads when user visits the tab
   */
  const handleUploadedPlansTabClick = () => {
    setActiveBriefsTab('uploaded');
    // Remove highlighting from all uploads when user visits the uploaded plans tab
    setUploads(prev => prev.map(upload => ({ ...upload, isHighlighted: false })));
  };

  // Check if there are any highlighted uploads
  const hasHighlightedUploads = uploads.some(upload => upload.isHighlighted);
  const highlightedUploadsCount = uploads.filter(upload => upload.isHighlighted).length;

  // Register the tab change handler when component mounts
  React.useEffect(() => {
    if (onTabChange) {
      onTabChange(handleTabChange);
    }
  }, []); // Only run once on mount

  // Handle recent upload from main page
  React.useEffect(() => {
    if (recentUpload) {
      // Add the recent upload to the uploads list
      setUploads(prev => [
        recentUpload,
        ...prev.map(upload => ({ ...upload, isHighlighted: false }))
      ]);
      // Switch to uploaded plans tab
      setActiveBriefsTab('uploaded');
      // Clear the recent upload
      onClearRecentUpload?.();
    }
  }, [recentUpload, onClearRecentUpload]);

  return (
    <div className="space-y-6" style={{ marginTop: "32px" }}>
      {/* Header */}
      <div>
        <h2 className="text-[24px] font-extrabold text-[var(--text-primary)] mb-6">
                                                 Welcome back Gemma
        </h2>
      </div>

      {/* Metrics Section */}
      <BriefsMetricsSection onStartNewProject={handleStartNewProject} />

      {/* Main Content */}
      <div className="bg-white rounded-lg border border-[var(--border-light)] p-6">
        <h2 className="text-[20px] font-extrabold text-[var(--text-primary)] mb-6">
          All Briefs
        </h2>
        
        {/* Briefs Tab Bar */}
        <div className="flex border-b border-[var(--Colours-BorderLight,#F3F4F6)] mb-6">
          <button
            onClick={handleUploadedPlansTabClick}
            className={`pl-0 pr-6 py-3 text-[14px] relative ${
              activeBriefsTab === 'uploaded' 
                ? 'text-[var(--text-primary)] font-bold' 
                : 'text-[var(--text-secondary)] font-normal'
            }`}
          >
            <div className="flex items-center gap-2">
              Uploaded Plans
              {hasHighlightedUploads && (
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-[#29b273] rounded-full"></div>
                  <span className="text-[12px] text-[#29b273] font-bold">
                    {highlightedUploadsCount}
                  </span>
                </div>
              )}
            </div>
            {activeBriefsTab === 'uploaded' && (
              <div className="absolute bottom-0 left-0 right-6 h-0.5 bg-[#29b273]"></div>
            )}
          </button>
          <button
            onClick={() => setActiveBriefsTab('generated')}
            className={`px-6 py-3 text-[14px] relative ${
              activeBriefsTab === 'generated' 
                ? 'text-[var(--text-primary)] font-bold' 
                : 'text-[var(--text-secondary)] font-normal'
            }`}
          >
            Generated Briefs
            {activeBriefsTab === 'generated' && (
              <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-[#29b273]"></div>
            )}
          </button>
          <button
            onClick={() => setActiveBriefsTab('optimised')}
            className={`px-6 py-3 text-[14px] relative ${
              activeBriefsTab === 'optimised' 
                ? 'text-[var(--text-primary)] font-bold' 
                : 'text-[var(--text-secondary)] font-normal'
            }`}
          >
            Optimised Briefs
            {activeBriefsTab === 'optimised' && (
              <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-[#29b273]"></div>
            )}
          </button>
          <button
            onClick={() => setActiveBriefsTab('published')}
            className={`px-6 py-3 text-[14px] relative ${
              activeBriefsTab === 'published' 
                ? 'text-[var(--text-primary)] font-bold' 
                : 'text-[var(--text-secondary)] font-normal'
            }`}
          >
            Published Briefs
            {activeBriefsTab === 'published' && (
              <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-[#29b273]"></div>
            )}
          </button>
        </div>
        
        {/* Search and Filter Bar */}
        <SearchFilterBar />
        
        {/* Success Banner - positioned between search filter and content */}
        <SuccessBanner 
          isVisible={showSuccessBanner}
          onDismiss={handleSuccessBannerDismiss}
          fileCount={uploads.length > 0 ? uploads[0].files.length : 0}
          userEmail="alex.johnson@company.com"
        />
        
        {/* Brief Sections */}
        <div className="space-y-8">
          {activeBriefsTab === 'uploaded' && (
            <DocumentUploadsSection 
              uploads={uploads} 
              onUploadClick={handleUploadClick}
            />
          )}
          {activeBriefsTab === 'generated' && (
            <GeneratedBriefsSection />
          )}
          {activeBriefsTab === 'optimised' && (
            <OptimisedBriefsSection />
          )}
          {activeBriefsTab === 'published' && (
            <PublishedBriefsSection />
          )}
        </div>
      </div>


    </div>
  );
};

export default BriefsView;
