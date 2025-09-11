"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import Button from "@/components/ui/Button";

interface ContractRequestHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendRequest: (projectId: string, projectName: string) => void;
  projectId?: string;
  projectName?: string;
  companyName?: string;
}

export const ContractRequestHelpModal: React.FC<ContractRequestHelpModalProps> = ({
  isOpen,
  onClose,
  onSendRequest,
  projectId,
  projectName,
  companyName,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSendRequest = async () => {
    if (!projectId || !projectName) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    onSendRequest(projectId, projectName);
    onClose();
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
          <h2 
            className="text-gray-900 pr-8"
            style={{ 
              fontSize: "20px", 
              fontWeight: "800" 
            }}
          >
            Request help from CQuel
          </h2>
        </div>

        {/* Content */}
        <div className="px-8 pb-6">
          {/* Info Section */}
          <div 
            className="p-6 rounded-lg mb-6"
            style={{ backgroundColor: "#F9FAFB" }}
          >
            <h3 
              className="text-gray-900 mb-4"
              style={{ 
                fontSize: "16px", 
                fontWeight: "700" 
              }}
            >
              What happens next:
            </h3>
            
            <p className="text-gray-700 mb-4" style={{ fontSize: "14px" }}>
              Our expert team will create a professional contract tailored to your project requirements and industry standards. We'll coordinate with your selected supplier to ensure all terms are acceptable to both parties.
            </p>
            
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-sm text-gray-700">
                  CQuel creates professional contract based on your project requirements and industry standards
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-sm text-gray-700">
                  Contract reviewed with supplier to ensure all terms are acceptable to both parties
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-sm text-gray-700">
                  Final contract delivered through platform ready for your review and acceptance
                </span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button 
              variant="neutral" 
              onClick={onClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              variant="primary" 
              onClick={handleSendRequest}
              className="flex-1 bg-[#29b273] hover:bg-[#249d65]"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send request'}
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

export default ContractRequestHelpModal;
