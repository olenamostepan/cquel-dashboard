import React, { useState } from "react";
import { X } from "lucide-react";
import Button from "@/components/ui/Button";

interface AcceptPricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  pricingData: {
    pricingId: string;
    supplier: string;        // e.g., "Heat Pumps LTD"
    projectName: string;     // e.g., "Manchester Office HVAC"
    projectId: string;
    fileName?: string;       // e.g., "HVAC_Pricing_Final.pdf"
    totalPrice?: string;     // e.g., "£45,000"
  };
  onAcceptPricing: (pricingId: string) => Promise<void>;
}

const AcceptPricingModal: React.FC<AcceptPricingModalProps> = ({
  isOpen,
  onClose,
  pricingData,
  onAcceptPricing
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleAccept = async () => {
    setIsSubmitting(true);
    setError("");

    try {
      await onAcceptPricing(pricingData.pricingId);
      onClose();
    } catch (err) {
      setError("Failed to accept pricing. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
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
                src="/assets/contract accepting.svg"
                alt="Accept pricing"
                className="w-8 h-8"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cGF0aCBkPSJNMTIgMkM2LjQ4IDIgMiA2LjQ4IDIgMTJTNi40OCAyMiAxMiAyMlMyMiAxNy41MiAyMiAxMlMxNy41MiAyIDEyIDJaTTEwIDE3TDUgMTJMNi40MSAxMC41OUwxMCAxNC4xN0wxNy41OSA2LjU4TDE5IDhMMTAgMTdaIiBmaWxsPSIjMjk5MjczIi8+Cjwvc3ZnPgo=";
                }}
              />
            </div>
            <div>
              <h2 className="text-[20px] font-extrabold text-[var(--text-primary)]">
                Confirming your acceptance
              </h2>
              <p className="text-[16px] text-[var(--text-secondary)] mt-1">
                This will approve the proposal and begin project implementation with the selected supplier.
              </p>
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
          {/* Final Details Section */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
            <h3 className="text-[16px] font-bold text-[var(--text-primary)] mb-4">
              Final Details:
            </h3>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-2 text-[14px] text-[var(--text-primary)]">
                <span className="text-[var(--brand-primary)] font-bold">•</span>
                <span><strong>Supplier:</strong> {pricingData.supplier}</span>
              </li>
              <li className="flex items-start gap-2 text-[14px] text-[var(--text-primary)]">
                <span className="text-[var(--brand-primary)] font-bold">•</span>
                <span><strong>Project:</strong> {pricingData.projectName}</span>
              </li>
              {pricingData.totalPrice && (
                <li className="flex items-start gap-2 text-[14px] text-[var(--text-primary)]">
                  <span className="text-[var(--brand-primary)] font-bold">•</span>
                  <span><strong>Total Price:</strong> {pricingData.totalPrice}</span>
                </li>
              )}
            </ul>
            <p className="text-[14px] text-[var(--text-secondary)]">
              CQuel will handle contract execution and coordinate your project kickoff.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-[14px]">{error}</p>
            </div>
          )}

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
              onClick={handleAccept}
              className="flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Accept & Proceed"}
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

export default AcceptPricingModal;
