"use client";

import React from "react";
import { CheckCircle, X, FileText } from "lucide-react";

interface ContractSuccessBannerProps {
  isVisible: boolean;
  onDismiss: () => void;
  contractCount: number;
  contractType: 'upload' | 'request-help';
  projectName?: string;
}

export const ContractSuccessBanner: React.FC<ContractSuccessBannerProps> = ({
  isVisible,
  onDismiss,
  contractCount,
  contractType,
  projectName
}) => {
  if (!isVisible) return null;

  const getBannerContent = () => {
    if (contractType === 'request-help') {
      return {
        title: "Contract help requested successfully!",
        message: `Our team will create a professional contract for ${projectName || 'this project'}. You'll receive a notification when it's ready for review.`,
        icon: <FileText className="w-5 h-5 text-green-600" />
      };
    } else {
      return {
        title: `Contract${contractCount > 1 ? 's' : ''} uploaded successfully!`,
        message: `${contractCount} contract file${contractCount > 1 ? 's' : ''} ${contractCount > 1 ? 'have' : 'has'} been uploaded and is ready for review.`,
        icon: <CheckCircle className="w-5 h-5 text-green-600" />
      };
    }
  };

  const content = getBannerContent();

  return (
    <div 
      className="flex items-start gap-3 p-4 rounded-lg border border-green-200 bg-green-50 mb-6 animate-in slide-in-from-top-2 duration-300"
      style={{
        border: "1px solid var(--Colours-BorderGreen, #D4F0E3)",
        background: "var(--Colours-BgGreen, #EAF8F1)"
      }}
    >
      <div className="flex-shrink-0 mt-0.5">
        {content.icon}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="text-[14px] font-bold text-green-800 mb-1">
              {content.title}
            </h3>
            <p className="text-[12px] text-green-700 leading-relaxed">
              {content.message}
            </p>
          </div>
          
          <button
            onClick={onDismiss}
            className="flex-shrink-0 w-6 h-6 flex items-center justify-center hover:bg-green-100 rounded-full transition-colors"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4 text-green-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContractSuccessBanner;
