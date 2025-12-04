import React, { useState } from "react";
import SupplierScoringSidebar from "./SupplierScoringSidebar";
import DetailedComparisonTable from "./DetailedComparisonTable";


// Data Interfaces
interface Supplier {
  id: string;
  name: string;
  logo?: string;
  overallScore: number;
  categoryScores: {
    cost: number;
    quality: number;
    speed: number;
  };
  financials: {
    totalPrice: number;
    pricePerKwp: number;
    omCostsPerYear: number;
    materialsCost: number;
    estimatedPayback: number;
  };
  // Detailed comparison data
  supplierRelevance?: {
    generalScore: number;
    assetType: number;
    stakeholderManagement: number;
    assetSize: number;
    location: number;
  };
  speed?: { [key: string]: string | number | boolean };
  technicalScope?: { [key: string]: string | number | boolean };
  financialScope?: {
    capex: { [key: string]: string | number | boolean };
    ppa: { [key: string]: string | number | boolean };
    hirePurchase: { [key: string]: string | number | boolean };
  };
}

interface TenderResults {
  projectName: string;
  projectLocation: string;
  suppliers: Supplier[];
  activeFilter: 'price' | 'quality' | 'speed';
}

// Sample Data
const tenderData: TenderResults = {
  projectName: "Sonnenstraße Solar PV",
  projectLocation: "Sonnenstraße 19, 80331 München",
  activeFilter: 'price',
  suppliers: [
    {
      id: "1",
      name: "Bayern Solar GmbH",
      logo: "/logos/suppliers-logos/Bayern Solar.png",
      overallScore: 4.67,
      categoryScores: {
        cost: 4,
        quality: 5,
        speed: 4
      },
      financials: {
        totalPrice: 675000,
        pricePerKwp: 750,
        omCostsPerYear: 4500,
        materialsCost: 495000,
        estimatedPayback: 7.2
      },
      supplierRelevance: {
        generalScore: 4.5,
        assetType: 4,
        stakeholderManagement: 5,
        assetSize: 4,
        location: 5
      },
      speed: {
        deliveryTime: "12 weeks",
        installationTime: "8 weeks"
      },
      technicalScope: {
        systemCapacity: "900 kWp",
        panelType: "Monocrystalline",
        inverterType: "String inverters",
        warranty: "25 years",
        maintenanceSchedule: "Annual",
        omApproach: "Comprehensive maintenance package"
      },
      financialScope: {
        capex: { price: 675000 },
        ppa: { rate: "0.08 €/kWh" },
        hirePurchase: { rate: "4.5%" }
      }
    },
    {
      id: "2",
      name: "Hamburg Solartechnik GmbH KG",
      logo: "/logos/suppliers-logos/Hamburg Solartechnik.png",
      overallScore: 4.2,
      categoryScores: {
        cost: 4,
        quality: 4,
        speed: 5
      },
      financials: {
        totalPrice: 729000,
        pricePerKwp: 810,
        omCostsPerYear: 3800,
        materialsCost: 540000,
        estimatedPayback: 7.8
      },
      supplierRelevance: {
        generalScore: 4.0,
        assetType: 4,
        stakeholderManagement: 4,
        assetSize: 4,
        location: 4
      },
      speed: {
        deliveryTime: "10 weeks",
        installationTime: "6 weeks"
      },
      technicalScope: {
        systemCapacity: "900 kWp",
        panelType: "Polycrystalline",
        inverterType: "Micro inverters",
        warranty: "20 years",
        maintenanceSchedule: "Bi-annual",
        omApproach: "Standard maintenance package"
      },
      financialScope: {
        capex: { price: 729000 },
        ppa: { rate: "0.085 €/kWh" },
        hirePurchase: { rate: "5.0%" }
      }
    },
    {
      id: "3",
      name: "Süddeutsche Energietechnik",
      logo: "/logos/suppliers-logos/Suddeutsche.png",
      overallScore: 3.2,
      categoryScores: {
        cost: 3,
        quality: 3,
        speed: 4
      },
      financials: {
        totalPrice: 612000,
        pricePerKwp: 680,
        omCostsPerYear: 5200,
        materialsCost: 428000,
        estimatedPayback: 6.5
      },
      supplierRelevance: {
        generalScore: 3.0,
        assetType: 3,
        stakeholderManagement: 3,
        assetSize: 3,
        location: 3
      },
      speed: {
        deliveryTime: "14 weeks",
        installationTime: "10 weeks"
      },
      technicalScope: {
        systemCapacity: "900 kWp",
        panelType: "Thin-film",
        inverterType: "Central inverter",
        warranty: "15 years",
        maintenanceSchedule: "Annual",
        omApproach: "Basic maintenance package"
      },
      financialScope: {
        capex: { price: 612000 },
        ppa: { rate: "0.075 €/kWh" },
        hirePurchase: { rate: "4.0%" }
      }
    }
  ]
};

