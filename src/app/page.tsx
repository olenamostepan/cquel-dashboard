"use client";

import React from "react";
import Header from "@/components/ui/Header";
import Navigation from "@/components/ui/Navigation";
import WelcomeWidgets from "@/components/dashboard/WelcomeWidgets";
import FocusActions from "@/components/dashboard/FocusActions";
import AllProjectsView from "@/components/dashboard/AllProjectsView";
import TendersView from "@/components/dashboard/TendersView";
import SurveysView from "@/components/dashboard/SurveysView";
import PricingView from "@/components/dashboard/PricingView";
import BriefsView from "@/components/dashboard/BriefsView";
import ContractsView from "@/components/dashboard/ContractsView";
import ProjectDetailView from "@/components/project/ProjectDetailView";
import TenderResultsView from "@/components/tender/TenderResultsView";
import UploadModal from "@/components/upload/UploadModal";
import SuccessModal from "@/components/upload/SuccessModal";

export default function Home() {
  const [active, setActive] = React.useState("focus");
  const [isUploadModalOpen, setIsUploadModalOpen] = React.useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = React.useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = React.useState(false);
  const [recentUpload, setRecentUpload] = React.useState<{
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
  } | null>(null);
  const briefsTabChangeHandlerRef = React.useRef<(() => void) | null>(null);

  const handleStartNewProject = () => {
    setIsUploadModalOpen(true);
  };

  const handleUploadSuccess = (files: Array<{
    id: string;
    name: string;
    size: number;
    type: string;
    uploadedAt: Date;
  }>) => {
    // Create a new upload entry with highlighting
    const newUpload = {
      id: Math.random().toString(36).substr(2, 9),
      files,
      status: 'processing' as const,
      uploadedAt: new Date(),
      userId: '456',
      isHighlighted: true
    };
    
    setRecentUpload(newUpload);
    setIsUploadModalOpen(false);
    setIsSuccessModalOpen(true);
    // Navigate to briefs tab after successful upload to show notification
    setActive('briefs');
  };

  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false);
    setShowSuccessBanner(true);
    // Navigate to briefs tab to show the upload
    setActive("briefs");
  };

  const handleTabChange = (newTab: string) => {
    // Call the briefs tab change handler if we're switching away from briefs
    if (active === "briefs" && newTab !== "briefs" && briefsTabChangeHandlerRef.current) {
      briefsTabChangeHandlerRef.current();
    }
    setActive(newTab);
  };

  // Check for URL parameters on component mount
  React.useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const tabParam = urlParams.get('tab');
      const _projectIdParam = urlParams.get('projectId');
      
      if (tabParam && ['focus', 'all', 'briefs', 'tenders', 'surveys', 'pricing', 'contracts', 'project-detail', 'tender-results'].includes(tabParam)) {
        setActive(tabParam);
      } else {
        // Default to focus if no tab parameter or invalid tab
        setActive('focus');
      }
    } catch (error) {
      console.error('Error reading URL parameters:', error);
      setActive('focus');
    }
  }, []);

  // Update URL when active tab changes
  React.useEffect(() => {
    try {
      const url = new URL(window.location.href);
      if (active === 'focus') {
        url.searchParams.set('tab', 'focus');
      } else if (active !== 'focus') {
        url.searchParams.set('tab', active);
      }
      window.history.replaceState({}, '', url.toString());
    } catch (error) {
      console.error('Error updating URL:', error);
    }
  }, [active]);

  return (
    <div className="min-h-screen">
      <Header 
                    customerName="Your Company" 
        showBreadcrumbs={active === "project-detail" || active === "tender-results"}
        breadcrumbItems={active === "project-detail" ? [
          {
            label: "All Projects",
            onClick: () => {
              // Get the source tab from URL parameters or default to 'all'
              const urlParams = new URLSearchParams(window.location.search);
              const sourceTab = urlParams.get('sourceTab') || 'all';
              window.location.href = `/?tab=${sourceTab}`;
            }
          },
          {
            label: "Solar PV - Schenkendorfstraße"
          }
        ] : active === "tender-results" ? [
          {
            label: "Tenders",
            onClick: () => {
              window.location.href = '/?tab=tenders';
            }
          },
          {
            label: "Sonnenstraße Solar PV"
          }
        ] : undefined}
        onLogoClick={() => {
          console.log('Logo clicked from main page!');
          setActive('focus');
        }}
        onStartNewProject={handleStartNewProject}
        userPlan={{
          planName: "Enterprise",
          creditsRemaining: 15,
          totalCredits: 20,
          nextRenewal: "September 21, 2025"
        }}
        onUpgradePlan={() => {
          console.log('Upgrade plan clicked');
          // TODO: Implement upgrade plan functionality
        }}
      />
      {active !== "project-detail" && active !== "tender-results" && (
        <Navigation
          activeId={active}
          onChange={handleTabChange}
          items={[
            { id: "focus", label: "Focus here now" },
            { id: "all", label: "All Projects" },
            { id: "briefs", label: "Briefs" },
            { id: "tenders", label: "Tenders" },
            { id: "surveys", label: "Surveys" },
            { id: "pricing", label: "Pricing" },
            { id: "contracts", label: "Contracts" },
          ]}
        />
      )}

      <main className="container-page pt-0 pb-8 space-y-5">
        {active === "focus" && (
          <>
            <section>
              <div
                className="text-[var(--text-primary)] font-extrabold"
                style={{
                  fontSize: "24px",
                  lineHeight: "32px",
                  paddingTop: "var(--Distance-32, 32px)",
                  paddingBottom: "var(--Distance-32, 32px)",
                }}
              >
                Welcome back Gemma
              </div>
              {/* Client demo version */}
              <div>
                <WelcomeWidgets
                  onViewMeetings={() => setActive("tenders")}
                  onViewSurveys={() => setActive("surveys")}
                />
              </div>
            </section>

                    <section>
                      <FocusActions onStartNewProject={handleStartNewProject} onTabChange={handleTabChange} />
        </section>
          </>
        )}

        {active === "all" && (
          <section>
            <div
              className="text-[var(--text-primary)] font-extrabold"
              style={{
                fontSize: "24px",
                lineHeight: "32px",
                paddingTop: "var(--Distance-32, 32px)",
                paddingBottom: "var(--Distance-32, 32px)",
              }}
            >
              Welcome back
            </div>
            <AllProjectsView onTabChange={handleTabChange} />
          </section>
        )}

        {active === "tenders" && (
          <section>
            <TendersView />
          </section>
        )}

        {active === "surveys" && (
          <section>
            <SurveysView />
          </section>
        )}

        {active === "pricing" && (
          <section>
            <PricingView />
          </section>
        )}

        {active === "briefs" && (
          <section>
            <BriefsView 
              onTabChange={(handler) => {
                briefsTabChangeHandlerRef.current = handler;
              }}
              showSuccessBanner={showSuccessBanner}
              onDismissSuccessBanner={() => setShowSuccessBanner(false)}
              recentUpload={recentUpload}
              onClearRecentUpload={() => setRecentUpload(null)}
              onStartNewProject={handleStartNewProject}
            />
          </section>
        )}

        {active === "contracts" && (
          <section>
            <ContractsView />
          </section>
        )}

        {active === "project-detail" && (
          <section>
            <ProjectDetailView />
          </section>
        )}

        {active === "tender-results" && (
          <section>
            <TenderResultsView />
          </section>
        )}

        {active !== "focus" && active !== "all" && active !== "tenders" && active !== "surveys" && active !== "pricing" && active !== "briefs" && active !== "contracts" && active !== "project-detail" && active !== "tender-results" && (
          <section>
            <div
              className="text-[var(--text-primary)] font-extrabold"
              style={{
                fontSize: "24px",
                lineHeight: "32px",
                paddingTop: "var(--Distance-32, 32px)",
                paddingBottom: "var(--Distance-32, 32px)",
              }}
            >
              Welcome back Gemma
            </div>
            <div className="bg-white border border-[var(--border-light)] rounded-lg p-6 text-[14px] text-[var(--text-secondary)]">
              {active.charAt(0).toUpperCase() + active.slice(1)} content coming soon
            </div>
          </section>
        )}
      </main>

      {/* Upload Modal */}
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSuccess={handleUploadSuccess}
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleSuccessModalClose}
        fileCount={1}
        userEmail="alex.johnson@company.com"
      />
    </div>
  );
}
