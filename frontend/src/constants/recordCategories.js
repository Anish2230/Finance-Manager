export const getCategoriesForType = (type) => {
  if (type === "INCOME") {
    return [
      { value: "USER_SUBSCRIPTIONS", label: "User Subscriptions" },
      { value: "ENTERPRISE_CONTRACTS", label: "Enterprise Contracts" },
      { value: "EQUITY_INVESTMENT", label: "Equity Investment" },
      { value: "ANGEL_FUNDING", label: "Angel Funding" },
      { value: "VENTURE_CAPITAL", label: "Venture Capital" },
      { value: "AD_REVENUE", label: "Ad Revenue" },
      { value: "API_LICENSING", label: "API Licensing" },
      { value: "GRANTS", label: "Grants" },
      { value: "MISCELLANEOUS", label: "Miscellaneous" },
    ];
  }

  if (type === "EXPENSE") {
    return [
      { value: "SALARIES", label: "Salaries" },
      { value: "ESOPS", label: "ESOPs" },
      { value: "GRATUITY", label: "Gratuity" },
      { value: "INFRASTRUCTURE", label: "Infrastructure" },
      { value: "SOFTWARE_LICENSES", label: "Software Licenses" },
      { value: "MARKETING", label: "Marketing" },
      { value: "OPERATIONS", label: "Operations" },
      { value: "LEGAL_COMPLIANCE", label: "Legal & Compliance" },
      { value: "R_AND_D", label: "R&D" },
      { value: "OFFICE_RENT", label: "Office Rent" },
      { value: "EQUIPMENT", label: "Equipment" },
      { value: "MISCELLANEOUS", label: "Miscellaneous" },
    ];
  }

  return [];
};

export const getAllCategories = () => [
  ...getCategoriesForType("INCOME"),
  ...getCategoriesForType("EXPENSE"),
];

export const getCategoryLabel = (value) => {
  const all = getAllCategories();
  const found = all.find((cat) => cat.value === value);
  return found ? found.label : value;
};