"use client";

import React, { useState } from "react";
import { X, FileText } from "lucide-react";
import Button from "@/components/ui/Button";

interface AcceptContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  contractData: {
    supplier: string;        // e.g., "Heat Pumps LTD"
    projectName: string;     // e.g., "Manchester Office HVAC"
    contractId: string;
    projectId: string;
  };
  onAccept: (contractId: string) => Promise<void>;
}

export const AcceptContractModal: React.FC<AcceptContractModalProps> = ({
  isOpen,
  onClose,
  contractData,
  onAccept,
}) => {
  const [isAccepting, setIsAccepting] = useState(false);

  const handleAccept = async () => {
    setIsAccepting(true);
    
    try {
      await onAccept(contractData.contractId);
      onClose();
    } catch (error) {
      console.error('Error accepting contract:', error);
      // Handle error - could show error message
    } finally {
      setIsAccepting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className="relative bg-white rounded-lg shadow-xl w-full mx-4"
        style={{ width: "582px" }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        {/* Header */}
        <div className="px-8 pt-8 pb-6">
          <div className="flex items-center gap-4 pr-8">
            {/* Contract Icon */}
            <div 
              className="w-16 h-16 flex items-center justify-center rounded-lg"
              style={{ backgroundColor: "#F3F4F6" }}
            >
              <FileText className="w-8 h-8 text-gray-600" />
            </div>
            
            <div>
              <h2 
                className="text-gray-900 mb-2"
                style={{ 
                  fontSize: "20px", 
                  fontWeight: "800" 
                }}
              >
                Accepting your contract
              </h2>
              <p 
                className="text-gray-600"
                style={{ fontSize: "16px" }}
              >
                This will approve your contract draft and prepare it for final coordination with your selected supplier.
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-8 pb-6">
          {/* Final Details Section */}
          <div 
            className="p-6 rounded-lg mb-6 border"
            style={{ 
              backgroundColor: "#F9FAFB",
              borderColor: "#E5E7EB"
            }}
          >
            <h3 
              className="text-gray-900 mb-4"
              style={{ 
                fontSize: "16px", 
                fontWeight: "700" 
              }}
            >
              Final Details:
            </h3>
            
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-sm text-gray-700">
                  <strong>Supplier:</strong> {contractData.supplier}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-sm text-gray-700">
                  <strong>Project:</strong> {contractData.projectName}
                </span>
              </li>
            </ul>
            
            <p 
              className="text-gray-700"
              style={{ fontSize: "14px" }}
            >
              Your approved contract will be ready to download and take to your supplier for final signing. CQuel will coordinate the project kickoff once contracts are signed and provide regular updates throughout implementation.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button 
              variant="neutral" 
              onClick={onClose}
              className="flex-1"
              disabled={isAccepting}
            >
              Cancel
            </Button>
            <Button 
              variant="primary" 
              onClick={handleAccept}
              className="flex-1 bg-[#29b273] hover:bg-[#249d65]"
              disabled={isAccepting}
            >
              {isAccepting ? 'Accepting...' : 'Accept contract'}
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 pb-8">
          <p className="text-center text-sm text-gray-500">
            Need help?{" "}
            <a 
              href="#" 
              className="text-blue-600 underline hover:text-blue-700"
              onClick={(e) => {
                e.preventDefault();
                // Handle contact support action
                console.log('Contact support clicked');
              }}
            >
              Contact support
            </a>{" "}
            anytime during your tender process
          </p>
        </div>
      </div>
    </div>
  );
};

export default AcceptContractModal;
