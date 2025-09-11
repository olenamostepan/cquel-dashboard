import React, { useState } from "react";
import { X } from "lucide-react";
import Button from "@/components/ui/Button";

interface NegotiatePriceModalProps {
  isOpen: boolean;
  onClose: () => void;
  pricingData: {
    pricingId: string;
    projectName: string;
    supplier: string;
    currentPrice?: string;
    projectId: string;
  };
  onNegotiatePrice: (pricingId: string, negotiationRequest: string) => Promise<void>;
}

const NegotiatePriceModal: React.FC<NegotiatePriceModalProps> = ({
  isOpen,
  onClose,
  pricingData,
  onNegotiatePrice
}) => {
  const [negotiationRequest, setNegotiationRequest] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!negotiationRequest.trim()) {
      setError("Please provide your negotiation details");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await onNegotiatePrice(pricingData.pricingId, negotiationRequest);
      setNegotiationRequest("");
      onClose();
    } catch (err) {
      setError("Failed to send negotiation request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setNegotiationRequest("");
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div 
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        style={{ width: "582px" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
              <img 
                src="/assets/New project.svg" 
                alt="Negotiate price" 
                className="w-8 h-8"
              />
            </div>
            <div>
              <h2 className="text-[20px] font-extrabold text-[var(--text-primary)]">
                Negotiate a price
              </h2>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Info Section */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="text-[16px] font-bold text-[var(--text-primary)] mb-2">
              What happens next:
            </h3>
            <p className="text-[14px] text-[var(--text-secondary)] mb-4">
              Your negotiation request goes directly to the supplier, with CQuel overseeing the process to ensure fair pricing and terms.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-[14px] text-[var(--text-secondary)]">
                <span className="text-[var(--brand-primary)] font-bold">•</span>
                <span>CQuel provides market insights and negotiation support</span>
              </li>
              <li className="flex items-start gap-2 text-[14px] text-[var(--text-secondary)]">
                <span className="text-[var(--brand-primary)] font-bold">•</span>
                <span>We track progress and keep you informed</span>
              </li>
              <li className="flex items-start gap-2 text-[14px] text-[var(--text-secondary)]">
                <span className="text-[var(--brand-primary)] font-bold">•</span>
                <span>All responses come through our secure platform</span>
              </li>
            </ul>
          </div>

          {/* Negotiation Input Section */}
          <div className="mb-6">
            <label className="block text-[14px] font-bold text-[var(--text-primary)] mb-2">
              What would you like to negotiate?
            </label>
            <textarea
              value={negotiationRequest}
              onChange={(e) => setNegotiationRequest(e.target.value)}
              placeholder="Please provide details about what you'd like to negotiate (e.g., pricing, terms, timeline, etc.)"
              className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:border-transparent"
              style={{
                fontSize: "14px",
                lineHeight: "1.5"
              }}
            />
            {error && (
              <p className="text-red-500 text-[12px] mt-2">{error}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-6">
            <Button
              variant="neutral"
              size="custom"
              onClick={handleClose}
              className="flex-1"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="custom"
              onClick={handleSubmit}
              className="flex-1"
              disabled={isSubmitting || !negotiationRequest.trim()}
            >
              {isSubmitting ? "Sending..." : "Send request"}
            </Button>
          </div>

          {/* Footer */}
          <div className="text-center">
            <p className="text-[12px] text-[var(--text-secondary)]">
              Need help?{" "}
              <a 
                href="#" 
                className="text-[var(--link-blue)] underline hover:no-underline"
                onClick={(e) => e.preventDefault()}
              >
                Contact support
              </a>{" "}
              anytime during your tender process
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NegotiatePriceModal;