// Filter Tabs Component
const FilterTabs: React.FC<{ 
  activeFilter: string; 
  onFilterChange: (filter: 'price' | 'quality' | 'speed') => void 
}> = ({ activeFilter, onFilterChange }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="text-[14px] text-[var(--text-secondary)]">Filter by:</div>
      <div className="flex gap-2">
        <button
          onClick={() => onFilterChange('price')}
          className={`px-4 py-2 rounded-lg text-[14px] font-bold transition-colors ${
            activeFilter === 'price'
              ? 'bg-white text-[#29b273] border border-[#29b273]'
              : 'bg-[var(--Colours-ContainerBgGrey,#F9FAFB)] text-[var(--text-primary)] border border-[var(--Colours-BorderDark,#D3D7DC)]'
          }`}
        >
          Price
        </button>
        <button
          onClick={() => onFilterChange('quality')}
          className={`px-4 py-2 rounded-lg text-[14px] font-bold transition-colors ${
            activeFilter === 'quality'
              ? 'bg-white text-[#29b273] border border-[#29b273]'
              : 'bg-[var(--Colours-ContainerBgGrey,#F9FAFB)] text-[var(--text-primary)] border border-[var(--Colours-BorderDark,#D3D7DC)]'
          }`}
        >
          Quality
        </button>
        <button
          onClick={() => onFilterChange('speed')}
          className={`px-4 py-2 rounded-lg text-[14px] font-bold transition-colors ${
            activeFilter === 'speed'
              ? 'bg-white text-[#29b273] border border-[#29b273]'
              : 'bg-[var(--Colours-ContainerBgGrey,#F9FAFB)] text-[var(--text-primary)] border border-[var(--Colours-BorderDark,#D3D7DC)]'
          }`}
        >
          Speed
        </button>
      </div>
    </div>
  );
};

