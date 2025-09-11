import React, { useState } from "react";
import { X } from "lucide-react";
import Button from "@/components/ui/Button";

interface RequestChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  pricingData: {
    pricingId: string;
    projectName: string;
    supplier: string;
    currentPrice?: string;
    projectId: string;
    fileName?: string;
  };
  onRequestChange: (pricingId: string, changeRequest: string) => Promise<void>;
}

const RequestChangeModal: React.FC<RequestChangeModalProps> = ({
  isOpen,
  onClose,
  pricingData,
  onRequestChange
}) => {
  const [changeRequest, setChangeRequest] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!changeRequest.trim()) {
      setError("Please provide details about the changes you need");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      await onRequestChange(pricingData.pricingId, changeRequest);
      setChangeRequest("");
      onClose();
    } catch (err) {
      setError("Failed to send change request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setChangeRequest("");
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
            <img
              src="/assets/New project.svg"
              alt="Request a change"
              className="w-14 h-14"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cGF0aCBkPSJNMTIgNVYxOU0xOSAxMkg1IiBzdHJva2U9IiNmOTczMjIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=";
              }}
            />
            <div>
              <h2 className="text-[20px] font-extrabold text-[var(--text-primary)]">
                Request a change
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
              Your change request goes directly to the supplier, with CQuel managing the revision process to ensure accurate updated pricing.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-[14px] text-[var(--text-secondary)]">
                <span className="text-[var(--brand-primary)] font-bold">•</span>
                <span>CQuel validates technical feasibility</span>
              </li>
              <li className="flex items-start gap-2 text-[14px] text-[var(--text-secondary)]">
                <span className="text-[var(--brand-primary)] font-bold">•</span>
                <span>We coordinate timeline and cost impacts</span>
              </li>
              <li className="flex items-start gap-2 text-[14px] text-[var(--text-secondary)]">
                <span className="text-[var(--brand-primary)] font-bold">•</span>
                <span>Updated proposals come through our platform</span>
              </li>
            </ul>
          </div>

          {/* Change Request Input Section */}
          <div className="mb-6">
            <label className="block text-[14px] font-bold text-[var(--text-primary)] mb-2">
              What changes do you need?
            </label>
            <textarea
              value={changeRequest}
              onChange={(e) => setChangeRequest(e.target.value)}
              placeholder="Please provide details about what changes you need (e.g., Change from 15×AIKO 445w panels to 20×AIKO 380w panels, Upgrade from 6 kW Fox inverter to 8 kW Fox inverter, Add battery storage system - 10kWh capacity, etc.)"
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
              disabled={isSubmitting || !changeRequest.trim()}
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

export default RequestChangeModal;
