"use client";

import React, { useState } from "react";
import Button from "@/components/ui/Button";
import { X } from "lucide-react";

interface DeclineContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  contractData: {
    contractId: string;
    projectName: string;
    supplier: string;
    projectId: string;
  };
  onDeclineContract: (contractId: string, feedback: string) => Promise<void>;
}

export const DeclineContractModal: React.FC<DeclineContractModalProps> = ({
  isOpen,
  onClose,
  contractData,
  onDeclineContract,
}) => {
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!feedback.trim()) {
      alert("Please provide feedback about the changes you need.");
      return;
    }

    setIsSubmitting(true);
    try {
      await onDeclineContract(contractData.contractId, feedback);
      setFeedback("");
      onClose();
    } catch (error) {
      console.error("Error declining contract:", error);
      alert("Failed to submit decline request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={handleBackdropClick}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />

      {/* Modal */}
      <div 
        className="relative bg-white rounded-lg shadow-xl w-full mx-4"
        style={{ width: "582px" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-gray-900" style={{ fontSize: "20px", fontWeight: "800" }}>
            Decline contract
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Info Section */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
            <h3 className="text-gray-900 mb-2" style={{ fontSize: "16px", fontWeight: "700" }}>
              What happens next:
            </h3>
            <p className="text-gray-700 mb-3" style={{ fontSize: "14px" }}>
              Your change request will be coordinated by CQuel to ensure your contract requirements are met. We'll work with you and your supplier to deliver a revised version.
            </p>
            <ul className="space-y-2 text-gray-700" style={{ fontSize: "14px" }}>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                CQuel reviews your feedback and coordinates with the supplier for revisions
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                We'll facilitate the contract revision process and keep you updated on progress
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                Updated contract delivered back to you through the platform for review
              </li>
            </ul>
          </div>

          {/* Feedback Section */}
          <div className="mb-6">
            <label htmlFor="feedback" className="block text-gray-900 mb-2" style={{ fontSize: "14px", fontWeight: "600" }}>
              What changes do you need?
            </label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Please describe the specific changes you need to the contract..."
              className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              style={{ fontSize: "14px" }}
              required
            />
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
              onClick={handleSubmit}
              className="flex-1 bg-[#29b273] hover:bg-[#249d65]"
              disabled={isSubmitting || !feedback.trim()}
            >
              {isSubmitting ? "Sending..." : "Send request"}
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <p className="text-gray-500 text-center" style={{ fontSize: "12px" }}>
            Need help?{" "}
            <a 
              href="#" 
              className="text-blue-600 underline hover:text-blue-800"
              onClick={(e) => {
                e.preventDefault();
                // Handle contact support action
                console.log("Contact support clicked");
              }}
            >
              Contact support
            </a>{" "}
            anytime during your project process
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeclineContractModal;