// Supplier Card Component
const SupplierCard: React.FC<{ supplier: Supplier }> = ({ supplier }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-[var(--Colours-BorderLight,#F3F4F6)]">
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex justify-center mb-3">
          {supplier.logo && (
            <img
              src={supplier.logo}
              alt={`${supplier.name} logo`}
              className="h-[56px] w-auto object-contain"
              onError={(e) => {
                // Hide the image if it fails to load
                (e.currentTarget as HTMLImageElement).style.display = 'none';
              }}
            />
          )}
        </div>
        
        {/* Company Name */}
        <div className="text-center mb-3">
          <div className="text-[14px] font-bold text-[var(--text-primary)]">
            {supplier.name}
          </div>
        </div>
        
        {/* Score */}
        <div className="text-center mb-4">
          <div className="text-[24px] font-bold text-[var(--text-primary)]">
            {supplier.overallScore}
          </div>
          <div className="text-[12px] text-[var(--text-secondary)]">
            Overall Score
          </div>
        </div>
        
        {/* Contact Button */}
        <div className="mt-auto">
          <button className="w-full inline-flex items-center justify-center rounded-md text-[14px] font-bold leading-[20px] transition-colors px-4 h-10 text-[14px] bg-[var(--Colours-ContainerBgGrey,#F9FAFB)] text-[var(--text-primary)] border border-[var(--Colours-BorderDark,#D3D7DC)] hover:bg-[#eceff3]">
            Contact Supplier
          </button>
        </div>
      </div>
    </div>
  );
};

// Format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

// Format currency with decimals
const formatCurrencyWithDecimals = (amount: number) => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

// Main Tender Results Component
const TenderResultsView: React.FC = () => {
  const [data, setData] = useState<TenderResults>(tenderData);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedSupplierDetails, setSelectedSupplierDetails] = useState<any>(null);

  const handleFilterChange = (filter: 'price' | 'quality' | 'speed') => {
    setData(prev => ({ ...prev, activeFilter: filter }));
  };

  const handleScoreClick = (supplierId: string, category: string) => {
    const supplier = data.suppliers.find(s => s.id === supplierId);
    if (!supplier) return;

    const supplierDetails = {
      supplierId: supplier.id,
      supplierName: supplier.name,
      supplierLogo: supplier.logo || "",
      category: "Cost & Financial Considerations",
      score: `${supplier.categoryScores.cost}/5`,
      explanation: `The installer offers competitive pricing with a cost of ${formatCurrency(supplier.financials.totalPrice)} and potential savings of ${Math.round((1 - supplier.financials.totalPrice / 750000) * 100)}%. They provide detailed financial breakdowns and potential cost-saving alternatives, ensuring transparency. Their approach seems financially strategic, making them competitive in the tender process.`,
      standoutPoints: [
        "Comprehensive breakdown of prices",
        "Consideration for other ways to reduce costs",
        "Transparent approach to pricing"
      ],
      allSupplierComparisons: data.suppliers.map(s => ({
        name: s.name,
        score: `${s.categoryScores.cost}/5`,
        description: s.id === supplierId 
          ? "Cheapest offer, but not clear on the quality"
          : s.financials.totalPrice < supplier.financials.totalPrice
          ? "Less than others, but not the cheapest"
          : "Most expensive offer, with low quality equipment",
        isSelected: s.id === supplierId
      }))
    };

    setSelectedSupplierDetails(supplierDetails);
    setSidebarOpen(true);
  };

  return (
    <div className="space-y-6" style={{ marginTop: "32px" }}>
      {/* Header Container */}
      <div className="flex items-center justify-between">
        {/* Name + Address */}
        <div>
          <h1 className="text-[24px] font-extrabold text-[var(--text-primary)] mb-2">
            {data.projectName}
          </h1>
          <p className="text-[14px] text-[var(--text-secondary)]">
            {data.projectLocation}
          </p>
        </div>
        
        {/* Filters */}
        <div>
          <FilterTabs 
            activeFilter={data.activeFilter} 
            onFilterChange={handleFilterChange} 
          />
        </div>
      </div>

      {/* Supplier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {data.suppliers.map((supplier) => (
          <SupplierCard key={supplier.id} supplier={supplier} />
        ))}
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-lg border border-[var(--Colours-BorderLight,#F3F4F6)] p-6">
        <h2 className="text-[18px] font-bold text-[#29b273] mb-6">
          Cost & Financial Considerations
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--Colours-BorderLight,#F3F4F6)]">
                <th className="text-left py-3 px-4 font-bold text-[var(--text-primary)]">
                  Category
                </th>
                {data.suppliers.map((supplier) => (
                  <th key={supplier.id} className="text-right py-3 px-4 font-bold text-[var(--text-primary)]">
                    {supplier.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[var(--Colours-BorderLight,#F3F4F6)]">
                <td className="py-3 px-4 text-[14px] text-[var(--text-secondary)]">
                  Category Score
                </td>
                {data.suppliers.map((supplier) => (
                  <td key={supplier.id} className="py-3 px-4 text-right">
                    <button 
                      className="text-[14px] font-bold text-[#29b273] hover:underline cursor-pointer"
                      onClick={() => handleScoreClick(supplier.id, 'cost')}
                    >
                      {supplier.categoryScores.cost}/5
                    </button>
                  </td>
                ))}
              </tr>
              <tr className="border-b border-[var(--Colours-BorderLight,#F3F4F6)]">
                <td className="py-3 px-4 text-[14px] text-[var(--text-secondary)]">
                  Price
                </td>
                {data.suppliers.map((supplier) => (
                  <td key={supplier.id} className="py-3 px-4 text-right text-[14px] font-bold text-[var(--text-primary)]">
                    {formatCurrency(supplier.financials.totalPrice)}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-[var(--Colours-BorderLight,#F3F4F6)]">
                <td className="py-3 px-4 text-[14px] text-[var(--text-secondary)]">
                  Price per kWp
                </td>
                {data.suppliers.map((supplier) => (
                  <td key={supplier.id} className="py-3 px-4 text-right text-[14px] font-bold text-[var(--text-primary)]">
                    {formatCurrency(supplier.financials.pricePerKwp)}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-[var(--Colours-BorderLight,#F3F4F6)]">
                <td className="py-3 px-4 text-[14px] text-[var(--text-secondary)]">
                  O&M costs per year
                </td>
                {data.suppliers.map((supplier) => (
                  <td key={supplier.id} className="py-3 px-4 text-right text-[14px] font-bold text-[var(--text-primary)]">
                    {formatCurrencyWithDecimals(supplier.financials.omCostsPerYear)}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-[var(--Colours-BorderLight,#F3F4F6)]">
                <td className="py-3 px-4 text-[14px] text-[var(--text-secondary)]">
                  Materials Cost
                </td>
                {data.suppliers.map((supplier) => (
                  <td key={supplier.id} className="py-3 px-4 text-right text-[14px] font-bold text-[var(--text-primary)]">
                    {formatCurrencyWithDecimals(supplier.financials.materialsCost)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 text-[14px] text-[var(--text-secondary)]">
                  Estimated Payback (years)
                </td>
                {data.suppliers.map((supplier) => (
                  <td key={supplier.id} className="py-3 px-4 text-right text-[14px] font-bold text-[var(--text-primary)]">
                    {supplier.financials.estimatedPayback}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Comparison Table */}
      <div className="mt-8">
        <h2 className="text-[20px] font-bold text-[var(--text-primary)] mb-4">
          Detailed Comparison
        </h2>
        {data.suppliers && data.suppliers.length > 0 ? (
          <DetailedComparisonTable
            suppliers={data.suppliers as any}
            categories={[
            {
              name: "Supplier relevance",
              fields: [
                {
                  key: "generalScore",
                  label: "General score",
                },
                {
                  key: "assetType",
                  label: "Asset type",
                  tooltip: "Proven asset type experience:\n1. Retail centres\n2. Large numbers of visitors\n3. Common Parts\n4. High profile brand",
                },
                {
                  key: "stakeholderManagement",
                  label: "Stakeholder management",
                  tooltip: "Proven stakeholder experience:\n1. 60-200 Tenants\n2. Asset Managers",
                },
                {
                  key: "assetSize",
                  label: "Asset size",
                  tooltip: "Proven experience from delivering sizable solar systems to bigger commercial real estate assets with",
                },
                {
                  key: "location",
                  label: "Location",
                  tooltip: "Years & no. projects in UK commercial real estate",
                },
              ],
            },
            {
              name: "Speed",
              fields: [
                { key: "deliveryTime", label: "Delivery time" },
                { key: "installationTime", label: "Installation time" },
              ],
            },
            {
              name: "Technical scope",
              fields: [
                { key: "systemCapacity", label: "System capacity" },
                { key: "panelType", label: "Panel type" },
                { key: "inverterType", label: "Inverter type" },
                { key: "warranty", label: "Warranty" },
                { key: "maintenanceSchedule", label: "Maintenance schedule" },
                { key: "omApproach", label: "O&M approach" },
              ],
            },
            {
              name: "Financial scope",
              fields: [
                { key: "capexPrice", label: "Capex Price" },
                { key: "ppaRate", label: "PPA Rate" },
                { key: "hirePurchaseRate", label: "Hire Purchase Rate" },
              ],
            },
          ]}
            onScoreClick={handleScoreClick}
          />
        ) : (
          <div className="text-[var(--text-secondary)] p-4">
            No suppliers data available
          </div>
        )}
      </div>

      {/* Supplier Scoring Sidebar */}
      <SupplierScoringSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        supplierDetails={selectedSupplierDetails}
      />
    </div>
  );
};

export default TenderResultsView;
