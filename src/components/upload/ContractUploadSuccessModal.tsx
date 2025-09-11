"use client";

import React from "react";
import { Check } from "lucide-react";
import Button from "@/components/ui/Button";

interface ContractUploadSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName?: string;
  contractFileName?: string;
}

export const ContractUploadSuccessModal: React.FC<ContractUploadSuccessModalProps> = ({ 
  isOpen, 
  onClose,
  projectName,
  contractFileName 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
      
      {/* Modal */}
      <div 
        className="relative bg-white rounded-lg shadow-xl mx-4"
        style={{
          width: "580px",
          border: "1px solid #1C75BC"
        }}
      >
        {/* Header */}
        <div className="text-center p-8">
          {/* Success Icon */}
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          
          {/* Title */}
          <h2 
            className="text-gray-900 mb-2"
            style={{ 
              fontSize: "20px", 
              fontWeight: "800",
              textAlign: "center"
            }}
          >
            Contract uploaded successfully!
          </h2>
          
          {/* Description */}
          <p 
            className="text-gray-600"
            style={{ 
              fontSize: "14px",
              textAlign: "center",
              lineHeight: "1.5"
            }}
          >
            Our team will now review your contract and coordinate with your supplier to finalize the signing process. We'll notify you when it's ready for final review.
          </p>
        </div>

        {/* Information Section */}
        <div className="px-8 mb-8">
          <h3 
            className="text-gray-900 mb-4"
            style={{ 
              fontSize: "16px", 
              fontWeight: "700",
              textAlign: "left"
            }}
          >
            What you can do now
          </h3>
          
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
              <span className="text-sm text-gray-700">
                You'll receive an email confirming your contract upload
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
              <span className="text-sm text-gray-700">
                Our team reviews and prepares your contract for supplier coordination
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
              <span className="text-sm text-gray-700">
                We'll notify you when the contract is ready for final signing
              </span>
            </li>
          </ul>
        </div>

        {/* Action Button */}
        <div className="px-8 pb-8">
          <Button 
            variant="primary" 
            onClick={onClose}
            className="w-full"
            style={{
              height: "40px",
              backgroundColor: "#29b273",
              border: "none"
            }}
          >
            <span style={{ fontSize: "14px", fontWeight: "700" }}>
              Return to Contracts
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContractUploadSuccessModal;
