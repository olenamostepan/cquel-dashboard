"use client";

import React, { useState } from "react";
import { Info } from "lucide-react";

interface FieldValue {
  [key: string]: string | number | boolean;
}

interface Supplier {
  id: string;
  name: string;
  logo?: string;
  supplierRelevance?: {
    generalScore: number;
    assetType: number;
    stakeholderManagement: number;
    assetSize: number;
    location: number;
  };
  speed?: FieldValue;
  technicalScope?: FieldValue;
  financialScope?: {
    capex: FieldValue;
    ppa: FieldValue;
    hirePurchase: FieldValue;
  };
}

interface Category {
  name: string;
  fields: {
    key: string;
    label: string;
    tooltip?: string;
  }[];
}

interface DetailedComparisonTableProps {
  suppliers: Supplier[];
  categories: Category[];
  onScoreClick?: (supplierId: string, category: string) => void;
}

const DetailedComparisonTable: React.FC<DetailedComparisonTableProps> = ({
  suppliers,
  categories,
  onScoreClick,
}) => {
  const [tooltipVisible, setTooltipVisible] = useState<{
    field: string;
    supplierId: string;
  } | null>(null);

  if (!suppliers || suppliers.length === 0) {
    return null;
  }

  if (!categories || categories.length === 0) {
    return null;
  }

  const getFieldValue = (
    supplier: Supplier,
    categoryName: string,
    fieldKey: string
  ): string | number => {
    if (categoryName === "Supplier relevance") {
      if (!supplier.supplierRelevance) return "";
      const relevance = supplier.supplierRelevance as any;
      return relevance[fieldKey] ?? "";
    } else if (categoryName === "Speed") {
      if (!supplier.speed) return "";
      return supplier.speed[fieldKey] ?? "";
    } else if (categoryName === "Technical scope") {
      if (!supplier.technicalScope) return "";
      return supplier.technicalScope[fieldKey] ?? "";
    } else if (categoryName === "Financial scope") {
      if (!supplier.financialScope) return "";
      // Map field keys to their respective sections
      if (fieldKey === "capexPrice" && supplier.financialScope.capex) {
        return supplier.financialScope.capex.price ?? supplier.financialScope.capex[fieldKey] ?? "";
      }
      if (fieldKey === "ppaRate" && supplier.financialScope.ppa) {
        return supplier.financialScope.ppa.rate ?? supplier.financialScope.ppa[fieldKey] ?? "";
      }
      if (fieldKey === "hirePurchaseRate" && supplier.financialScope.hirePurchase) {
        return supplier.financialScope.hirePurchase.rate ?? supplier.financialScope.hirePurchase[fieldKey] ?? "";
      }
      // Fallback: check all sections
      if (supplier.financialScope.capex?.[fieldKey] !== undefined) {
        return supplier.financialScope.capex[fieldKey];
      }
      if (supplier.financialScope.ppa?.[fieldKey] !== undefined) {
        return supplier.financialScope.ppa[fieldKey];
      }
      if (supplier.financialScope.hirePurchase?.[fieldKey] !== undefined) {
        return supplier.financialScope.hirePurchase[fieldKey];
      }
      return "";
    }
    return "";
  };

  const formatValue = (value: string | number | boolean): string => {
    if (value === "" || value === null || value === undefined) {
      return "-";
    }
    if (typeof value === "boolean") {
      return value ? "Yes" : "No";
    }
    return String(value);
  };

  const Tooltip: React.FC<{
    text: string;
    field: string;
    supplierId: string;
  }> = ({ text, field, supplierId }) => {
    const isVisible =
      tooltipVisible?.field === field && tooltipVisible?.supplierId === supplierId;

    return (
      <div className="relative inline-block">
        <button
          className="ml-1 text-[#1C75BC] hover:text-[#004b75]"
          onMouseEnter={() => setTooltipVisible({ field, supplierId })}
          onMouseLeave={() => setTooltipVisible(null)}
        >
          <Info size={14} />
        </button>
        {isVisible && (
          <div
            className="absolute z-50 w-64 p-3 text-xs bg-white border border-[#d3d7dc] rounded-lg shadow-lg"
            style={{
              bottom: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              marginBottom: "5px",
            }}
          >
            <div className="whitespace-pre-line text-[#4d5761]">{text}</div>
            <div
              className="absolute w-2 h-2 bg-white border-r border-b border-[#d3d7dc]"
              style={{
                bottom: "-6px",
                left: "50%",
                transform: "translateX(-50%) rotate(45deg)",
              }}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {categories.map((category) => (
        <div
          key={category.name}
          className="bg-white rounded-lg border border-[var(--Colours-BorderLight,#F3F4F6)] p-6"
        >
          <h2 className="text-[18px] font-bold text-[#29b273] mb-6">
            {category.name}
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--Colours-BorderLight,#F3F4F6)]">
                  <th className="text-left py-3 px-4 font-bold text-[var(--text-primary)]">
                    Field
                  </th>
                  {suppliers.map((supplier) => (
                    <th
                      key={supplier.id}
                      className="text-right py-3 px-4 font-bold text-[var(--text-primary)]"
                    >
                      {supplier.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {category.fields.map((field) => (
                  <tr
                    key={field.key}
                    className="border-b border-[var(--Colours-BorderLight,#F3F4F6)] last:border-b-0"
                  >
                    <td className="py-3 px-4 text-[14px] text-[var(--text-secondary)]">
                      <div className="flex items-center gap-1">
                        <span>{field.label}</span>
                        {field.tooltip && (
                          <Tooltip
                            text={field.tooltip}
                            field={`${field.key}-header`}
                            supplierId="header"
                          />
                        )}
                      </div>
                    </td>
                    {suppliers.map((supplier) => {
                      const value = getFieldValue(supplier, category.name, field.key);
                      const displayValue = formatValue(value);
                      const isScore = field.key.includes("Score") || 
                                     field.key === "generalScore" ||
                                     field.key === "assetType" ||
                                     field.key === "stakeholderManagement" ||
                                     field.key === "assetSize" ||
                                     field.key === "location";

                      return (
                        <td
                          key={supplier.id}
                          className="py-3 px-4 text-right text-[14px] font-bold text-[var(--text-primary)]"
                        >
                          {isScore && displayValue !== "-" ? (
                            <button
                              className="text-[#29b273] hover:underline cursor-pointer"
                              onClick={() =>
                                onScoreClick?.(supplier.id, category.name)
                              }
                            >
                              {displayValue}
                            </button>
                          ) : (
                            <div className="flex items-center justify-end gap-1">
                              <span className={displayValue === "-" ? "text-[var(--text-secondary)]" : ""}>
                                {displayValue}
                              </span>
                              {field.tooltip && displayValue !== "-" && (
                                <Tooltip
                                  text={field.tooltip}
                                  field={`${field.key}-${supplier.id}`}
                                  supplierId={supplier.id}
                                />
                              )}
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DetailedComparisonTable;

