"use client";

import React from "react";
import { Check, Download } from "lucide-react";
import Button from "@/components/ui/Button";

interface ContractAcceptedModalProps {
  isOpen: boolean;
  contractData: {
    fileName: string;        // e.g., "HVAC_Agreement_Final.pdf"
    downloadUrl: string;     // API endpoint or file URL
    projectName: string;     // For success notifications
    supplier: string;
  };
  onReturnToDashboard: () => void;
  onDownloadContract: (downloadUrl: string, fileName: string) => Promise<void>;
}

export const ContractAcceptedModal: React.FC<ContractAcceptedModalProps> = ({
  isOpen,
  contractData,
  onReturnToDashboard,
  onDownloadContract,
}) => {
  if (!isOpen) return null;

  const handleDownload = async () => {
    try {
      await onDownloadContract(contractData.downloadUrl, contractData.fileName);
    } catch (error) {
      console.error("Failed to download contract:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />

      {/* Modal */}
      <div 
        className="relative bg-white rounded-lg shadow-xl w-full mx-4"
        style={{ 
          width: "580px",
          border: "2px solid #1C75BC"
        }}
      >
        {/* Content */}
        <div className="p-8 text-center">
          {/* Success Icon */}
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>

          {/* Header */}
          <h2 
            className="text-gray-900 mb-4"
            style={{ 
              fontSize: "20px", 
              fontWeight: "800" 
            }}
          >
            Contract accepted successfully!
          </h2>

          {/* Description */}
          <p 
            className="text-gray-600 mb-8 leading-relaxed"
            style={{ fontSize: "14px" }}
          >
            Your contract is now approved and ready for download. Take it to your supplier for final signing to officially begin your project.
          </p>

          {/* Next Steps Section */}
          <div className="text-left mb-8">
            <h3 
              className="text-gray-900 mb-4"
              style={{ 
                fontSize: "16px", 
                fontWeight: "700" 
              }}
            >
              What happens next
            </h3>
            
            <ul className="space-y-3 text-gray-700" style={{ fontSize: "14px" }}>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Download your approved contract and coordinate signing with your supplier</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>CQuel will help facilitate the project kickoff once contracts are signed</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>You'll receive project timeline and implementation schedule after kickoff</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Regular progress updates throughout project delivery</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Final completion notification when project is finished</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button 
              variant="neutral" 
              onClick={onReturnToDashboard}
              className="flex-1"
            >
              Return to Dashboard
            </Button>
            <Button 
              variant="primary" 
              onClick={handleDownload}
              className="flex-1 bg-[#29b273] hover:bg-[#249d65] flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Contract
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractAcceptedModal;
