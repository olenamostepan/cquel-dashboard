"use client";

import React from "react";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import PlanCredits from "@/components/ui/PlanCredits";

interface CoBrandingProps {
  customerName: string;
  customerLogoSrc?: string;
  showBreadcrumbs?: boolean;
  breadcrumbItems?: { label: string; onClick?: () => void }[];
  onLogoClick?: () => void;
  onStartNewProject?: () => void;
  userPlan?: {
    planName: string;
    creditsRemaining: number;
    totalCredits?: number;
    nextRenewal?: string;
  };
  onUpgradePlan?: () => void;
}



const CoBrandingHeader: React.FC<CoBrandingProps> = ({ customerName, customerLogoSrc, showBreadcrumbs, breadcrumbItems, onLogoClick, onStartNewProject, userPlan, onUpgradePlan }) => {
  return (
    <div className="w-full bg-white border-b border-[var(--border-light)]">
      <div className="container-page flex items-center justify-between py-4">
                {/* Left cluster: Logo → Powered by CQuel → Title */}
        <div className="flex items-center gap-4">
          {/* Customer logo - clickable */}
          <div 
            className="cursor-pointer hover:opacity-80"
            onClick={() => {
              console.log('Customer logo clicked!');
              if (onLogoClick) {
                onLogoClick();
              } else {
                window.location.href = '/';
              }
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={customerLogoSrc || "/logos/Company logos/aroundtown.png"}
              alt={`${customerName} logo`}
              className="h-[48px] w-auto object-contain"
              onError={(e) => {
                // Fallback to a simple placeholder if PNG fails
                (e.currentTarget as HTMLImageElement).src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjgiIGhlaWdodD0iNjgiIHZpZXdCb3g9IjAgMCA2OCA2OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iNjgiIGhlaWdodD0iNjgiIHJ4PSI4IiBmaWxsPSIjRjVGN0ZCIi8+CiAgPHRleHQgeD0iMzQiIHk9IjQyIiBmb250LWZhbWlseT0ic3lzdGVtLXVpLCAtYXBwbGUtc3lzdGVtLCAnU2Vnb2UgVUknLCBSb2JvdG8sICdIZWx2ZXRpY2EgTmV1ZScsIEFyaWFsIiBmb250LXNpemU9IjI0IiBmb250LXdlaWdodD0iNzAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjY2NjY2Ij5TPC90ZXh0Pgo8L3N2Zz4K";
              }}
            />
          </div>
          <div className="inline-flex items-center gap-4">
            <div className="inline-flex items-center gap-2 rounded-lg bg-[var(--page)] border border-[var(--border-light)] px-4 h-10">
              <span className="text-[12px] text-[var(--text-secondary)]">Powered by</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/cquel-logo.svg"
                alt="CQuel"
                className="h-5 w-auto"
                onError={(e) => {
                  // Fallback to a simple text-based logo if SVG fails
                  (e.currentTarget as HTMLImageElement).src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCA2MCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8dGV4dCB4PSIwIiB5PSIxNSIgZm9udC1mYW1pbHk9InN5c3RlbS11aSwgLWFwcGxlLXN5c3RlbSwgJ1NlZ29lIFVJJywgUm9ib3RvLCAnSGVsdmV0aWNhIE5ldWUnLCBBcmlhbCIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzBFN0M2NiI+Q1F1ZWw8L3RleHQ+Cjwvc3ZnPgo=";
                }}
              />
            </div>
            {showBreadcrumbs && breadcrumbItems ? (
              <div className="flex items-center gap-2 text-[14px] text-[var(--text-secondary)]">
                {breadcrumbItems.map((item, index) => (
                  <React.Fragment key={index}>
                    <span 
                      className={`cursor-pointer hover:text-[var(--text-primary)] ${index === breadcrumbItems.length - 1 ? 'text-[var(--text-primary)]' : ''}`}
                      onClick={item.onClick}
                    >
                      {item.label}
                    </span>
                    {index < breadcrumbItems.length - 1 && (
                      <span className="text-[var(--text-secondary)]">&gt;</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            ) : (
              <div 
                className="text-[var(--text-primary)] font-extrabold" 
                style={{ fontSize: "20px", lineHeight: "32px" }}
              >
                Projects Dashboard
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-8">
          <Button variant="primary" onClick={onStartNewProject}>Start new project</Button>
          
          {/* Plan & Credits - Hidden on mobile */}
          {userPlan && (
            <div className="hidden md:block">
              <PlanCredits 
                userPlan={userPlan} 
                onUpgradeClick={onUpgradePlan}
              />
            </div>
          )}
          
          <Avatar name="Angie" size={36} />
        </div>
      </div>
    </div>
  );
};

export const Header: React.FC<CoBrandingProps> = (props) => {
  return (
    <header className="sticky top-0 z-50">
      <CoBrandingHeader {...props} />
    </header>
  );
};

export default Header;


